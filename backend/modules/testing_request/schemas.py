# schemas.py
from pydantic import BaseModel
from typing import List, Optional, Dict

class DimensionsSchema(BaseModel):
    length: str
    width: str
    height: str

class ProductDetailsSchema(BaseModel):
    eut_name: str
    eut_quantity: str
    manufacturer: str
    model_no: str
    serial_no: str

    supply_voltage: str
    operating_frequency: Optional[str]
    current: str
    weight: str

    dimensions: DimensionsSchema

    power_ports: str
    signal_lines: str
    software_name: Optional[str]
    software_version: Optional[str]

    industry: List[str]
    industry_other: Optional[str]

    preferred_date: Optional[str]
    notes: Optional[str]

class TechnicalDocumentItemSchema(BaseModel):
    doc_type: str
    file_name: str
    file_path: str | None = None
    file_size: int | None = 0


class TechnicalDocumentsSchema(BaseModel):
    documents: List[TechnicalDocumentItemSchema]

class TestingRequirementsSchema(BaseModel):
    test_type: str
    selected_tests: List[str]


class TestingStandardsSchema(BaseModel):
    regions: List[str]
    standards: List[str]


class LabSelectionSchema(BaseModel):
    selected_labs: List[str]
    remarks: Optional[str] = None

