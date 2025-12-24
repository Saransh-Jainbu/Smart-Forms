"""
Database connection and utilities for Neon PostgreSQL
Implements connection pooling for better performance
"""
import os
import logging
from contextlib import contextmanager
import psycopg2
from psycopg2 import pool
from psycopg2.extras import RealDictCursor

# Configure logging
logger = logging.getLogger(__name__)

# Get database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set!")

# Connection pool configuration
MIN_CONNECTIONS = 1
MAX_CONNECTIONS = 20
CONNECTION_TIMEOUT = 10

# Create connection pool
try:
    connection_pool = pool.SimpleConnectionPool(
        minconn=MIN_CONNECTIONS,
        maxconn=MAX_CONNECTIONS,
        dsn=DATABASE_URL,
        connect_timeout=CONNECTION_TIMEOUT
    )
    logger.info(f"Database connection pool created (min={MIN_CONNECTIONS}, max={MAX_CONNECTIONS})")
except psycopg2.Error as e:
    logger.error(f"Failed to create connection pool: {e}")
    raise

@contextmanager
def get_db_connection():
    """Get a database connection from the pool"""
    conn = None
    try:
        conn = connection_pool.getconn()
        logger.debug("Database connection acquired from pool")
        yield conn
        conn.commit()
        logger.debug("Database transaction committed")
    except psycopg2.OperationalError as e:
        logger.error(f"Database operational error: {e}")
        if conn:
            conn.rollback()
        raise
    except psycopg2.Error as e:
        logger.error(f"Database error: {e}")
        if conn:
            conn.rollback()
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        if conn:
            conn.rollback()
        raise
    finally:
        if conn:
            connection_pool.putconn(conn)
            logger.debug("Database connection returned to pool")

def get_db_cursor(conn):
    """Get a cursor that returns results as dictionaries"""
    return conn.cursor(cursor_factory=RealDictCursor)

def close_all_connections():
    """Close all connections in the pool (call on shutdown)"""
    if connection_pool:
        connection_pool.closeall()
        logger.info("All database connections closed")

def get_pool_status() -> dict:
    """Get current connection pool status for monitoring"""
    try:
        # Access internal pool to get stats
        available = connection_pool._pool.qsize() if hasattr(connection_pool, '_pool') else 0
        in_use = MAX_CONNECTIONS - available
        return {
            "max_connections": MAX_CONNECTIONS,
            "min_connections": MIN_CONNECTIONS,
            "available": available,
            "in_use": in_use,
            "utilization_percent": round((in_use / MAX_CONNECTIONS) * 100, 2)
        }
    except Exception as e:
        logger.error(f"Error getting pool status: {e}")
        return {"error": "Unable to retrieve pool status"}
