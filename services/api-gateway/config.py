"""Configuration settings for API Gateway"""
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    """Application settings"""
    
    # Database
    DATABASE_URL: str = "postgresql://smartscreen:dev_password_123@postgres:5432/smartscreen"
    
    # Redis
    REDIS_URL: str = "redis://redis:6379"
    
    # RabbitMQ
    RABBITMQ_URL: str = "amqp://smartscreen:dev_password_123@rabbitmq:5672"
    
    # JWT
    JWT_SECRET: str = "dev_jwt_secret_change_in_production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_MINUTES: int = 60 * 24  # 24 hours
    
    # Microservices URLs
    FORMS_SERVICE_URL: str = "http://forms-service:8001"
    PLAGIARISM_SERVICE_URL: str = "http://plagiarism-service:8002"
    AI_DETECTION_SERVICE_URL: str = "http://ai-detection:8003"
    RANKING_SERVICE_URL: str = "http://ranking-service:8004"
    FILE_PROCESSING_URL: str = "http://file-processing:8005"
    
    # Rate limiting
    RATE_LIMIT_ENABLED: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
