# modules/testing_request/services.py
from sqlalchemy.orm import Session
from .models import (
    TestingRequest,
    ProductDetails,
    TechnicalDocument,
    TestingRequirements,
    TestingStandards,
    LabSelection
)
from .schemas import (
    ProductDetailsSchema,
    TechnicalDocumentsSchema,
    TestingRequirementsSchema,
    TestingStandardsSchema,
    LabSelectionSchema
)
from datetime import datetime, timedelta
from typing import Optional, List


def cleanup_old_drafts(db: Session, hours: int = 24):
    """
    Delete draft testing requests older than X hours
    This helps keep your database clean
    """
    cutoff_time = datetime.utcnow() - timedelta(hours=hours)
    
    old_drafts = db.query(TestingRequest).filter(
        TestingRequest.status == "draft",
        TestingRequest.created_at < cutoff_time
    ).all()
    
    count = len(old_drafts)
    
    for draft in old_drafts:
        # Delete related records first (due to foreign keys)
        db.query(ProductDetails).filter(
            ProductDetails.testing_request_id == draft.id
        ).delete()
        
        db.query(TechnicalDocument).filter(
            TechnicalDocument.testing_request_id == draft.id
        ).delete()
        
        db.query(TestingRequirements).filter(
            TestingRequirements.testing_request_id == draft.id
        ).delete()
        
        db.query(TestingStandards).filter(
            TestingStandards.testing_request_id == draft.id
        ).delete()
        
        db.query(LabSelection).filter(
            LabSelection.testing_request_id == draft.id
        ).delete()
        
        # Finally delete the draft itself
        db.delete(draft)
    
    db.commit()
    return count


def create_testing_request(db: Session):
    tr = TestingRequest(status="draft")
    db.add(tr)
    db.commit()
    db.refresh(tr)
    return tr


def save_draft(db, testing_request_id: int):
    tr = db.query(TestingRequest).filter(
        TestingRequest.id == testing_request_id
    ).first()

    if not tr:
        raise ValueError("TestingRequest not found")

    tr.status = "draft"
    db.commit()


def save_product_details(db: Session, testing_request_id: int, payload: ProductDetailsSchema):
    pd = db.query(ProductDetails).filter(
        ProductDetails.testing_request_id == testing_request_id
    ).first()

    if not pd:
        pd = ProductDetails(testing_request_id=testing_request_id)
        db.add(pd)

    pd.eut_name = payload.eut_name
    pd.eut_quantity = payload.eut_quantity
    pd.manufacturer = payload.manufacturer
    pd.model_no = payload.model_no
    pd.serial_no = payload.serial_no
    pd.supply_voltage = payload.supply_voltage
    pd.operating_frequency = payload.operating_frequency
    pd.current = payload.current
    pd.weight = payload.weight

    pd.length_mm = payload.dimensions.length
    pd.width_mm = payload.dimensions.width
    pd.height_mm = payload.dimensions.height

    pd.power_ports = payload.power_ports
    pd.signal_lines = payload.signal_lines
    pd.software_name = payload.software_name
    pd.software_version = payload.software_version

    pd.industry = payload.industry
    pd.industry_other = payload.industry_other
    pd.preferred_date = payload.preferred_date
    pd.notes = payload.notes

    db.commit()


def save_technical_documents(
    db: Session,
    testing_request_id: int,
    documents: list
):
    for doc in documents:
        td = TechnicalDocument(
            testing_request_id=testing_request_id,
            doc_type=doc.doc_type,
            file_name=doc.file_name,
            file_path=doc.file_path,
            file_size=doc.file_size or 0
        )
        db.add(td)

    db.commit()


# ✅ NEW: Document management functions

def save_document_info(
    db: Session,
    testing_request_id: int,
    doc_type: str,
    file_name: str,
    file_path: str,
    file_size: int
) -> TechnicalDocument:
    """
    Save document information to database
    """
    document = TechnicalDocument(
        testing_request_id=testing_request_id,
        doc_type=doc_type,
        file_name=file_name,
        file_path=file_path,
        file_size=file_size
    )
    
    db.add(document)
    db.commit()
    db.refresh(document)
    return document


