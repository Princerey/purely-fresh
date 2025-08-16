from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from app.model.company import Base


# DATABASE_URL = "postgresql://bluegennx:lvD3C1mzoPCwlh2ub9Fw8fCCLoDDtFYp@dpg-cm2328nqd2ns73d85bj0-a.oregon-postgres.render.com/database_zy1e"
DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL)
metadata = MetaData()

# Create tables if they do not exist
Base.metadata.create_all(bind=engine)

# Function to initialize the database
def init_db():
    db = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    return db()
