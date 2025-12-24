import os
import hashlib
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from fastapi import HTTPException, status
from database import get_db_connection, get_db_cursor

SECRET_KEY = os.getenv("JWT_SECRET", "dev_jwt_secret_change_in_production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password using SHA256"""
    password_hash = hashlib.sha256(plain_password.encode()).hexdigest()
    return password_hash == hashed_password

def get_password_hash(password: str) -> str:
    """Hash password using SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def register_user(email: str, password: str) -> dict:
    """Register a new user in the database"""
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        # Check if user already exists
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        hashed_password = get_password_hash(password)
        cursor.execute(
            """
            INSERT INTO users (email, password_hash, tier, credits)
            VALUES (%s, %s, %s, %s)
            RETURNING id, email, created_at, tier, credits
            """,
            (email, hashed_password, 'free', 100)
        )
        
        user = cursor.fetchone()
        cursor.close()
        
        return dict(user)

def authenticate_user(email: str, password: str) -> Optional[dict]:
    """Authenticate a user from the database"""
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        
        cursor.execute(
            "SELECT id, email, password_hash, tier, credits FROM users WHERE email = %s",
            (email,)
        )
        user = cursor.fetchone()
        cursor.close()
        
        if not user:
            return None
        
        if not verify_password(password, user['password_hash']):
            return None
        
        return dict(user)

def get_current_user(token: str) -> dict:
    """Get current user from token"""
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    email: str = payload.get("sub")
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )
    
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        cursor.execute(
            "SELECT id, email, tier, credits FROM users WHERE email = %s",
            (email,)
        )
        user = cursor.fetchone()
        cursor.close()
        
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        
        return dict(user)
