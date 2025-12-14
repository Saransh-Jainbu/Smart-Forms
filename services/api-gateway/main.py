"""
SmartScreen AI - API Gateway
Main entry point for all API requests
"""
from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import httpx
from contextlib import asynccontextmanager
import logging
from typing import Optional

from config import settings
from auth import get_current_user, create_access_token
from models import User, LoginRequest, RegisterRequest

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Rate limiter
limiter = Limiter(key_func=get_remote_address)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    logger.info("🚀 API Gateway starting up...")
    yield
    logger.info("👋 API Gateway shutting down...")

# Initialize FastAPI app
app = FastAPI(
    title="SmartScreen AI - API Gateway",
    description="Production-grade API Gateway for SmartScreen AI microservices",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add rate limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:80"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== Health & Status ====================

@app.get("/health")
async def health_check():
    """Health check endpoint for load balancers"""
    return {"status": "healthy", "service": "api-gateway"}

@app.get("/ready")
async def readiness_check():
    """Readiness check for Kubernetes"""
    # TODO: Check database connection, Redis, etc.
    return {"status": "ready"}

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": "SmartScreen AI",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "operational"
    }

# ==================== Authentication ====================

@app.post("/api/auth/register")
@limiter.limit("5/minute")
async def register(request: Request, data: RegisterRequest):
    """Register a new user"""
    # TODO: Implement user registration
    # - Hash password
    # - Store in database
    # - Send verification email
    logger.info(f"Registration attempt for email: {data.email}")
    
    return {
        "message": "Registration successful",
        "email": data.email
    }

@app.post("/api/auth/login")
@limiter.limit("10/minute")
async def login(request: Request, data: LoginRequest):
    """Login and get JWT token"""
    # TODO: Implement authentication
    # - Verify credentials
    # - Generate JWT token
    logger.info(f"Login attempt for email: {data.email}")
    
    # Mock response for now
    access_token = create_access_token({"sub": data.email})
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@app.get("/api/auth/me")
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return current_user

# ==================== Forms Service Proxy ====================

@app.post("/api/forms/connect/google")
@limiter.limit("10/minute")
async def connect_google_form(
    request: Request,
    current_user: User = Depends(get_current_user)
):
    """Connect a Google Form"""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{settings.FORMS_SERVICE_URL}/connect/google",
                json=await request.json(),
                headers={"X-User-ID": str(current_user.id)},
                timeout=30.0
            )
            return response.json()
        except httpx.RequestError as e:
            logger.error(f"Error connecting to forms service: {e}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Forms service unavailable"
            )

@app.post("/api/forms/connect/microsoft")
@limiter.limit("10/minute")
async def connect_microsoft_form(
    request: Request,
    current_user: User = Depends(get_current_user)
):
    """Connect a Microsoft Form"""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{settings.FORMS_SERVICE_URL}/connect/microsoft",
                json=await request.json(),
                headers={"X-User-ID": str(current_user.id)},
                timeout=30.0
            )
            return response.json()
        except httpx.RequestError as e:
            logger.error(f"Error connecting to forms service: {e}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Forms service unavailable"
            )

@app.get("/api/forms")
async def list_connected_forms(current_user: User = Depends(get_current_user)):
    """List all connected forms for the current user"""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"{settings.FORMS_SERVICE_URL}/forms",
                headers={"X-User-ID": str(current_user.id)},
                timeout=30.0
            )
            return response.json()
        except httpx.RequestError as e:
            logger.error(f"Error fetching forms: {e}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Forms service unavailable"
            )

# ==================== Submissions ====================

@app.get("/api/forms/{form_id}/submissions")
async def get_submissions(
    form_id: str,
    current_user: User = Depends(get_current_user)
):
    """Get all submissions for a form"""
    # TODO: Fetch from database
    return {
        "form_id": form_id,
        "submissions": []
    }

@app.get("/api/submissions/{submission_id}")
async def get_submission_detail(
    submission_id: str,
    current_user: User = Depends(get_current_user)
):
    """Get detailed submission with plagiarism and AI detection results"""
    # TODO: Aggregate data from multiple services
    return {
        "submission_id": submission_id,
        "plagiarism_score": 0.0,
        "ai_score": 0.0,
        "quality_score": 0.0
    }

# ==================== Plagiarism Detection ====================

@app.post("/api/submissions/{submission_id}/analyze/plagiarism")
@limiter.limit("20/minute")
async def analyze_plagiarism(
    request: Request,
    submission_id: str,
    current_user: User = Depends(get_current_user)
):
    """Trigger plagiarism analysis for a submission"""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{settings.PLAGIARISM_SERVICE_URL}/analyze",
                json={"submission_id": submission_id},
                timeout=60.0
            )
            return response.json()
        except httpx.RequestError as e:
            logger.error(f"Error calling plagiarism service: {e}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Plagiarism service unavailable"
            )

# ==================== AI Detection ====================

@app.post("/api/submissions/{submission_id}/analyze/ai")
@limiter.limit("20/minute")
async def analyze_ai_content(
    request: Request,
    submission_id: str,
    current_user: User = Depends(get_current_user)
):
    """Trigger AI content detection for a submission"""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{settings.AI_DETECTION_SERVICE_URL}/analyze",
                json={"submission_id": submission_id},
                timeout=60.0
            )
            return response.json()
        except httpx.RequestError as e:
            logger.error(f"Error calling AI detection service: {e}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="AI detection service unavailable"
            )

# ==================== Rankings ====================

@app.get("/api/forms/{form_id}/rankings")
async def get_rankings(
    form_id: str,
    current_user: User = Depends(get_current_user)
):
    """Get ranked submissions for a form"""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"{settings.RANKING_SERVICE_URL}/rankings/{form_id}",
                headers={"X-User-ID": str(current_user.id)},
                timeout=30.0
            )
            return response.json()
        except httpx.RequestError as e:
            logger.error(f"Error calling ranking service: {e}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Ranking service unavailable"
            )

# ==================== Error Handlers ====================

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Custom HTTP exception handler"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Catch-all exception handler"""
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "status_code": 500
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
