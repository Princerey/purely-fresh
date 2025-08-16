from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from app.db.methods import get_db
from app.model.company import Company
from app.utils.mailgun import send_reset_email  # You need to implement this function
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from app.schema.validate import ConfirmPasswordRequest
from passlib.context import CryptContext

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

def create_jwt_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_jwt_token(token: str):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise credentials_exception

def verify_reset_token(token: str = Depends(oauth2_scheme)):
    payload = decode_jwt_token(token)
    return payload

@router.post("/login/reset/")
async def reset_password_request(
    email: str = Form(...),
    db: Session = Depends(get_db),
    
):
    # Replace %40 with @ in the email
    email = email.replace("%40", "@")
    token_data = {"sub": email}
    access_token_expires = timedelta(minutes=10)
    token = create_jwt_token(token_data, expires_delta=access_token_expires)
    # Check if the company email exists in the database
    company = db.query(Company).filter(Company.email == email).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company email not found. Please create a new account.")
    # Generate and send the reset email
    reset_link = f"http://localhost:5173/reset/{token}"  # Replace with your app's URL
    send_reset_email(email, reset_link)
    company.reset_token = True
    db.commit()
    return {"message": "Password reset email sent successfully."}

@router.patch("/login/reset/confirm/{token}")
async def confirm_reset_password(token: str, request: ConfirmPasswordRequest, db: Session = Depends(get_db)):
    # Verify the token and retrieve associated company email
    payload = verify_reset_token(token)
    company_email = payload["sub"]
    
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = pwd_context.hash(request.new_password)
    
    try:
        company = db.query(Company).filter(Company.email == company_email).first()
        if company.reset_token is None:
            raise HTTPException(status_code=400, detail="Reset link has already been used. Please generate a new one.")
        company.hashed_password = hashed_password
        company.reset_token = None
        db.commit()

    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail="Password reset failed")

    return {"message": "Password reset successful"}
