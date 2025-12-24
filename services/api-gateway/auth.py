import os
import re
import logging
from datetime import datetime, timedelta, timezone
from typing import Optional, Tuple
from jose import JWTError, jwt
from fastapi import HTTPException, status
import bcrypt
from database import get_db_connection
from psycopg2.extras import RealDictCursor
# Configure logging
logger = logging.getLogger(__name__)

SECRET_KEY = os.getenv("JWT_SECRET", "dev_jwt_secret_change_in_production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Constants
DEFAULT_TIER = 'free'
DEFAULT_CREDITS = 100
MIN_PASSWORD_LENGTH = 10
MAX_PASSWORD_LENGTH = 128

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password using bcrypt (handles 72-byte limit)"""
    try:
        # Bcrypt requires bytes for both inputs
        password_bytes = plain_password.encode('utf-8')
        
        # Handle 72-byte limit by truncating locally before passing to bcrypt
        # This is safe because we're still getting good entropy from the first 72 bytes
        if len(password_bytes) > 72:
            password_bytes = password_bytes[:72]
            
        hashed_bytes = hashed_password.encode('utf-8')
        
        return bcrypt.checkpw(password_bytes, hashed_bytes)
    except Exception as e:
        logger.error(f"Password verification error: {e}")
        return False

def get_password_hash(password: str) -> str:
    """Hash password using bcrypt (handles 72-byte limit)"""
    # Bcrypt requires bytes
    password_bytes = password.encode('utf-8')
    
    # Handle 72-byte limit
    if len(password_bytes) > 72:
        password_bytes = password_bytes[:72]
        
    # Generate salt and hash
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    return hashed.decode('utf-8')

def sanitize_for_log(text: str) -> str:
    """Sanitize text for logging to prevent log injection"""
    return text.replace('\n', '').replace('\r', '').replace('\t', ' ')

def validate_email(email: str) -> bool:
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password_strength(password: str) -> Tuple[bool, str]:
    """Validate password meets strength requirements"""
    if len(password) < MIN_PASSWORD_LENGTH:
        return False, f"Password must be at least {MIN_PASSWORD_LENGTH} characters"
    if len(password) > MAX_PASSWORD_LENGTH:
        return False, "Password is too long"
    if not any(c.isupper() for c in password):
        return False, "Password must contain at least one uppercase letter"
    if not any(c.islower() for c in password):
        return False, "Password must contain at least one lowercase letter"
    if not any(c.isdigit() for c in password):
        return False, "Password must contain at least one number"
    # Require special characters
    if not any(c in '!@#$%^&*()_+-=[]{}|;:,.<>?' for c in password):
        return False, "Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)"
    return True, "Valid"

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token with proper expiration"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def register_user(email: str, password: str, full_name: str, organization: str, role: str, 
                  phone_number: Optional[str] = None, use_case: Optional[str] = None, 
                  organization_size: Optional[str] = None) -> dict:
    """Register a new user in the database"""
    logger.info(f"Registration attempt for email: {sanitize_for_log(email)}")
    
    # Validate email format
    if not validate_email(email):
        logger.warning(f"Invalid email format: {email}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email format"
        )
    
    # Validate password strength
    is_valid, message = validate_password_strength(password)
    if not is_valid:
        logger.warning(f"Weak password for {email}: {message}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=message
        )
    
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                # Check if user already exists
                cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
                if cursor.fetchone():
                    logger.warning(f"Registration failed - email already exists: {email}")
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="Email already registered"
                    )
                
                # Create new user with all fields
                hashed_password = get_password_hash(password)
                cursor.execute(
                    """
                    INSERT INTO users (email, password_hash, full_name, organization, role, 
                                     phone_number, use_case, organization_size, tier, credits)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id, email, full_name, organization, role, phone_number, 
                             use_case, organization_size, created_at, tier, credits
                    """,
                    (email, hashed_password, full_name, organization, role, 
                     phone_number, use_case, organization_size, DEFAULT_TIER, DEFAULT_CREDITS)
                )
                
                user = cursor.fetchone()
                logger.info(f"User registered successfully: {email}")
                return dict(user)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Registration error for {email}: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Registration failed. Please try again."
        )

def authenticate_user(email: str, password: str) -> Optional[dict]:
    """Authenticate a user from the database"""
    logger.info(f"Login attempt for email: {sanitize_for_log(email)}")
    
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute(
                    "SELECT id, email, password_hash, tier, credits FROM users WHERE email = %s",
                    (email,)
                )
                user = cursor.fetchone()
                
                # Prevent username enumeration: use same error path for both cases
                if not user or not verify_password(password, user.get('password_hash', '')):
                    logger.warning(f"Login failed for: {email}")
                    return None
                
                logger.info(f"Login successful: {email}")
                return dict(user)
    except Exception as e:
        logger.error(f"Authentication error for {email}: {e}")
        return None

def get_current_user(token: str) -> dict:
    """Get current user from token"""
    payload = decode_access_token(token)
    if payload is None:
        logger.warning("Invalid token provided")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    email: str = payload.get("sub")
    if email is None:
        logger.warning("Token missing email claim")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )
    
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                cursor.execute(
                    "SELECT id, email, tier, credits FROM users WHERE email = %s",
                    (email,)
                )
                user = cursor.fetchone()
                
                if user is None:
                    logger.warning(f"Token valid but user not found: {email}")
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="User not found"
                    )
                
                return dict(user)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting current user: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve user information"
        )
