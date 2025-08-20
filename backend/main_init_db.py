# backend/main_init_db.py
from core.database import Base, engine
from models.user import User  # import all your models here

def init_db():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database initialized!")

if __name__ == "__main__":
    init_db()
