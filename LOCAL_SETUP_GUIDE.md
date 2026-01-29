# Local Development Setup Guide

## Prerequisites

Before running the project locally, make sure you have:

1. **Node.js 18+** - [Download here](https://nodejs.org/)
2. **pnpm** - Install with: `npm install -g pnpm`
3. **Docker Desktop** - [Download for Windows](https://www.docker.com/products/docker-desktop/)
   - Make sure Docker Desktop is running before starting

## Quick Start (Recommended - Using Docker)

### Step 1: Install Dependencies

```bash
pnpm install
```

### Step 2: Create `.env` File

Create a `.env` file in the root directory with these required variables:

```env
NODE_ENV=development
ADMIN_PASSWORD=your-secure-password-here
JWT_SECRET=your-jwt-secret-here-min-32-chars
OPENROUTER_API_KEY=your-openrouter-api-key
CONTACT_TO_EMAIL=amberwangxinyu2002@gmail.com
```

**Quick Setup** (generate random secrets):
```bash
# On Windows PowerShell, you can generate secrets:
# For ADMIN_PASSWORD (32 chars):
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})

# For JWT_SECRET (32+ chars):
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 40 | % {[char]$_})
```

Or use an online generator: https://randomkeygen.com/

### Step 3: Start Docker Services

Open PowerShell or Command Prompt in the project root and run:

```bash
# Navigate to docker directory
cd docker

# Start all services (PostgreSQL, Redis, MinIO, etc.)
docker compose up -d

# Or use the script (if you have Git Bash or WSL):
# ../scripts/docker-compose up -d
```

This will start:
- PostgreSQL database (port 5432)
- Redis (port 6379)
- MinIO (ports 9000, 9001)
- Adminer (database GUI)

### Step 4: Setup Database

```bash
# Push database schema
pnpm db:push

# Or generate migrations
pnpm db:generate
```

### Step 5: Start Development Server

```bash
# In the project root directory
pnpm dev
```

The app will be available at: **http://localhost:3000**

---

## Alternative: Manual Setup (Without Docker)

If you prefer not to use Docker, you'll need to set up services manually:

### 1. Install PostgreSQL
- Download and install PostgreSQL: https://www.postgresql.org/download/windows/
- Create a database named `app`
- Update `prisma/schema.prisma` with your connection string:
  ```prisma
  datasource db {
    provider = "postgresql"
    url      = "postgresql://postgres:yourpassword@localhost:5432/app"
  }
  ```

### 2. Install Redis (Optional)
- Download Redis for Windows: https://github.com/microsoftarchive/redis/releases
- Or use WSL2

### 3. Set Environment Variables
Create `.env` file with:
```env
NODE_ENV=development
ADMIN_PASSWORD=your-password
JWT_SECRET=your-jwt-secret
OPENROUTER_API_KEY=your-key
CONTACT_TO_EMAIL=amberwangxinyu2002@gmail.com
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/app
```

### 4. Run
```bash
pnpm install
pnpm db:push
pnpm dev
```

---

## Useful Commands

### Development
```bash
# Start dev server
pnpm dev

# Type check
pnpm typecheck

# Lint code
pnpm lint

# Format code
pnpm format
```

### Database
```bash
# Push schema changes
pnpm db:push

# Open Prisma Studio (database GUI)
pnpm db:studio

# Generate Prisma client
pnpm db:generate

# Create migration
pnpm db:migrate
```

### Docker
```bash
# Start services
cd docker
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f

# Stop all services
# (if using the stop script)
../scripts/stop
```

### Testing Contact Form
```bash
# Test email sending (after setting up email service)
npx tsx scripts/sendContactTest.ts
```

---

## Access Points

Once running, you can access:

- **Main App**: http://localhost:3000
- **Adminer (Database GUI)**: http://localhost:8000/codapt/db/
  - Username: `admin`
  - Password: (your `ADMIN_PASSWORD` from `.env`)
  - Server: `postgres`
  - Username: `postgres`
  - Password: `postgres`
  - Database: `app`
- **MinIO Console**: http://localhost:9001
  - Username: `admin`
  - Password: (your `ADMIN_PASSWORD` from `.env`)

---

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
- Change the port in `app.config.ts` or set `PORT` environment variable
- Or stop the service using port 3000

### Docker Issues
```bash
# Check if Docker is running
docker ps

# Restart Docker Desktop
# Then restart services:
cd docker
docker compose down
docker compose up -d
```

### Database Connection Errors
```bash
# Make sure PostgreSQL container is running
docker compose ps

# Check database logs
docker compose logs postgres

# Reset database (WARNING: deletes all data)
docker compose down -v
docker compose up -d
pnpm db:push
```

### Environment Variables Not Loading
- Make sure `.env` file is in the root directory
- Check that variable names match exactly (case-sensitive)
- Restart the dev server after changing `.env`

### Prisma Client Not Generated
```bash
# Regenerate Prisma client
pnpm db:generate
# or
pnpm postinstall
```

### Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install
```

---

## Project Structure

```
Bill/
├── .env                    # Environment variables (create this)
├── docker/                 # Docker configuration
│   ├── compose.yaml       # Docker Compose config
│   └── Dockerfile         # Docker image definition
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── routes/            # Page routes
│   ├── components/        # React components
│   ├── server/            # Backend code
│   └── trpc/              # tRPC client
├── scripts/               # Utility scripts
└── package.json           # Dependencies
```

---

## Next Steps

1. ✅ Set up `.env` file with required variables
2. ✅ Start Docker services
3. ✅ Run `pnpm db:push` to setup database
4. ✅ Run `pnpm dev` to start development server
5. ✅ Visit http://localhost:3000
6. ✅ Test the contact form at http://localhost:3000/contact

---

## Windows-Specific Notes

### Using PowerShell
All commands work in PowerShell. If you encounter issues with bash scripts:
- Use Git Bash (comes with Git for Windows)
- Or use WSL2 (Windows Subsystem for Linux)

### File Paths
- Use forward slashes `/` or backslashes `\\` in paths
- Docker paths use forward slashes

### Line Endings
- Git should handle this automatically
- If you see issues, run: `git config core.autocrlf true`

---

## Quick Reference

**Start everything:**
```bash
cd docker && docker compose up -d && cd .. && pnpm db:push && pnpm dev
```

**Stop everything:**
```bash
cd docker && docker compose down
```

**Reset everything (WARNING: deletes data):**
```bash
cd docker && docker compose down -v && docker compose up -d && cd .. && pnpm db:push
```

---

**Need help?** Check the logs:
- App logs: In the terminal running `pnpm dev`
- Docker logs: `docker compose logs -f`
- Database logs: `docker compose logs postgres`
