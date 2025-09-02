from fastapi import FastAPI
from routers import health, auth, convert, history, config
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="ReformIt Backend",
    description="""This backend powers file conversion and history tracking with authentication.""",
    version="1.0.0",
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT",
    },
)

origins = [
    "http://localhost:5173",  # Vite/React dev server
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,         # 👈 allow specific origins
    allow_credentials=True,
    allow_methods=["*"],           # allow all HTTP methods
    allow_headers=["*"],           # allow all headers
)

# Include routers
app.include_router(health.router)
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(config.router, prefix="/auth", tags=["config"])
app.include_router(convert.router, tags=["convert"])
app.include_router(history.router, tags=["history"])
