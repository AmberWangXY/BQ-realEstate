# PowerShell script to start the project locally on Windows
# Run this from PowerShell: .\start-local.ps1

Write-Host "🚀 Starting Bill Real Estate Project Locally..." -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  .env file not found!" -ForegroundColor Yellow
    Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow

    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✅ Created .env file. Please edit it with your values." -ForegroundColor Green
        Write-Host "Press any key to continue after editing .env..."
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    } else {
        Write-Host "❌ .env.example not found. Please create .env manually." -ForegroundColor Red
        exit 1
    }
}

# Check if Docker is running
Write-Host "Checking Docker..." -ForegroundColor Cyan
try {
    docker ps | Out-Null
    Write-Host "✅ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not running. Please start Docker Desktop." -ForegroundColor Red
    exit 1
}

# Check if pnpm is installed
Write-Host "Checking pnpm..." -ForegroundColor Cyan
try {
    pnpm --version | Out-Null
    Write-Host "✅ pnpm is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ pnpm is not installed. Install with: npm install -g pnpm" -ForegroundColor Red
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host ""
    Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
    pnpm install
}

# Start Docker services
Write-Host ""
Write-Host "🐳 Starting Docker services..." -ForegroundColor Cyan
Set-Location docker
docker compose up -d
Set-Location ..

# Wait a bit for services to start
Write-Host "⏳ Waiting for services to start..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

# Setup database
Write-Host ""
Write-Host "🗄️  Setting up database..." -ForegroundColor Cyan
pnpm db:push

# Start dev server
Write-Host ""
Write-Host "🎉 Starting development server..." -ForegroundColor Green
Write-Host "The app will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
pnpm dev
