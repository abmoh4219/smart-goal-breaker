from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path
from typing import List

ENV_PATH = Path(__file__).resolve().parents[3] / ".env"

class Settings(BaseSettings):
    PROJECT_NAME: str
    API_V1_STR: str = "/api/v1"

    GEMINI_API_KEY: str

    POSTGRES_USER: str 
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str 
    POSTGRES_HOST: str 
    POSTGRES_PORT: int
    PROJECT_VERSION: str

    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    BACKEND_CORS_ORIGINS: List[str]

    model_config = SettingsConfigDict(
        env_file= str(ENV_PATH),
        case_sensitive=False,
        extra="ignore"
    )

settings = Settings()

