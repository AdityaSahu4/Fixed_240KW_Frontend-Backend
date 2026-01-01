# modules/product_details/routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from core.database import get_db
from . import services, schemas
from typing import List, Optional


router = APIRouter(prefix="/product-details", tags=["Product Details"])


@router.post(
    "/submit",
    response_model=schemas.ProductDetailsSubmissionResponse,
    status_code=status.HTTP_201_CREATED
)
def submit_product_details(
    payload: schemas.ProductDetailsSubmissionCreate,
    db: Session = Depends(get_db)
):
    """
    Submit product details form
    - Used when user clicks "Submit" button
    - Creates a new submission with type 'submit'
    """
    payload.submission_type = 'submit'
    submission = services.create_product_details_submission(db, payload)
    return submission


@router.post(
    "/quote",
    response_model=schemas.ProductDetailsSubmissionResponse,
    status_code=status.HTTP_201_CREATED
)
def request_quote(
    payload: schemas.ProductDetailsSubmissionCreate,
    db: Session = Depends(get_db)
):
    """
    Request a quote for product details
    - Used when user clicks "Get Quote" button
    - Creates a new submission with type 'quote'
    """
    payload.submission_type = 'quote'
    submission = services.create_product_details_submission(db, payload)
    return submission


@router.get(
    "/{submission_id}",
    response_model=schemas.ProductDetailsSubmissionResponse
)
def get_submission(
    submission_id: int,
    db: Session = Depends(get_db)
):
    """
    Get a specific submission by ID
    """
    submission = services.get_submission_by_id(db, submission_id)
    
    if not submission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Submission not found"
        )
    
    return submission


@router.get(
    "/",
    response_model=List[schemas.ProductDetailsSubmissionResponse]
)
def list_submissions(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    List all submissions with optional filtering
    - Query params: skip, limit, status
    """
    submissions = services.get_all_submissions(db, skip, limit, status)
    return submissions


@router.get(
    "/email/{email}",
    response_model=List[schemas.ProductDetailsSubmissionResponse]
)
def get_submissions_by_email(
    email: str,
    db: Session = Depends(get_db)
):
    """
    Get all submissions for a specific email
    """
    submissions = services.get_submissions_by_email(db, email)
    return submissions


@router.patch(
    "/{submission_id}/status",
    response_model=schemas.ProductDetailsSubmissionResponse
)
def update_status(
    submission_id: int,
    new_status: str,
    db: Session = Depends(get_db)
):
    """
    Update submission status
    - Allowed values: 'pending', 'contacted', 'completed'
    """
    allowed_statuses = ['pending', 'contacted', 'completed']
    
    if new_status not in allowed_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Status must be one of: {', '.join(allowed_statuses)}"
        )
    
    submission = services.update_submission_status(db, submission_id, new_status)
    
    if not submission:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Submission not found"
        )
    
    return submission