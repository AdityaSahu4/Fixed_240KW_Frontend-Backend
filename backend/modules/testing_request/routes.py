# modules/testing_request/routes.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from core.database import get_db
from . import services, schemas
from modules.testing_request.models import TestingRequest
from pathlib import Path
import os

router = APIRouter(prefix="/testing-request", tags=["Testing Request"])

# Create uploads directory if it doesn't exist
UPLOAD_DIR = Path("uploads/testing_documents")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'.pdf', '.png', '.jpg', '.jpeg', '.zip', '.rar', '.doc', '.docx'}
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB


def validate_file(file: UploadFile) -> bool:
    """Validate file extension and size"""
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    return True


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


@router.post("/{testing_request_id}/upload-document")
async def upload_document(
    testing_request_id: int,
    doc_type: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Upload a technical document for a testing request
    - File is saved with format: {testing_request_id}_{doc_type}_{filename}
    - Path is saved in database
    """
    # Check if testing request exists
    tr = db.query(TestingRequest).filter(
        TestingRequest.id == testing_request_id
    ).first()
    
    if not tr:
        raise HTTPException(status_code=404, detail="Testing request not found")
    
    # Validate file
    validate_file(file)
    
    # Read file content
    file_content = await file.read()
    file_size = len(file_content)
    
    # Check file size
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size is {MAX_FILE_SIZE / (1024*1024)}MB"
        )
    
    # Generate unique filename: testingRequestId_docType_originalFilename
    safe_filename = f"{testing_request_id}_{doc_type}_{file.filename}"
    file_path = UPLOAD_DIR / safe_filename
    
    # Save file
    try:
        with open(file_path, "wb") as f:
            f.write(file_content)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save file: {str(e)}"
        )
    
    # Save document info to database
    doc_info = services.save_document_info(
        db=db,
        testing_request_id=testing_request_id,
        doc_type=doc_type,
        file_name=file.filename,
        file_path=str(file_path),
        file_size=file_size
    )
    
    return {
        "message": "File uploaded successfully",
        "doc_id": doc_info.id,
        "doc_type": doc_type,
        "file_name": file.filename,
        "file_size": file_size,
        "file_path": str(file_path)
    }


@router.get("/{testing_request_id}/documents")
def get_documents(
    testing_request_id: int,
    db: Session = Depends(get_db)
):
    """
    Get all documents for a testing request
    """
    documents = services.get_testing_request_documents(db, testing_request_id)
    return documents


@router.delete("/{testing_request_id}/documents/{doc_id}")
def delete_document(
    testing_request_id: int,
    doc_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete a document
    """
    doc = services.get_document_by_id(db, doc_id)
    
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    if doc.testing_request_id != testing_request_id:
        raise HTTPException(status_code=403, detail="Document doesn't belong to this request")
    
    # Delete physical file
    try:
        if os.path.exists(doc.file_path):
            os.remove(doc.file_path)
    except Exception as e:
        print(f"Warning: Failed to delete file {doc.file_path}: {e}")
    
    # Delete from database
    services.delete_document(db, doc_id)
    
    return {"message": "Document deleted successfully"}


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


@router.delete("/cleanup-drafts")
def cleanup_drafts(hours: int = 24, db: Session = Depends(get_db)):
    """
    Delete draft testing requests older than specified hours
    Default: 24 hours
    """
    count = services.cleanup_old_drafts(db, hours)
    return {"deleted": count, "message": f"Cleaned up {count} old draft(s)"}