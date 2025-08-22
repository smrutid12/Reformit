from fastapi import FastAPI
from routers import health, auth, convert, history

app = FastAPI(
    title="ReformIt Backend",
    description="""This backend powers file conversion and history tracking with authentication.""",
    version="1.0.0",
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT",
    },
)

# Include routers
app.include_router(health.router)
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(convert.router, prefix="/convert", tags=["convert"])
app.include_router(history.router, prefix="/history", tags=["history"])
