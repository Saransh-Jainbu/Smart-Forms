"""Pydantic models for API Gateway"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

# ==================== User Models ====================

class User(BaseModel):
    """User model"""
    id: int
    email: EmailStr
    is_active: bool = True
    is_premium: bool = False
    created_at: Optional[datetime] = None

class RegisterRequest(BaseModel):
    """User registration request"""
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: Optional[str] = None

class LoginRequest(BaseModel):
    """User login request"""
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"

# ==================== Form Models ====================

class ConnectFormRequest(BaseModel):
    """Request to connect a form"""
    form_id: str
    platform: str = Field(..., pattern="^(google|microsoft)$")
    access_token: Optional[str] = None

class FormResponse(BaseModel):
    """Form information"""
    id: str
    title: str
    platform: str
    connected_at: datetime
    total_submissions: int = 0

# ==================== Submission Models ====================

class SubmissionResponse(BaseModel):
    """Submission information"""
    id: str
    form_id: str
    respondent_email: Optional[str] = None
    submitted_at: datetime
    plagiarism_score: Optional[float] = None
    ai_score: Optional[float] = None
    quality_score: Optional[float] = None
    final_rank: Optional[int] = None

class PlagiarismResult(BaseModel):
    """Plagiarism detection result"""
    submission_id: str
    similarity_score: float
    is_plagiarized: bool
    matches: list = []

class AIDetectionResult(BaseModel):
    """AI content detection result"""
    submission_id: str
    ai_probability: float
    is_ai_generated: bool
    confidence: float

# ==================== Error Models ====================

class ErrorResponse(BaseModel):
    """Error response"""
    error: str
    status_code: int
    detail: Optional[str] = None
