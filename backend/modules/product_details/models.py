# modules/product_details/models.py
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from core.database import Base


class ProductDetailsSubmission(Base):
    """
    Model for Product Details form submissions
    This is separate from TestingRequest flow
    """
    __tablename__ = "product_details_submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Organization Information
    organization_name = Column(String(255))
    contact_person = Column(String(255))
    designation = Column(String(255))
    email = Column(String(255), index=True)
    mobile_no = Column(String(50))
    address = Column(Text)
    preferable_dates = Column(String(255))
    industry = Column(String(100))
    
    # Product Information
    services = Column(String(100))
    product_name = Column(String(255))
    product_quantity = Column(Integer)
    product_specification = Column(String(500))
    product_part_no = Column(String(100))
    standards_required = Column(String(500))
    product_description = Column(Text)
    
    # Submission type: 'submit' or 'quote'
    submission_type = Column(String(20), default='submit')
    
    # Status tracking
    status = Column(String(50), default='pending')  # pending, contacted, completed
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())