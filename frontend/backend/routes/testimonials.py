from fastapi import APIRouter, HTTPException
from models import Testimonial
from typing import List
import logging
from server import db

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["testimonials"])


@router.get("/testimonials")
async def get_testimonials():
    try:
        testimonials = await db.testimonials.find(
            {"approved": True},
            {"_id": 0}
        ).sort("created_at", -1).to_list(100)
        
        return {"testimonials": testimonials}
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch testimonials")


@router.post("/testimonials")
async def create_testimonial(testimonial: Testimonial):
    try:
        await db.testimonials.insert_one(testimonial.dict())
        return {
            "success": True,
            "message": "Testimonial created successfully",
            "testimonial_id": testimonial.id
        }
    except Exception as e:
        logger.error(f"Error creating testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create testimonial")
