import requests
import json
from datetime import datetime

# Backend URL from frontend/.env
BACKEND_URL = "https://style-forge-111.preview.emergentagent.com/api"

def print_test_header(test_name):
    print(f"\n{'='*60}")
    print(f"Testing: {test_name}")
    print(f"{'='*60}")

def print_result(success, message):
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {message}")

def test_contact_form_api():
    """Test POST /api/contact endpoint"""
    print_test_header("Contact Form API - POST /api/contact")
    
    # Test 1: Valid contact submission
    print("\n1. Testing valid contact submission...")
    valid_data = {
        "name": "John Smith",
        "company": "Acme Corporation",
        "email": "john.smith@acmecorp.com",
        "demo_date": "2024-02-15",
        "additional_info": "Interested in ERP system for manufacturing"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=valid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("contact_id"):
                print_result(True, "Valid contact submission successful with contact_id")
            else:
                print_result(False, "Response missing success flag or contact_id")
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
    
    # Test 2: Missing required fields
    print("\n2. Testing missing required fields (no email)...")
    invalid_data = {
        "name": "Jane Doe",
        "company": "Test Corp",
        "demo_date": "2024-02-20"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=invalid_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 422:
            print_result(True, "Validation error correctly returned for missing email")
        else:
            print_result(False, f"Expected status 422, got {response.status_code}")
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
    
    # Test 3: Invalid email format
    print("\n3. Testing invalid email format...")
    invalid_email_data = {
        "name": "Bob Johnson",
        "company": "Tech Inc",
        "email": "invalid-email",
        "demo_date": "2024-02-25"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/contact", json=invalid_email_data, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 422:
            print_result(True, "Validation error correctly returned for invalid email")
        else:
            print_result(False, f"Expected status 422, got {response.status_code}")
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")

def test_get_contacts_api():
    """Test GET /api/contacts endpoint"""
    print_test_header("Get Contacts API - GET /api/contacts")
    
    try:
        response = requests.get(f"{BACKEND_URL}/contacts", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if "contacts" in data and isinstance(data["contacts"], list):
                print_result(True, f"Successfully retrieved {len(data['contacts'])} contacts")
                
                # Check data structure if contacts exist
                if len(data["contacts"]) > 0:
                    contact = data["contacts"][0]
                    required_fields = ["id", "name", "company", "email", "demo_date"]
                    missing_fields = [field for field in required_fields if field not in contact]
                    
                    if missing_fields:
                        print_result(False, f"Contact missing required fields: {missing_fields}")
                    else:
                        print_result(True, "Contact data structure is correct")
            else:
                print_result(False, "Response missing 'contacts' array")
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")

def test_testimonials_api():
    """Test GET /api/testimonials endpoint"""
    print_test_header("Testimonials API - GET /api/testimonials")
    
    try:
        response = requests.get(f"{BACKEND_URL}/testimonials", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if "testimonials" in data and isinstance(data["testimonials"], list):
                print_result(True, f"Successfully retrieved {len(data['testimonials'])} testimonials")
                
                # Check that only approved testimonials are returned
                if len(data["testimonials"]) > 0:
                    all_approved = all(t.get("approved", False) for t in data["testimonials"])
                    if all_approved:
                        print_result(True, "All testimonials are approved")
                    else:
                        print_result(False, "Some testimonials are not approved")
                    
                    # Check data structure
                    testimonial = data["testimonials"][0]
                    required_fields = ["id", "name", "position", "content", "rating", "avatar", "approved"]
                    missing_fields = [field for field in required_fields if field not in testimonial]
                    
                    if missing_fields:
                        print_result(False, f"Testimonial missing required fields: {missing_fields}")
                    else:
                        print_result(True, "Testimonial data structure is correct")
            else:
                print_result(False, "Response missing 'testimonials' array")
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")

def test_newsletter_api():
    """Test POST /api/newsletter endpoint"""
    print_test_header("Newsletter API - POST /api/newsletter")
    
    # Test 1: Valid subscription
    print("\n1. Testing valid newsletter subscription...")
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    valid_email = {
        "email": f"subscriber{timestamp}@example.com"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/newsletter", json=valid_email, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                print_result(True, "Valid newsletter subscription successful")
            else:
                print_result(False, "Response indicates subscription failed")
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
    
    # Test 2: Duplicate subscription
    print("\n2. Testing duplicate subscription...")
    try:
        response = requests.post(f"{BACKEND_URL}/newsletter", json=valid_email, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            data = response.json()
            if not data.get("success") or "already subscribed" in data.get("message", "").lower():
                print_result(True, "Duplicate subscription correctly handled")
            else:
                print_result(False, "Duplicate subscription not properly detected")
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")
    
    # Test 3: Invalid email format
    print("\n3. Testing invalid email format...")
    invalid_email = {
        "email": "not-an-email"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/newsletter", json=invalid_email, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 422:
            print_result(True, "Validation error correctly returned for invalid email")
        else:
            print_result(False, f"Expected status 422, got {response.status_code}")
    except Exception as e:
        print_result(False, f"Exception occurred: {str(e)}")

def main():
    print("\n" + "="*60)
    print("SYSTEMS EXPERTS ERP - BACKEND API TESTING")
    print("="*60)
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Test Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Run all tests
    test_contact_form_api()
    test_get_contacts_api()
    test_testimonials_api()
    test_newsletter_api()
    
    print("\n" + "="*60)
    print("TESTING COMPLETED")
    print("="*60)

if __name__ == "__main__":
    main()
