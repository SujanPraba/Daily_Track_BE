# Daily Tracking Application

A comprehensive enterprise-grade Daily Tracking application built with Nest.js, featuring microservices-inspired architecture for robust project management and user tracking capabilities.

## 🚀 Features

### Core Modules
- **Permission Management**: Create and manage granular permissions
- **Role-based Access Control**: Flexible role and permission mapping
- **Project Management**: Complete project lifecycle management
- **Team Management**: Team creation and member assignment
- **User Management**: Comprehensive user profile and assignment system
- **Daily Updates**: Track daily activities, meetings, and time logs

### Technical Features
- **PostgreSQL Database**: Robust data storage
- **Drizzle ORM**: Type-safe database operations
- **JWT Authentication**: Secure user authentication
- **Swagger Documentation**: Interactive API documentation
- **Modular Architecture**: Clean separation of concerns
- **Validation**: Comprehensive input validation
- **Error Handling**: Robust error handling mechanisms
- **Rate Limiting**: API protection
- **Environment Configuration**: Flexible configuration management

## 🏗️ Architecture

The application follows a microservices-inspired modular architecture:

```
src/
├── lib/                    # Business logic modules
│   ├── auth/              # Authentication module
│   ├── permission/        # Permission management
│   ├── role/             # Role management
│   ├── project/          # Project management
│   ├── team/             # Team management
│   ├── user/             # User management
│   └── daily-update/     # Daily updates tracking
├── database/             # Database configuration and schemas
│   ├── schemas/         # Drizzle schemas
│   ├── seeds/           # Database seeding
│   └── migration.service.ts
└── main.ts              # Application entry point
```

Each module contains:
- **Services**: Business logic
- **Controllers**: API endpoints
- **DTOs**: Data transfer objects
- **Repositories**: Data access layer
- **Schemas**: Database schemas

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (Latest LTS)
- PostgreSQL (Latest stable)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up PostgreSQL database:**
```sql
CREATE DATABASE daily_tracking;
```

3. **Configure environment variables:**
Update the `.env` file with your database credentials and other settings.

4. **Initialize database:**
Set `MIGRATION_MODE=CREATE` in `.env` and run:
```bash
npm run start:dev
```

This will:
- Drop and recreate the database schema
- Generate and apply migrations
- Seed the database with sample data

### Available Scripts

```bash
# Development
npm run start:dev          # Start in development mode
npm run start:debug        # Start in debug mode

# Production
npm run build             # Build the application
npm run start:prod        # Start in production mode

# Database
npm run db:generate       # Generate migrations
npm run db:push          # Push schema to database
npm run db:migrate       # Apply migrations
npm run seed             # Seed database

# Testing
npm run test             # Unit tests
npm run test:e2e         # End-to-end tests
npm run test:cov         # Test coverage
```

## 📚 API Documentation

Once the application is running, visit:
- **Swagger UI**: http://localhost:3000/api/docs
- **API Base URL**: http://localhost:3000

### Sample Credentials
After seeding, you can use these credentials:
- **Admin**: `admin@example.com` / `password123`
- **Manager**: `manager@example.com` / `password123`
- **Developer**: `developer@example.com` / `password123`

## 🔐 Authentication

The application uses JWT-based authentication:

1. **Login** via `/auth/login` to get an access token
2. **Include the token** in the Authorization header: `Bearer <token>`
3. **Protected routes** require valid JWT tokens

## 📊 Database Schema

### Core Entities
- **Users**: User profiles and authentication
- **Roles**: Role definitions with hierarchical levels
- **Permissions**: Granular permission system
- **Projects**: Project management with status tracking
- **Teams**: Team organization and leadership
- **Daily Updates**: Time tracking and activity logging

### Relationships
- Users ↔ Roles (Many-to-Many)
- Roles ↔ Permissions (Many-to-Many)
- Users ↔ Projects (Many-to-Many)
- Users ↔ Teams (Many-to-Many)
- Teams → Projects (Many-to-One)
- Daily Updates → Users, Projects, Teams (Many-to-One)

## 🧪 Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov

# E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Docker (Recommended)

```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
```

### Environment Variables for Production
```bash
NODE_ENV=production
DATABASE_URL=your_production_database_url
JWT_SECRET=your_super_secure_jwt_secret
PORT=3000
MIGRATION_MODE=NONE  # Important: Don't auto-migrate in production
```

## 🔒 Security Features

- **JWT Authentication** with configurable expiration
- **Password Hashing** using bcryptjs
- **Input Validation** with class-validator
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for cross-origin requests
- **Environment-based Configuration** for sensitive data
- **SQL Injection Protection** via Drizzle ORM

## 🏆 Best Practices Implemented

- **Clean Architecture** with separation of concerns
- **Dependency Injection** for loose coupling
- **Type Safety** with TypeScript strict mode
- **Error Handling** with proper HTTP status codes
- **Logging** for debugging and monitoring
- **Validation** at API boundaries
- **Database Migrations** for schema versioning
- **Seeding** for consistent development data

## 📈 Performance Optimizations

- **Database Indexing** on frequently queried fields
- **Connection Pooling** for database connections
- **Pagination** support for large datasets
- **Caching Strategies** ready for implementation
- **Query Optimization** with Drizzle ORM

## 🤝 Contributing

1. Follow the established modular architecture
2. Write tests for new features
3. Update documentation
4. Follow TypeScript best practices
5. Ensure all validations are in place

## 📄 License

This project is proprietary and confidential.