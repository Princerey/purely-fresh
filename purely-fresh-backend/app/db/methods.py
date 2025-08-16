# app/db/methods.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Example PostgreSQL URL
# SQLALCHEMY_DATABASE_URL = "postgresql://bluegennx:lvD3C1mzoPCwlh2ub9Fw8fCCLoDDtFYp@dpg-cm2328nqd2ns73d85bj0-a.oregon-postgres.render.com/database_zy1e"
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()