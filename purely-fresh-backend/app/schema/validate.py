# app/schema/validate.py
from pydantic import BaseModel, EmailStr 
from typing import Optional

class CreateUserRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr  
    password: str
    confirm_password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class ConfirmPasswordRequest(BaseModel):
    new_password: str
    confirm_new_pass : str

class TokenData(BaseModel):
    sub: Optional[str] = None