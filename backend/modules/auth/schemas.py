from pydantic import BaseModel, EmailStr

class SignupSchema(BaseModel):
    first_name: str
    last_name: str
    company_name: str | None = None
    email: EmailStr
    password: str

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