def get_testing_request_documents(
    db: Session,
    testing_request_id: int
) -> List[TechnicalDocument]:
    """
    Get all documents for a testing request
    """
    return db.query(TechnicalDocument).filter(
        TechnicalDocument.testing_request_id == testing_request_id
    ).order_by(TechnicalDocument.uploaded_at.desc()).all()


def get_document_by_id(
    db: Session,
    doc_id: int
) -> Optional[TechnicalDocument]:
    """
    Get a document by ID
    """
    return db.query(TechnicalDocument).filter(
        TechnicalDocument.id == doc_id
    ).first()


def delete_document(
    db: Session,
    doc_id: int
) -> bool:
    """
    Delete a document from database
    """
    document = get_document_by_id(db, doc_id)
    if document:
        db.delete(document)
        db.commit()
        return True
    return False


def save_testing_requirements(db: Session, testing_request_id: int, payload: TestingRequirementsSchema):
    tr = db.query(TestingRequirements).filter(
        TestingRequirements.testing_request_id == testing_request_id
    ).first()

    if not tr:
        tr = TestingRequirements(testing_request_id=testing_request_id)
        db.add(tr)

    tr.test_type = payload.test_type
    tr.selected_tests = payload.selected_tests

    db.commit()


def save_testing_standards(db: Session, testing_request_id: int, payload: TestingStandardsSchema):
    ts = db.query(TestingStandards).filter(
        TestingStandards.testing_request_id == testing_request_id
    ).first()

    if not ts:
        ts = TestingStandards(testing_request_id=testing_request_id)
        db.add(ts)

    ts.regions = payload.regions
    ts.standards = payload.standards

    db.commit()


def submit_request(db: Session, testing_request_id: int, payload: LabSelectionSchema):
    tr = db.query(TestingRequest).filter(
        TestingRequest.id == testing_request_id
    ).first()

    if not tr:
        raise ValueError("TestingRequest not found")

    lab = db.query(LabSelection).filter(
        LabSelection.testing_request_id == testing_request_id
    ).first()

    if lab:
        lab.selected_labs = payload.selected_labs
        lab.remarks = payload.remarks
    else:
        lab = LabSelection(
            testing_request_id=testing_request_id,
            selected_labs=payload.selected_labs,
            remarks=payload.remarks
        )
        db.add(lab)

    tr.status = "submitted"
    db.commit()


def get_full_testing_request(db: Session, testing_request_id: int):
    """
    Returns data structure matching frontend expectations
    """
    tr = db.query(TestingRequest).filter(
        TestingRequest.id == testing_request_id
    ).first()

    if not tr:
        return None

    product = db.query(ProductDetails).filter_by(
        testing_request_id=testing_request_id
    ).first()

    requirements = db.query(TestingRequirements).filter_by(
        testing_request_id=testing_request_id
    ).first()

    standards = db.query(TestingStandards).filter_by(
        testing_request_id=testing_request_id
    ).first()

    lab = db.query(LabSelection).filter_by(
        testing_request_id=testing_request_id
    ).first()

    return {
        "id": tr.id,
        "status": tr.status,
        "created_at": str(tr.created_at) if tr.created_at else None,
        "product_details": {
            "eut_name": product.eut_name,
            "eut_quantity": product.eut_quantity,
            "manufacturer": product.manufacturer,
            "model_no": product.model_no,
            "serial_no": product.serial_no,
            "supply_voltage": product.supply_voltage,
            "operating_frequency": product.operating_frequency,
            "current": product.current,
            "weight": product.weight,
            "dimensions": {
                "length": product.length_mm,
                "width": product.width_mm,
                "height": product.height_mm
            },
            "power_ports": product.power_ports,
            "signal_lines": product.signal_lines,
            "software_name": product.software_name,
            "software_version": product.software_version,
            "industry": product.industry,
            "industry_other": product.industry_other,
            "preferred_date": product.preferred_date,
            "notes": product.notes
        } if product else None,
        "testing_requirements": {
            "test_type": requirements.test_type,
            "selected_tests": requirements.selected_tests
        } if requirements else None,
        "testing_standards": {
            "regions": standards.regions,
            "standards": standards.standards
        } if standards else None,
        "lab_selection": {
            "selected_labs": lab.selected_labs,
            "remarks": lab.remarks
        } if lab else None
    }