@echo off
REM Wonderland Toy Store - PostgreSQL Database Setup Script (Windows)
REM This script automates the database setup process

echo.
echo ================================================================================
echo   WONDERLAND TOY STORE - PostgreSQL Database Setup
echo ================================================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH!
    echo Please install Python 3.7+ from https://www.python.org/
    pause
    exit /b 1
)

echo [OK] Python found
echo.

REM Check if PostgreSQL is running
echo Checking PostgreSQL connection...
psql --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] PostgreSQL tools not found in PATH
    echo Please ensure PostgreSQL is installed and added to PATH
    echo.
)

REM Navigate to database folder
cd database
echo [OK] Changed to database folder

REM Install Python requirements
echo.
echo Installing Python dependencies...
echo [*] Installing psycopg2, python-dotenv...
pip install -q -r requirements.txt

if errorlevel 1 (
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)

echo [OK] Dependencies installed successfully
echo.

REM Run the setup script
echo ================================================================================
echo Starting database setup...
echo ================================================================================
echo.

python setup_database.py

if errorlevel 1 (
    echo.
    echo [ERROR] Database setup failed!
    pause
    exit /b 1
)

echo.
echo ================================================================================
echo [SUCCESS] Database setup completed!
echo ================================================================================
echo.
echo Next steps:
echo 1. Verify the database:
echo    psql -h localhost -U postgres -d wonderland_toy_store -c "SELECT COUNT(*) FROM products;"
echo.
echo 2. Check connection utility:
echo    python db_connection.py
echo.
echo 3. Read documentation:
echo    - QUICK_START.md
echo    - DATABASE_SETUP_README.md
echo.
echo ================================================================================
pause

