# Database Setup Scripts

This directory contains scripts for database initialization and management.

## Scripts

### `init_db.py`
Initializes the complete database schema for SmartScreen AI.

**Usage:**
```bash
# Make sure DATABASE_URL is set in your .env file
python scripts/init_db.py
```

**What it does:**
- Creates all necessary tables (users, forms, submissions, etc.)
- Creates indexes for performance
- Verifies table creation
- Provides detailed output

**Tables Created:**
- `users` - User accounts and authentication
- `forms` - Connected forms from Google Forms/Typeform
- `submissions` - Form submissions to analyze
- `analysis_results` - Plagiarism and AI detection results
- `credit_transactions` - User credit usage tracking
- `activity_log` - User activity history

## Environment Variables

Required environment variables (set in `.env`):
```bash
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```

## First Time Setup

1. **Create your `.env` file** (if not already created):
   ```bash
   cp .env.example .env
   ```

2. **Add your Neon database URL** to `.env`:
   ```bash
   DATABASE_URL=your_neon_connection_string
   ```

3. **Run the initialization script**:
   ```bash
   python scripts/init_db.py
   ```

## Resetting the Database

To reset your database (⚠️ **WARNING: This will delete all data!**):

```bash
# Drop all tables (manual step via Neon console or psql)
# Then run:
python scripts/init_db.py
```

## Docker Usage

To run the script inside the API Gateway container:

```bash
docker exec smartscreen-api-gateway python /app/scripts/init_db.py
```

## Troubleshooting

**Error: "DATABASE_URL environment variable is not set"**
- Make sure you have a `.env` file in the project root
- Verify the `DATABASE_URL` is set correctly

**Error: "relation already exists"**
- Tables already exist (this is fine - script uses `CREATE TABLE IF NOT EXISTS`)

**Connection errors:**
- Verify your Neon database URL is correct
- Check that SSL mode is set to `require`
- Ensure your IP is allowed in Neon's firewall settings
