"""
Add User Profile Fields Migration
Adds additional fields to users table for enhanced signup
Run this inside the api-gateway container: docker exec -it smartscreen-api-gateway python /app/scripts/add_user_fields.py
"""
import psycopg2
import os

def migrate():
    """Add new fields to users table"""
    database_url = os.getenv('DATABASE_URL')
    if not database_url:
        print("❌ DATABASE_URL not found in environment")
        return
    
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    try:
        print("Adding new fields to users table...")
        
        # Add new columns
        cursor.execute("""
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS full_name VARCHAR(255),
            ADD COLUMN IF NOT EXISTS organization VARCHAR(255),
            ADD COLUMN IF NOT EXISTS role VARCHAR(50),
            ADD COLUMN IF NOT EXISTS phone_number VARCHAR(20),
            ADD COLUMN IF NOT EXISTS use_case VARCHAR(100),
            ADD COLUMN IF NOT EXISTS organization_size VARCHAR(50);
        """)
        
        conn.commit()
        print("✅ Migration completed successfully!")
        
        # Verify columns were added
        cursor.execute("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'users'
            ORDER BY ordinal_position;
        """)
        
        print("\nCurrent users table schema:")
        for row in cursor.fetchall():
            print(f"  - {row[0]}: {row[1]}")
            
    except Exception as e:
        conn.rollback()
        print(f"❌ Migration failed: {e}")
        raise
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    migrate()
