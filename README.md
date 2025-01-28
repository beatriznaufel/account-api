# 🚀 Account API

A modern and fast RESTful API for account management, built with Hono and Bun.

## 🌟 Features

- 👤 User registration and authentication
- 🔒 Security middlewares
- 📝 Data validation with Zod
- 🗄️ PostgreSQL integration with Drizzle ORM

## 🛠️ Technologies

- [Bun](https://bun.sh/) - JavaScript runtime & package manager
- [Hono](https://hono.dev/) - Fast, lightweight web framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [TypeScript](https://www.typescriptlang.org/) - Programming language

## 📋 Prerequisites

- [Bun](https://bun.sh/) (latest version)
- PostgreSQL
- Node.js (for husky pre-commit hooks)

## 🚀 Installation and Setup

1. Clone the repository:
```bash
git clone git@github.com:beatriznaufel/account-api.git
cd account-api
```

2. Install dependencies:
```bash
bun install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Set up the database:
```bash
# Generate migration files
bun run db:generate

# Push migrations to database
bun run db:push

# Run migrations
bun run migrate
```

5. Start the development server:
```bash
bun run dev
```

## 📜 Available Scripts

- `bun run dev` - Start development server with watch mode
- `bun run start` - Start production server
- `bun run db:generate` - Generate database migrations
- `bun run db:push` - Push migrations to database
- `bun run migrate` - Run database migrations
- `bun run lint` - Run ESLint
- `bun run lint:fix` - Fix ESLint issues

## 🔧 Configuration

Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your-secret-key"
PORT=3000
```

## 📚 API Documentation

### Endpoints

#### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

#### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🔒 Security Features

- Password encryption with bcrypt
- Data validation with Zod
- TypeScript type safety
- ESLint code quality checks
- Husky pre-commit hooks

## ✨ Author

Maria Beatriz - [GitHub](https://github.com/beatriznaufel)
