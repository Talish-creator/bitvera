from fastapi import APIRouter, HTTPException
from models import NewsletterSubscription, NewsletterSubscriber
import logging
from server import db

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["newsletter"])


@router.post("/newsletter")
async def subscribe_newsletter(subscription: NewsletterSubscription):
    try:
        # Check if email already exists
        existing = await db.newsletter_subscribers.find_one(
            {"email": subscription.email}
        )
        
        if existing:
            if existing.get("active"):
                return {
                    "success": False,
                    "message": "This email is already subscribed to our newsletter."
                }
            else:
                # Reactivate subscription
                await db.newsletter_subscribers.update_one(
                    {"email": subscription.email},
                    {"$set": {"active": True}}
                )
                return {
                    "success": True,
                    "message": "Welcome back! Your subscription has been reactivated."
                }
        
        subscriber = NewsletterSubscriber(**subscription.dict())
        await db.newsletter_subscribers.insert_one(subscriber.dict())
        
        # Sync with ERPNext (non-blocking)
        from utils.erpnext import erpnext_client
        try:
            await erpnext_client.create_lead(
                first_name="Newsletter",
                email_id=subscriber.email,
                custom_notes="Source: Newsletter Subscription"
            )
        except Exception as erp_err:
            logger.error(f"Failed to sync newsletter subscriber to ERPNext: {str(erp_err)}")
        
        return {
            "success": True,
            "message": "Thank you for subscribing to our newsletter!"
        }
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to subscribe to newsletter")
