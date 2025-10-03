ENVIRONMENT VARIABLES CONFIGURATION
====================================

This file contains the required environment variables for the portfolio project.
Copy the values below and configure them according to your setup.

---

DATABASE CONFIGURATION:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=portfolio_db

NOTES:
- For local development with XAMPP, use the values above
- For production (InfinityFree), update DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME with your hosting database credentials
- Make sure to create the database using the schema in database/schema.sql
- Run the migration script: npx ts-node scripts/migrateToMySQL.ts

---

ORIGINAL ENV.EXAMPLE CONTENT:
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=portfolio_db

# Optional: Add more environment variables here as needed
# NEXT_PUBLIC_API_URL=http://localhost:3000
