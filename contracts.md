# API Contracts & Integration Plan

## Overview
This document outlines the API contracts, mocked data, and backend implementation plan for the Systems Experts ERP website.

## Current Mock Data (to be replaced)
Located in: `/app/frontend/src/mock/data.js`

### 1. Contact Form Submission
- **Mock Location**: `CTASection.jsx` - form submit handler
- **Data**: name, company, email, demoDate, additionalInfo
- **Current Behavior**: Console log + alert

### 2. Pricing Plans
- **Mock Location**: `mock/data.js` - `pricingPlans` array
- **Data**: Static pricing data with 3 tiers

### 3. Testimonials
- **Mock Location**: `mock/data.js` - `testimonialsData` array
- **Data**: Static customer reviews

### 4. Partners
- **Mock Location**: `mock/data.js` - `partnersData` array
- **Data**: Partner logos and names

## API Contracts

### 1. Contact/Demo Request API
**Endpoint**: `POST /api/contact`
```
Request Body:
{
  "name": string,
  "company": string,
  "email": string,
  "demo_date": string (ISO date),
  "additional_info": string
}

Response:
{
  "success": boolean,
  "message": string,
  "contact_id": string
}
```

### 2. Get Testimonials API
**Endpoint**: `GET /api/testimonials`
```
Response:
{
  "testimonials": [
    {
      "id": string,
      "name": string,
      "position": string,
      "content": string,
      "rating": number,
      "avatar": string,
      "created_at": datetime
    }
  ]
}
```

### 3. Newsletter Subscription
**Endpoint**: `POST /api/newsletter`
```
Request Body:
{
  "email": string
}

Response:
{
  "success": boolean,
  "message": string
}
```

## MongoDB Collections

### 1. contacts
```
{
  "_id": ObjectId,
  "name": string,
  "company": string,
  "email": string,
  "demo_date": datetime,
  "additional_info": string,
  "status": string ("pending", "contacted", "completed"),
  "created_at": datetime,
  "updated_at": datetime
}
```

### 2. testimonials
```
{
  "_id": ObjectId,
  "name": string,
  "position": string,
  "content": string,
  "rating": number,
  "avatar": string,
  "company": string,
  "approved": boolean,
  "created_at": datetime
}
```

### 3. newsletter_subscribers
```
{
  "_id": ObjectId,
  "email": string,
  "subscribed_at": datetime,
  "active": boolean
}
```

## Frontend Integration Plan

### Files to Update:
1. **`/app/frontend/src/components/CTASection.jsx`**
   - Replace mock form submission with API call to `/api/contact`
   - Add proper error handling and success messaging
   - Use toast notifications

2. **`/app/frontend/src/components/Testimonials.jsx`**
   - Fetch testimonials from `/api/testimonials`
   - Add loading state
   - Keep mock data as fallback

3. **`/app/frontend/src/utils/api.js`** (NEW)
   - Create centralized API utility functions
   - Base URL configuration from env
   - Error handling wrapper

## Backend Implementation Plan

### Phase 1: Core Models & Routes
1. Create Pydantic models for validation
2. Create MongoDB schemas
3. Implement CRUD operations

### Phase 2: API Endpoints
1. Contact form endpoint with email validation
2. Testimonials GET endpoint with filtering
3. Newsletter subscription endpoint

### Phase 3: Integration
1. Update frontend to use real APIs
2. Remove mock data where appropriate
3. Add loading states and error handling

## Notes
- Pricing plans, services, modules will remain static (from mock data) as they are content-driven
- Partners data will remain static
- Stats data will remain static
- Focus on interactive features: contact forms, testimonials
