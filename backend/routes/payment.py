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

# Define pricing packages (SERVER-SIDE ONLY - NEVER from frontend)
PRICING_PACKAGES = {
    "starter": {
        "name": "Starter Plan",
        "monthly_price": 594.00,
        "annual_price": 504.00,
        "implementation_fee": 15000.00,
        "currency": "usd"
    },
    "professional": {
        "name": "Professional Plan",
        "monthly_price": 2050.00,
        "annual_price": 1743.00,
        "implementation_fee": 58500.00,
        "currency": "usd"
    },
    "enterprise": {
        "name": "Enterprise Plan",
        "monthly_price": 4028.00,
        "annual_price": 3424.00,
        "implementation_fee": 94500.00,
        "currency": "usd"
    }
}


class CheckoutRequest(BaseModel):
    package_id: str = Field(..., description="Package ID: starter, professional, or enterprise")
    payment_type: str = Field(..., description="subscription or implementation_fee")
    billing_period: str = Field("monthly", description="monthly or annual")
    origin_url: str = Field(..., description="Frontend origin URL")
    email: Optional[str] = None
    metadata: Optional[Dict[str, str]] = None


def validate_package(package_id: str) -> dict:
    """Validate package ID and return package data."""
    if package_id not in PRICING_PACKAGES:
        raise HTTPException(status_code=400, detail="Invalid package ID")
    return PRICING_PACKAGES[package_id]


def calculate_amount(package: dict, payment_type: str, billing_period: str) -> float:
    """Calculate payment amount based on package and payment type."""
    if payment_type == "subscription":
        return package["monthly_price"] if billing_period == "monthly" else package["annual_price"]
    elif payment_type == "implementation_fee":
        return package["implementation_fee"]
    else:
        raise HTTPException(status_code=400, detail="Invalid payment type")


def build_payment_urls(origin_url: str) -> tuple:
    """Build success and cancel URLs from frontend origin."""
    success_url = f"{origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin_url}/payment/cancel"
    return success_url, cancel_url


def prepare_metadata(package_id: str, package: dict, payment_type: str, 
                     billing_period: str, email: Optional[str], 
                     extra_metadata: Optional[Dict[str, str]]) -> dict:
    """Prepare metadata for checkout session."""
    metadata = {
        "package_id": package_id,
        "package_name": package["name"],
        "payment_type": payment_type,
        "billing_period": billing_period
    }
    if email:
        metadata["email"] = email
    if extra_metadata:
        metadata.update(extra_metadata)
    return metadata


async def create_stripe_session(api_key: str, webhook_url: str, amount: float, 
                                currency: str, success_url: str, cancel_url: str, 
                                metadata: dict) -> CheckoutSessionResponse:
    """Create Stripe checkout session."""
    stripe_checkout = StripeCheckout(api_key=api_key, webhook_url=webhook_url)
    checkout_request = CheckoutSessionRequest(
        amount=amount,
        currency=currency,
        success_url=success_url,
        cancel_url=cancel_url,
        metadata=metadata
    )
    return await stripe_checkout.create_checkout_session(checkout_request)


async def save_transaction(session_id: str, package_id: str, package_name: str,
                           payment_type: str, billing_period: str, amount: float,
                           currency: str, metadata: dict, email: Optional[str]):
    """Save payment transaction to database."""
    transaction = {
        "session_id": session_id,
        "package_id": package_id,
        "package_name": package_name,
        "payment_type": payment_type,
        "billing_period": billing_period,
        "amount": amount,
        "currency": currency,
        "payment_status": "pending",
        "status": "initiated",
        "metadata": metadata,
        "email": email
    }
    await db.payment_transactions.insert_one(transaction)


@router.post("/checkout")
async def create_checkout_session(request: CheckoutRequest):
    """Create a Stripe checkout session for payment."""
    try:
        # Validate and get package
        package = validate_package(request.package_id)
        
        # Calculate amount from SERVER-SIDE package definition
        amount = calculate_amount(package, request.payment_type, request.billing_period)
        currency = package["currency"]
        
        # Build URLs from frontend origin
        success_url, cancel_url = build_payment_urls(request.origin_url)
        
        # Prepare metadata
        metadata = prepare_metadata(
            request.package_id, package, request.payment_type,
            request.billing_period, request.email, request.metadata
        )
        
        # Get Stripe API key
        api_key = os.environ.get("STRIPE_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="Stripe API key not configured")
        
        # Create checkout session
        webhook_url = f"{request.origin_url}/api/webhook/stripe"
        session = await create_stripe_session(
            api_key, webhook_url, amount, currency,
            success_url, cancel_url, metadata
        )
        
        # Save transaction
        await save_transaction(
            session.session_id, request.package_id, package["name"],
            request.payment_type, request.billing_period, amount,
            currency, metadata, request.email
        )
        
        return {
            "success": True,
            "checkout_url": session.url,
            "session_id": session.session_id
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating checkout session: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status/{session_id}")
async def get_payment_status(session_id: str):
    """Get payment status for a checkout session."""
    try:
        # Check if already processed
        existing_transaction = await db.payment_transactions.find_one(
            {"session_id": session_id, "payment_status": "paid"}
        )
        
        if existing_transaction:
            return {
                "status": "complete",
                "payment_status": "paid",
                "message": "Payment already processed"
            }
        
        # Get status from Stripe
        api_key = os.environ.get("STRIPE_API_KEY")
        webhook_url = ""  # Not needed for status check
        stripe_checkout = StripeCheckout(api_key=api_key, webhook_url=webhook_url)
        
        checkout_status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        # Update transaction
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {
                "$set": {
                    "status": checkout_status.status,
                    "payment_status": checkout_status.payment_status,
                    "amount_total": checkout_status.amount_total,
                    "currency": checkout_status.currency
                }
            }
        )
        
        return {
            "status": checkout_status.status,
            "payment_status": checkout_status.payment_status,
            "amount_total": checkout_status.amount_total,
            "currency": checkout_status.currency,
            "metadata": checkout_status.metadata
        }
    
    except Exception as e:
        logger.error(f"Error checking payment status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events."""
    try:
        body = await request.body()
        signature = request.headers.get("Stripe-Signature")
        
        api_key = os.environ.get("STRIPE_API_KEY")
        stripe_checkout = StripeCheckout(api_key=api_key, webhook_url="")
        
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        # Update transaction based on webhook
        if webhook_response.payment_status == "paid":
            await db.payment_transactions.update_one(
                {"session_id": webhook_response.session_id},
                {
                    "$set": {
                        "payment_status": "paid",
                        "status": "complete",
                        "event_id": webhook_response.event_id
                    }
                }
            )
        
        return {"success": True}
    
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/transactions")
async def get_transactions():
    """Get all payment transactions."""
    try:
        transactions = await db.payment_transactions.find({}, {"_id": 0}).sort("_id", -1).to_list(100)
        return {"transactions": transactions}
    except Exception as e:
        logger.error(f"Error fetching transactions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
