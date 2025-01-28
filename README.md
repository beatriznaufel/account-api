# 🚀 Account API

A modern and fast RESTful API for account management, built with Hono and Bun.

## 🌟 Features

- 👤 User management and authentication
- 💾 PostgreSQL integration with Drizzle ORM
- ✅ Data validation with Zod
- 🐳 Docker containerization
- 🚀 High performance with Bun runtime

## 🛠️ Technologies

- [Bun](https://bun.sh/) - JavaScript runtime & package manager
- [Hono](https://hono.dev/) - Fast, lightweight web framework
- [Drizzle ORM](https://orm.drizzle.team/) - Modern TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [Docker](https://www.docker.com/) - Containerization platform
- [Zod](https://zod.dev/) - Schema validation
- [TypeScript](https://www.typescriptlang.org/) - Programming language

## 📋 Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- [Bun](https://bun.sh/) (latest version)
- Node.js (for Husky hooks)

## 🚀 Getting Started

### Using Docker

1. Clone the repository:
```bash
git clone git@github.com:beatriznaufel/account-api.git
cd account-api
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Start the containers:
```bash
docker-compose up -d
```

### Local Development

1. Install dependencies:
```bash
bun install
```

2. Set up the database:
```bash
# Generate migration files
bun run db:generate

# Push migrations to database
bun run db:push

# Run migrations
bun run migrate
```

3. Start development server:
```bash
bun run dev
```

## 📜 Available Scripts

- `bun run dev` - Start development server
- `bun run start` - Start production server
- `bun run db:generate` - Generate database migrations
- `bun run db:push` - Push migrations to database
- `bun run migrate` - Run database migrations
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Fix ESLint issues

## 🐳 Docker Commands

```bash
# Build and start containers
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up -d --build
```

## 🔧 Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
PORT=3000
```

## 📚 API Documentation

### Endpoints

#### Auth
- `POST /api/auth/register` - Register new user
```json
// Request body
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

- `POST /api/auth/login` - User login
```json
// Request body
{
  "email": "string",
  "password": "string"
}
```

#### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🔒 Security Features

- Password encryption with bcrypt
- Data validation with Zod
- TypeScript type safety
- Code quality checks with ESLint
- Pre-commit hooks with Husky

## 🧪 Testing

```bash
# Run tests
bun test
```

## 🔨 Development

### Code Standards

- Use TypeScript strict mode
- Follow ESLint configuration
- Write tests for new features
- Use conventional commits

### Debug

```bash
# Run with debug mode
bun run dev:debug
```

## 🐛 Known Issues and Troubleshooting

### Common Issues

1. **Database Connection Issues**
   ```bash
   # Check database connection
   docker-compose logs postgres
   ```

2. **Port Conflicts**
   - Ensure port 3000 is available or change in .env file

## 🚀 Deployment

### Using Docker (Production)

```bash
# Build production image
docker build -t account-api:prod -f Dockerfile.prod .

# Run production container
docker run -d -p 3000:3000 account-api:prod
```

## ✨ Author

Maria Beatriz - [GitHub](https://github.com/beatriznaufel)
