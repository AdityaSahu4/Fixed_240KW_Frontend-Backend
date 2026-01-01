# modules/product_details/services.py
from sqlalchemy.orm import Session
from .models import ProductDetailsSubmission
from .schemas import ProductDetailsSubmissionCreate
from typing import Optional


def create_product_details_submission(
    db: Session,
    payload: ProductDetailsSubmissionCreate
) -> ProductDetailsSubmission:
    """
    Create a new product details submission
    """
    submission = ProductDetailsSubmission(
        # Organization Information
        organization_name=payload.organization_name,
        contact_person=payload.contact_person,
        designation=payload.designation,
        email=payload.email,
        mobile_no=payload.mobile_no,
        address=payload.address,
        preferable_dates=payload.preferable_dates,
        industry=payload.industry,
        
        # Product Information
        services=payload.services,
        product_name=payload.product_name,
        product_quantity=payload.product_quantity,
        product_specification=payload.product_specification,
        product_part_no=payload.product_part_no,
        standards_required=payload.standards_required,
        product_description=payload.product_description,
        
        # Submission type
        submission_type=payload.submission_type,
        status='pending'
    )
    
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission


def get_submission_by_id(
    db: Session,
    submission_id: int
) -> Optional[ProductDetailsSubmission]:
    """
    Get a submission by ID
    """
    return db.query(ProductDetailsSubmission).filter(
        ProductDetailsSubmission.id == submission_id
    ).first()


def get_all_submissions(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None
):
    """
    Get all submissions with optional filtering
    """
    query = db.query(ProductDetailsSubmission)
    
    if status:
        query = query.filter(ProductDetailsSubmission.status == status)
    
    return query.order_by(
        ProductDetailsSubmission.created_at.desc()
    ).offset(skip).limit(limit).all()


def update_submission_status(
    db: Session,
    submission_id: int,
    new_status: str
) -> Optional[ProductDetailsSubmission]:
    """
    Update submission status (pending, contacted, completed)
    """
    submission = get_submission_by_id(db, submission_id)
    
    if not submission:
        return None
    
    submission.status = new_status
    db.commit()
    db.refresh(submission)
    return submission


def get_submissions_by_email(
    db: Session,
    email: str
):
    """
    Get all submissions by email address
    """
    return db.query(ProductDetailsSubmission).filter(
        ProductDetailsSubmission.email == email
    ).order_by(
        ProductDetailsSubmission.created_at.desc()
    ).all()