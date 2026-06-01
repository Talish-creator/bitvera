from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field
from typing import Optional, Dict
import logging
import os
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout,
    CheckoutSessionResponse,
    CheckoutStatusResponse,
    CheckoutSessionRequest
)
from server import db

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/payment", tags=["payment"])

PRICING_PACKAGES = {
    "starter": {"name": "Starter Plan", "monthly_price": 594.00, "annual_price": 504.00, "implementation_fee": 15000.00, "currency": "usd"},
    "professional": {"name": "Professional Plan", "monthly_price": 2050.00, "annual_price": 1743.00, "implementation_fee": 58500.00, "currency": "usd"},
    "enterprise": {"name": "Enterprise Plan", "monthly_price": 4028.00, "annual_price": 3424.00, "implementation_fee": 94500.00, "currency": "usd"}
}

class CheckoutRequest(BaseModel):
    package_id: str = Field(..., description="Package ID: starter, professional, or enterprise")
    payment_type: str = Field(..., description="subscription or implementation_fee")
    billing_period: str = Field("monthly", description="monthly or annual")
    origin_url: str = Field(..., description="Frontend origin URL")
    email: Optional[str] = None
    metadata: Optional[Dict[str, str]] = None

class TransactionData(BaseModel):
    session_id: str
    package_id: str
    package_name: str
    payment_type: str
    billing_period: str
    amount: float
    currency: str
    metadata: dict
    email: Optional[str] = None

def validate_package(package_id: str) -> dict:
    if package_id not in PRICING_PACKAGES:
        raise HTTPException(status_code=400, detail="Invalid package ID")
    return PRICING_PACKAGES[package_id]

def calculate_amount(package: dict, payment_type: str, billing_period: str) -> float:
    if payment_type == "subscription":
        return package["monthly_price"] if billing_period == "monthly" else package["annual_price"]
    elif payment_type == "implementation_fee":
        return package["implementation_fee"]
    else:
        raise HTTPException(status_code=400, detail="Invalid payment type")

def build_payment_urls(origin_url: str) -> tuple:
    success_url = f"{origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin_url}/payment/cancel"
    return success_url, cancel_url

def prepare_metadata(package_id: str, package: dict, payment_type: str, billing_period: str, email: Optional[str], extra_metadata: Optional[Dict[str, str]]) -> dict:
    metadata = {"package_id": package_id, "package_name": package["name"], "payment_type": payment_type, "billing_period": billing_period}
    if email:
        metadata["email"] = email
    if extra_metadata:
        metadata.update(extra_metadata)
    return metadata

async def create_stripe_session(api_key: str, webhook_url: str, amount: float, currency: str, success_url: str, cancel_url: str, metadata: dict) -> CheckoutSessionResponse:
    stripe_checkout = StripeCheckout(api_key=api_key, webhook_url=webhook_url)
    checkout_request = CheckoutSessionRequest(amount=amount, currency=currency, success_url=success_url, cancel_url=cancel_url, metadata=metadata)
    return await stripe_checkout.create_checkout_session(checkout_request)

async def save_transaction(transaction_data: TransactionData):
    """Save payment transaction to database using structured data model."""
    transaction = {
        "session_id": transaction_data.session_id,
        "package_id": transaction_data.package_id,
        "package_name": transaction_data.package_name,
        "payment_type": transaction_data.payment_type,
        "billing_period": transaction_data.billing_period,
        "amount": transaction_data.amount,
        "currency": transaction_data.currency,
        "payment_status": "pending",
        "status": "initiated",
        "metadata": transaction_data.metadata,
        "email": transaction_data.email
    }
    await db.payment_transactions.insert_one(transaction)

@router.post("/checkout")
async def create_checkout_session(request: CheckoutRequest):
    try:
        package = validate_package(request.package_id)
        amount = calculate_amount(package, request.payment_type, request.billing_period)
        currency = package["currency"]
        success_url, cancel_url = build_payment_urls(request.origin_url)
        metadata = prepare_metadata(request.package_id, package, request.payment_type, request.billing_period, request.email, request.metadata)
        
        api_key = os.environ.get("STRIPE_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="Stripe API key not configured")
        
        webhook_url = f"{request.origin_url}/api/webhook/stripe"
        session = await create_stripe_session(api_key, webhook_url, amount, currency, success_url, cancel_url, metadata)
        
        transaction_data = TransactionData(
            session_id=session.session_id,
            package_id=request.package_id,
            package_name=package["name"],
            payment_type=request.payment_type,
            billing_period=request.billing_period,
            amount=amount,
            currency=currency,
            metadata=metadata,
            email=request.email
        )
        await save_transaction(transaction_data)
        
        return {"success": True, "checkout_url": session.url, "session_id": session.session_id}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating checkout session: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/status/{session_id}")
async def get_payment_status(session_id: str):
    try:
        existing_transaction = await db.payment_transactions.find_one({"session_id": session_id, "payment_status": "paid"})
        if existing_transaction:
            return {"status": "complete", "payment_status": "paid", "message": "Payment already processed"}
        
        api_key = os.environ.get("STRIPE_API_KEY")
        stripe_checkout = StripeCheckout(api_key=api_key, webhook_url="")
        checkout_status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": {"status": checkout_status.status, "payment_status": checkout_status.payment_status, "amount_total": checkout_status.amount_total, "currency": checkout_status.currency}}
        )
        
        return {"status": checkout_status.status, "payment_status": checkout_status.payment_status, "amount_total": checkout_status.amount_total, "currency": checkout_status.currency, "metadata": checkout_status.metadata}
    except Exception as e:
        logger.error(f"Error checking payment status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    try:
        body = await request.body()
        signature = request.headers.get("Stripe-Signature")
        api_key = os.environ.get("STRIPE_API_KEY")
        stripe_checkout = StripeCheckout(api_key=api_key, webhook_url="")
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        if webhook_response.payment_status == "paid":
            await db.payment_transactions.update_one(
                {"session_id": webhook_response.session_id},
                {"$set": {"payment_status": "paid", "status": "complete", "event_id": webhook_response.event_id}}
            )
        
        return {"success": True}
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/transactions")
async def get_transactions():
    try:
        transactions = await db.payment_transactions.find({}, {"_id": 0}).sort("_id", -1).to_list(100)
        return {"transactions": transactions}
    except Exception as e:
        logger.error(f"Error fetching transactions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))