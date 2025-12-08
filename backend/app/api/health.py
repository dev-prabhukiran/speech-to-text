from datetime import datetime

from fastapi import APIRouter

router = APIRouter()

start_time = datetime.utcnow()


@router.get("/health")
async def health():
    import logging

    logging.getLogger("app").info("health check")
    return {"status": "ok"}


@router.get("/metrics")
async def metrics():
    uptime = (datetime.utcnow() - start_time).total_seconds()
    return {"uptime_seconds": uptime, "status": "ok"}
