# app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.database import engine, Base
from modules.testing_request.routes import router as testing_request_router
from modules.product_details.routes import router as product_details_router  # ✅ NEW
from modules.auth.routes import router as auth_router

app = FastAPI(title="Testing Request Backend")

# ✅ CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Add more origins as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create all tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(testing_request_router)
app.include_router(product_details_router)  # ✅ NEW ROUTER
app.include_router(auth_router)

@app.get("/")
def root():
    return {
        "message": "Testing Request Backend API",
        "endpoints": {
            "testing_request": "/testing-request",
            "product_details": "/product-details",  # ✅ NEW
            "docs": "/docs"
        }
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}