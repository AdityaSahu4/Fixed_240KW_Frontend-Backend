# routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from . import services, schemas
from modules.testing_request.models import TestingRequest


router = APIRouter(prefix="/testing-request", tags=["Testing Request"])

@router.get("/{testing_request_id}")
def get_request(testing_request_id: int, db: Session = Depends(get_db)):
    tr = db.query(TestingRequest).filter(
        TestingRequest.id == testing_request_id
    ).first()

    if not tr:
        raise HTTPException(status_code=404, detail="Not found")

    return {"id": tr.id, "status": tr.status}

@router.post("/")
def start_testing_request(db: Session = Depends(get_db)):
    return services.create_testing_request(db)


@router.post("/{testing_request_id}/product")
def save_product(
    testing_request_id: int,
    payload: schemas.ProductDetailsSchema,
    db: Session = Depends(get_db)
):
    services.save_product_details(db, testing_request_id, payload)
    return {"status": "saved"}

@router.post("/{testing_request_id}/documents")
def save_documents(
    testing_request_id: int,
    payload: schemas.TechnicalDocumentsSchema,
    db: Session = Depends(get_db)
):
    services.save_technical_documents(
        db,
        testing_request_id,
        payload.documents
    )
    return {"status": "documents saved"}

@router.post("/{testing_request_id}/requirements")
def save_requirements(
    testing_request_id: int,
    payload: schemas.TestingRequirementsSchema,
    db: Session = Depends(get_db)
):
    services.save_testing_requirements(db, testing_request_id, payload)
    return {"status": "saved"}


@router.post("/{testing_request_id}/standards")
def save_standards(
    testing_request_id: int,
    payload: schemas.TestingStandardsSchema,
    db: Session = Depends(get_db)
):
    services.save_testing_standards(db, testing_request_id, payload)
    return {"status": "saved"}


@router.post("/{testing_request_id}/submit")
def submit(
    testing_request_id: int,
    payload: schemas.LabSelectionSchema,
    db: Session = Depends(get_db)
):
    services.submit_request(db, testing_request_id, payload)
    return {"status": "submitted"}


@router.get("/{testing_request_id}/full")
def get_full_request(
    testing_request_id: int,
    db: Session = Depends(get_db)
):
    data = services.get_full_testing_request(db, testing_request_id)

    if not data:
        raise HTTPException(status_code=404, detail="Testing request not found")

    return data