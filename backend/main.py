from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession

from database.session import async_engine, get_db
from database.base import Base # Import Base to ensure models are registered
from api.routers import api_router

app = FastAPI(
    title="Restaurant API",
    description="API backend for a restaurant management system.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Create database tables on startup (for development)
@app.on_event("startup")
async def create_db_tables():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Include all API routers
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Restaurant API is running. Access docs at /docs"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}