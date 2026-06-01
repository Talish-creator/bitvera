from fastapi import APIRouter, HTTPException
from models import ContactRequest, Contact
from typing import List
import logging
from server import db

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["contact"])


@router.post("/contact")
async def create_contact(contact_request: ContactRequest):
    try:
        contact = Contact(**contact_request.dict())
        await db.contacts.insert_one(contact.dict())
        
        return {
            "success": True,
            "message": "Thank you for your interest! We will contact you soon.",
            "contact_id": contact.id
        }
    except Exception as e:
        logger.error(f"Error creating contact: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact request")


@router.get("/contacts")
async def get_contacts():
    try:
        contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
        return {"contacts": contacts}
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contacts")
