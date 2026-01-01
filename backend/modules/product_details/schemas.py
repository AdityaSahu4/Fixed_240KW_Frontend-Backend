# modules/product_details/schemas.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class ProductDetailsSubmissionCreate(BaseModel):
    """Schema for creating product details submission"""
    
    # Organization Information
    organization_name: str = Field(..., min_length=1, max_length=255)
    contact_person: str = Field(..., min_length=1, max_length=255)
    designation: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    mobile_no: str = Field(..., min_length=10, max_length=50)
    address: str = Field(..., min_length=1)
    preferable_dates: Optional[str] = Field(None, max_length=255)
    industry: str = Field(..., min_length=1, max_length=100)
    
    # Product Information
    services: str = Field(..., min_length=1, max_length=100)
    product_name: str = Field(..., min_length=1, max_length=255)
    product_quantity: int = Field(..., gt=0)
    product_specification: Optional[str] = Field(None, max_length=500)
    product_part_no: Optional[str] = Field(None, max_length=100)
    standards_required: Optional[str] = Field(None, max_length=500)
    product_description: Optional[str] = None
    
    # Submission type
    submission_type: str = Field(default='submit')  # 'submit' or 'quote'

    class Config:
        json_schema_extra = {
            "example": {
                "organization_name": "Tech Corp",
                "contact_person": "John Doe",
                "designation": "Project Manager",
                "email": "john@techcorp.com",
                "mobile_no": "+1234567890",
                "address": "123 Tech Street, Silicon Valley",
                "preferable_dates": "March 20-25, 2024",
                "industry": "electronics",
                "services": "testing",
                "product_name": "IoT Device",
                "product_quantity": 5,
                "product_specification": "2kg, 10cm, 5cm",
                "product_part_no": "IOT-2024-001",
                "standards_required": "ISO 9001, CE Mark",
                "product_description": "Advanced IoT device for industrial monitoring",
                "submission_type": "submit"
            }
        }


class ProductDetailsSubmissionResponse(BaseModel):
    """Schema for product details submission response"""
    id: int
    organization_name: str
    contact_person: str
    email: str
    services: str
    product_name: str
    submission_type: str
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True