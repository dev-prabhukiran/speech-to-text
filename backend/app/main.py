from fastapi import FastAPI
from app.api.health import router as health_router
from app.config import get_settings
from app.logging import setup_logging

settings = get_settings()
setup_logging(settings)

app=FastAPI(
    title=settings.APP_NAME,
    version="0.1.0"
)

@app.get("/")
async def root():
    return {"message":"Backend is running"}

app.include_router(health_router)