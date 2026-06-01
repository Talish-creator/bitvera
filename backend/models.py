from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid


class ContactRequest(BaseModel):
    name: str
    company: str
    email: EmailStr
    demo_date: str
    additional_info: Optional[str] = ""


class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: str
    email: EmailStr
    demo_date: str
    additional_info: Optional[str] = ""
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    position: str
    content: str
    rating: int
    avatar: str
    company: Optional[str] = ""
    approved: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)


class NewsletterSubscription(BaseModel):
    email: EmailStr


class NewsletterSubscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    active: bool = True
