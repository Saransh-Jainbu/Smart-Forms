"""
Database Schema Initialization Script for SmartScreen AI
Run this script to create all necessary tables in your Neon PostgreSQL database

Usage:
    python scripts/init_db.py
    
Environment Variables Required:
    DATABASE_URL - PostgreSQL connection string
"""
import os
import sys
import psycopg2
from psycopg2 import sql

def get_database_url():
    """Get database URL from environment variable"""
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("❌ ERROR: DATABASE_URL environment variable is not set!")
        print("\nPlease set it in your .env file or export it:")
        print('  export DATABASE_URL="postgresql://user:pass@host/db"')
        sys.exit(1)
    return db_url

def create_users_table(cursor):
    """Create users table with indexes"""
    print("📋 Creating users table...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            tier VARCHAR(50) DEFAULT 'free',
            credits INTEGER DEFAULT 100,
            is_active BOOLEAN DEFAULT TRUE
        )
    """)
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)")
    print("  ✅ Users table created")

def create_forms_table(cursor):
    """Create forms table with indexes"""
    print("📋 Creating forms table...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS forms (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            platform VARCHAR(50) NOT NULL,
            form_id VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_sync TIMESTAMP,
            is_active BOOLEAN DEFAULT TRUE
        )
    """)
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_forms_user_id ON forms(user_id)")
    print("  ✅ Forms table created")

def create_submissions_table(cursor):
    """Create submissions table with indexes"""
    print("📋 Creating submissions table...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS submissions (
            id SERIAL PRIMARY KEY,
            form_id INTEGER REFERENCES forms(id) ON DELETE CASCADE,
            submitter_name VARCHAR(255),
            submitter_email VARCHAR(255),
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            plagiarism_score INTEGER DEFAULT 0,
            ai_score INTEGER DEFAULT 0,
            quality_score INTEGER DEFAULT 0,
            status VARCHAR(50) DEFAULT 'pending',
            rank INTEGER,
            data JSONB
        )
    """)
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_submissions_form_id ON submissions(form_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status)")
    print("  ✅ Submissions table created")

def create_analysis_results_table(cursor):
    """Create analysis results table"""
    print("📋 Creating analysis_results table...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS analysis_results (
            id SERIAL PRIMARY KEY,
            submission_id INTEGER REFERENCES submissions(id) ON DELETE CASCADE,
            analysis_type VARCHAR(50) NOT NULL,
            score INTEGER,
            details JSONB,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_analysis_submission_id ON analysis_results(submission_id)")
    print("  ✅ Analysis results table created")

def create_credit_transactions_table(cursor):
    """Create credit transactions table"""
    print("📋 Creating credit_transactions table...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS credit_transactions (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            amount INTEGER NOT NULL,
            transaction_type VARCHAR(50) NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id)")
    print("  ✅ Credit transactions table created")

def create_activity_log_table(cursor):
    """Create activity log table"""
    print("📋 Creating activity_log table...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS activity_log (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            activity_type VARCHAR(50) NOT NULL,
            description TEXT,
            metadata JSONB,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON activity_log(user_id)")
    print("  ✅ Activity log table created")

def verify_tables(cursor):
    """Verify all tables were created"""
    print("\n🔍 Verifying tables...")
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name
    """)
    tables = cursor.fetchall()
    
    if tables:
        print(f"\n✅ Successfully created {len(tables)} tables:")
        for table in tables:
            print(f"   • {table[0]}")
    else:
        print("⚠️  No tables found")
    
    return len(tables)

def main():
    """Main function to initialize database"""
    print("=" * 60)
    print("SmartScreen AI - Database Initialization")
    print("=" * 60)
    
    # Get database URL
    database_url = get_database_url()
    print(f"\n🔗 Connecting to database...")
    
    try:
        # Connect to database
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        print("✅ Connected successfully!\n")
        
        # Create all tables
        create_users_table(cursor)
        create_forms_table(cursor)
        create_submissions_table(cursor)
        create_analysis_results_table(cursor)
        create_credit_transactions_table(cursor)
        create_activity_log_table(cursor)
        
        # Commit changes
        conn.commit()
        
        # Verify tables
        table_count = verify_tables(cursor)
        
        # Close connection
        cursor.close()
        conn.close()
        
        print("\n" + "=" * 60)
        print("🎉 Database initialization completed successfully!")
        print("=" * 60)
        
    except psycopg2.Error as e:
        print(f"\n❌ Database error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
