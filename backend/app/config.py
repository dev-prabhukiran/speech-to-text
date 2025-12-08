# backend/app/config.py
from functools import lru_cache
from typing import Optional

from pydantic import Field  # for typed defaults if you use it
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str = "speech-to-text-backend"
    ENV: str = "development"        # development | staging | production
    LOG_LEVEL: str = "INFO"         # DEBUG, INFO, WARNING, ERROR, CRITICAL
    LOG_FORMAT: str = "json"        # json | human

    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DATABASE_URL: Optional[str] = None

    # pydantic-settings config
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False
    )

@lru_cache()
def get_settings() -> Settings:
    """Cached settings instance for the app."""
    return Settings()
