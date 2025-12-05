from fastapi import FastAPI
from app.api.health import router as health_router

app=FastAPI(
    title="Speech to Text Backend",
    version="0.1.0"
)

@app.get("/")
async def root():
    return {"message":"Backend is running"}

app.include_router(health_router)