# Import necessary modules
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.methods import get_db
from app.model.company import Company
from app.schema.validate import CreateUserRequest, Token
from passlib.context import CryptContext

# Create a FastAPI router
router = APIRouter()

# Initialize the password context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Endpoint to handle user creation
@router.post("/user/create")
async def create_company(
    request_data: CreateUserRequest,
    db: Session = Depends(get_db),
):
    # Extract data from the request body
    first_name = request_data.first_name
    last_name = request_data.last_name
    email = request_data.email
    password = request_data.password
    confirm_password = request_data.confirm_password

    # Check if passwords match
    if password != confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    # Hash the password before storing it
    hashed_password = pwd_context.hash(password)

    # Check if the email is already registered
    existing_company = db.query(Company).filter(Company.email == email).first()
    if existing_company:
        raise HTTPException(status_code=400, detail="Email is already registered")

    # Create a new company in the database
    new_company = Company(
        first_name=first_name,
        last_name=last_name,
        email=email,
        hashed_password=hashed_password
    )
    
    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    return new_company
