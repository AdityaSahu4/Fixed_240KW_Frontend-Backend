import os
from functools import lru_cache

class Settings:
    APP_NAME: str = "Testing Request Platform"
    DEBUG: bool = True

    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///database/app.db"
    )

@lru_cache()
def get_settings():
    return Settings()
