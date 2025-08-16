# app/api/company.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.methods import get_db
from app.model.company import Company
from app.schema.validate import Token,LoginRequest
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()
@router.post("/login", response_model=Token)
async def login_user(
    login_data: LoginRequest,
    db: Session = Depends(get_db),
):
    # Get the user from the database based on the provided username
    user = db.query(Company).filter(Company.email == login_data.email).first()

    # Check if the user exists and the password is correct
    if user and pwd_context.verify(login_data.password, user.hashed_password):
        # Generate a JWT token for the user
        token_data = {
            "sub": user.email,
            "exp": datetime.utcnow() + timedelta(minutes=15),  # Token expiration time
        }
        token = jwt.encode(token_data, "your-secret-key", algorithm="HS256")

        return {"access_token": token, "token_type": "bearer"}

    # If the credentials are invalid, raise an HTTPException
    raise HTTPException(status_code=401, detail="Invalid credentials")