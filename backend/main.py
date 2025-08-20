# backend/main.py
from fastapi import FastAPI
from routers import health, auth, convert

app = FastAPI(title="ReformIt Backend")

# Include routers
app.include_router(health.router)
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(convert.router, prefix="/convert", tags=["convert"])
