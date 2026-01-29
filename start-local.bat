@echo off
REM Batch script to start the project locally on Windows
REM Run this from Command Prompt: start-local.bat

echo.
echo Starting Bill Real Estate Project Locally...
echo.

REM Check if .env exists
if not exist .env (
    echo .env file not found!
    if exist .env.example (
        echo Creating .env from .env.example...
        copy .env.example .env
        echo Created .env file. Please edit it with your values.
        pause
    ) else (
        echo .env.example not found. Please create .env manually.
        pause
        exit /b 1
    )
)

REM Check if Docker is running
echo Checking Docker...
docker ps >nul 2>&1
if errorlevel 1 (
    echo Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)
echo Docker is running.

REM Check if pnpm is installed
echo Checking pnpm...
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo pnpm is not installed. Install with: npm install -g pnpm
    pause
    exit /b 1
)
echo pnpm is installed.

REM Install dependencies if needed
if not exist node_modules (
    echo.
    echo Installing dependencies...
    call pnpm install
)

REM Start Docker services
echo.
echo Starting Docker services...
cd docker
docker compose up -d
cd ..

REM Wait a bit for services to start
echo Waiting for services to start...
timeout /t 5 /nobreak >nul

REM Setup database
echo.
echo Setting up database...
call pnpm db:push

REM Start dev server
echo.
echo Starting development server...
echo The app will be available at: http://localhost:3000
echo.
call pnpm dev
