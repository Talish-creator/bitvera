import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

testimonials_data = [
    {
        "id": "1",
        "name": "Ahmed Al-Rashid",
        "position": "CEO, TechCorp Solutions",
        "content": "Vortexa transformed our business operations completely. The ERP implementation was seamless and the support team is outstanding.",
        "rating": 5,
        "avatar": "https://ui-avatars.com/api/?name=Ahmed+Al-Rashid&background=0ea5e9&color=fff",
        "company": "TechCorp Solutions",
        "approved": True
    },
    {
        "id": "2",
        "name": "Sarah Mohammed",
        "position": "Operations Manager, RetailPro",
        "content": "The best decision we made was choosing Vortexa. Their expertise in ERPNext and understanding of local regulations is unmatched.",
        "rating": 5,
        "avatar": "https://ui-avatars.com/api/?name=Sarah+Mohammed&background=06b6d4&color=fff",
        "company": "RetailPro",
        "approved": True
    },
    {
        "id": "3",
        "name": "Khalid Ibrahim",
        "position": "CTO, Manufacturing Plus",
        "content": "Exceptional service and support. The customization capabilities allowed us to tailor the system perfectly to our manufacturing needs.",
        "rating": 5,
        "avatar": "https://ui-avatars.com/api/?name=Khalid+Ibrahim&background=0891b2&color=fff",
        "company": "Manufacturing Plus",
        "approved": True
    }
]

async def seed_database():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    try:
        # Clear existing testimonials
        await db.testimonials.delete_many({})
        print("Cleared existing testimonials")
        
        # Insert new testimonials
        result = await db.testimonials.insert_many(testimonials_data)
        print(f"Inserted {len(result.inserted_ids)} testimonials")
        
        print("Database seeding completed successfully!")
    except Exception as e:
        print(f"Error seeding database: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
