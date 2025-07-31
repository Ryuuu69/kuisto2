from pydantic_settings import BaseSettings, SettingsConfigDict
from decimal import Decimal

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    DATABASE_URL: str
    ADMIN_TOKEN: str

    RESTAURANT_LAT: float
    RESTAURANT_LNG: float
    DELIVERY_BASE_FEE: Decimal
    DELIVERY_PER_KM_FEE: Decimal

settings = Settings()