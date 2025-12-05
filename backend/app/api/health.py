from fastapi import APIRouter
from datetime import datetime

router=APIRouter()

start_time=datetime.utcnow()

@router.get("/health")
async def health():
    return {"status" : "ok"}

@router.get("/metrics")
async def metrics():
    uptime=(datetime.utcnow()-start_time).total_seconds()
    return {
        "uptime_seconds":uptime,
        "status":"ok"
    }