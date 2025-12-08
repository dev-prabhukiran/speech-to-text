# backend/app/logging.py
import logging
import logging.config
from pythonjsonlogger import jsonlogger
from .config import Settings, get_settings
import sys

def _json_formatter():
    return jsonlogger.JsonFormatter(
        '%(asctime)s %(levelname)s %(name)s %(message)s %(pathname)s %(lineno)d'
    )

def _human_formatter():
    fmt = '%(asctime)s %(levelname)-8s [%(name)s:%(lineno)d] %(message)s'
    from logging import Formatter
    return Formatter(fmt)

def build_logging_config(level: str = "INFO", fmt_type: str = "json"):
    level = level.upper()
    if fmt_type == "human":
        formatter_obj = {
            "()": "logging.Formatter",
            "format": '%(asctime)s %(levelname)-8s [%(name)s:%(lineno)d] %(message)s'
        }
    else:
        # json formatter
        formatter_obj = {
            "()": "pythonjsonlogger.jsonlogger.JsonFormatter",
            "fmt": '%(asctime)s %(levelname)s %(name)s %(message)s'
        }

    return {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "default": formatter_obj
        },
        "handlers": {
            "stdout": {
                "class": "logging.StreamHandler",
                "level": level,
                "formatter": "default",
                "stream": "ext://sys.stdout"
            }
        },
        "root": {
            "handlers": ["stdout"],
            "level": level
        },
        "loggers": {
            # silence noisy dependencies if desired
            "uvicorn.access": {"level": "INFO", "handlers": ["stdout"], "propagate": False},
            "uvicorn.error": {"level": "INFO", "handlers": ["stdout"], "propagate": False}
        }
    }

def setup_logging(settings: Settings = None):
    """
    Call this early in your app startup.
    """
    if settings is None:
        settings = get_settings()

    config = build_logging_config(level=settings.LOG_LEVEL, fmt_type=settings.LOG_FORMAT)
    logging.config.dictConfig(config)

    # Example: log that logging is configured
    logging.getLogger(__name__).info("Logging configured", extra={
        "env": settings.ENV, "level": settings.LOG_LEVEL, "format": settings.LOG_FORMAT
    })
