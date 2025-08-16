# app/model/company.py
from sqlalchemy import Column, Integer, String,create_engine
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class Company(Base):
    __tablename__ = "company"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    email = Column(String,unique=True, index=True)
    hashed_password = Column(String)
    reset_token = Column(String)
