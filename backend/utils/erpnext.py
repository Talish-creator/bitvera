import os
import httpx
import logging
from typing import Optional, Dict, Any

logger = logging.getLogger(__name__)

class ERPNextClient:
    def __init__(self):
        self.base_url = os.environ.get('ERPNEXT_URL', '').rstrip('/')
        self.api_key = os.environ.get('ERPNEXT_API_KEY', '')
        self.api_secret = os.environ.get('ERPNEXT_API_SECRET', '')
        self.client: Optional[httpx.AsyncClient] = None
        self.is_configured = bool(self.base_url and self.api_key and self.api_secret)

    def start(self):
        if self.is_configured:
            self.client = httpx.AsyncClient(
                base_url=self.base_url,
                headers={
                    "Authorization": f"token {self.api_key}:{self.api_secret}",
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                timeout=10.0
            )
            logger.info(f"ERPNextClient started with base URL: {self.base_url}")
        else:
            logger.warning("ERPNextClient is not configured. ERPNEXT_URL, ERPNEXT_API_KEY, or ERPNEXT_API_SECRET is missing.")

    async def close(self):
        if self.client:
            await self.client.aclose()
            self.client = None

    async def create_document(self, doctype: str, data: Dict[str, Any]) -> Optional[Dict]:
        """Creates a document in ERPNext using the REST API."""
        if not self.is_configured or not self.client:
            logger.warning(f"Cannot create {doctype}. ERPNextClient is not configured.")
            return None

        try:
            response = await self.client.post(f"/api/resource/{doctype}", json=data)
            response.raise_for_status()
            logger.info(f"Successfully created {doctype} in ERPNext.")
            return response.json().get('data')
        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP error creating {doctype} in ERPNext: {e.response.text}")
            return None
        except Exception as e:
            logger.error(f"Error creating {doctype} in ERPNext: {str(e)}")
            return None

    async def create_lead(self, first_name: str, email_id: str, company_name: Optional[str] = None, phone: Optional[str] = None, custom_notes: Optional[str] = None) -> Optional[Dict]:
        """Helper method to create a Lead document."""
        data = {
            "first_name": first_name,
            "email_id": email_id,
        }
        if company_name:
            data["company_name"] = company_name
        if phone:
            data["phone"] = phone
        if custom_notes:
            data["notes"] = custom_notes
            
        return await self.create_document("Lead", data)

# Global instance
erpnext_client = ERPNextClient()
