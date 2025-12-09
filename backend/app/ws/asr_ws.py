# backend/app/ws/asr_ws.py
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
from typing import Set

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active: Set[WebSocket] = set()
        self.lock = asyncio.Lock()

    async def connect(self, ws: WebSocket):
        await ws.accept()
        async with self.lock:
            self.active.add(ws)

    async def disconnect(self, ws: WebSocket):
        async with self.lock:
            self.active.discard(ws)

    async def broadcast_bytes(self, data: bytes, exclude: WebSocket | None = None):
        # echo back to the same client — but we show broadcast helper in case you want broadcast later
        async with self.lock:
            to_remove = []
            for conn in list(self.active):
                if conn is exclude:
                    # send back to origin if you want origin echo; otherwise skip
                    try:
                        await conn.send_bytes(data)
                    except Exception:
                        to_remove.append(conn)
            for r in to_remove:
                self.active.discard(r)

manager = ConnectionManager()

@router.websocket("/ws/asr")
async def websocket_asr(ws: WebSocket):
    """
    Accepts binary frames and echoes them back.
    Frontend should send binary frames using WebSocket.send(ArrayBuffer) or similar.
    """
    await manager.connect(ws)
    try:
        while True:
            # receive_bytes() waits for a binary frame and returns bytes
            data: bytes = await ws.receive_bytes()
            # For validation: immediately echo the exact bytes back
            await ws.send_bytes(data)

            # If you want to also forward to other clients:
            # await manager.broadcast_bytes(data, exclude=ws)

    except WebSocketDisconnect:
        await manager.disconnect(ws)
    except Exception:
        # ensure we remove on unexpected errors
        await manager.disconnect(ws)
        # optional: log the exception
