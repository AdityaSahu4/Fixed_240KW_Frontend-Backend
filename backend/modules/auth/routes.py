from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.database import get_auth_db, auth_engine, AuthBase
from .models import User
from .schemas import SignupSchema, LoginSchema, TokenResponse
from .services import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

# Create users table (auth.db only)
AuthBase.metadata.create_all(bind=auth_engine)

@router.post("/signup")
def signup(payload: SignupSchema, db: Session = Depends(get_auth_db)):
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        first_name=payload.first_name,
        last_name=payload.last_name,
        company_name=payload.company_name,
        email=payload.email,
        password_hash=hash_password(payload.password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "User registered successfully"}

@router.post("/login", response_model=TokenResponse)
def login(payload: LoginSchema, db: Session = Depends(get_auth_db)):
    user = db.query(User).filter(User.email == payload.email).first()

    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": str(user.id)})

    return {
        "access_token": token,
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email
        }
    }
