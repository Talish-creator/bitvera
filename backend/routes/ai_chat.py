from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import logging
import os
from emergentintegrations.llm.chat import LlmChat, UserMessage
from server import db
from datetime import datetime

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/ai", tags=["ai"])


class ChatMessage(BaseModel):
    text: str
    session_id: Optional[str] = "default"


class ChatResponse(BaseModel):
    response: str
    session_id: str


@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(message: ChatMessage):
    try:
        api_key = os.environ.get("EMERGENT_LLM_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="AI API key not configured")
        
        system_message = """You are a helpful AI assistant for Vortexa - BitVera IT Solutions, 
        an ERP implementation company in Saudi Arabia. You help customers with:
        - ERP implementation questions
        - Pricing information (Starter: 594 SAR/month, Professional: 2,050 SAR/month, Enterprise: 4,028 SAR/month)
        - Service details (ERP, CRM, Automation, Custom Development)
        - Demo booking assistance
        - General inquiries
        
        Be professional, helpful, and concise. Always mention the phone number +966 58 060 8336 for urgent matters."""
        
        chat = LlmChat(
            api_key=api_key,
            session_id=message.session_id,
            system_message=system_message
        ).with_model("openai", "gpt-4o")
        
        user_message = UserMessage(text=message.text)
        response = await chat.send_message(user_message)
        
        await db.chat_history.insert_many([
            {
                "session_id": message.session_id,
                "role": "user",
                "content": message.text,
                "timestamp": datetime.utcnow()
            },
            {
                "session_id": message.session_id,
                "role": "assistant",
                "content": response,
                "timestamp": datetime.utcnow()
            }
        ])
        
        return ChatResponse(response=response, session_id=message.session_id)
    
    except Exception as e:
        logger.error(f"Error in AI chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    try:
        history = await db.chat_history.find(
            {"session_id": session_id},
            {"_id": 0}
        ).sort("timestamp", 1).to_list(100)
        return {"history": history}
    except Exception as e:
        logger.error(f"Error fetching chat history: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/chat/history/{session_id}")
async def clear_chat_history(session_id: str):
    try:
        result = await db.chat_history.delete_many({"session_id": session_id})
        return {"success": True, "deleted_count": result.deleted_count}
    except Exception as e:
        logger.error(f"Error clearing chat history: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))