# EMS API (Event Management System)

This is the backend service for the Event Management System, built with **NestJS** and **TypeScript**.

## 🚀 Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Database:** PostgreSQL
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** JWT (JSON Web Tokens) & Passport
- **Validation:** `class-validator` and `class-transformer`
- **API Documentation:** Swagger

## ✨ Features

- **User Authentication & Authorization** (Register, Login, JWT verification)
- **Event Management** (Create, Read, Update, Delete events)
- **Event Attendance** (Users can attend/unattend events)
- **Recommendations** (Fetch recommended events)
- **Pagination, Sorting, and Filtering** for events

## 📖 API Documentation

The API includes interactive Swagger documentation that is generated automatically based on the source code decorators.

1. Start the application locally.
2. Navigate to `http://localhost:3000/api/docs` in your browser.
3. Access the raw JSON OpenAPI schema at `http://localhost:3000/api/docs-json`.

## ⚙️ Setup & Installation

**1. Clone the repository and install dependencies:**

```bash
npm install
```

**2. Environment Configuration:**

Create a `.env` file in the root directory and define the following variables:

```env
PORT=3000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_jwt_secret"
```

**3. Database Configuration (Prisma):**

Apply database migrations:

```bash
npm run prisma:migrate
```

Seed the database with initial data (users, events, attendances):

```bash
npm run prisma:seed
```

**4. Running the application:**

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## 🏗️ Project Structure

- `src/main.ts` - Entry point, Swagger & global pipes setup.
- `src/auth/` - Authentication logic, JWT strategy, and Auth DTOs.
- `src/events/` - Event CRUD operations, search, and filtering.
- `src/attendances/` - Logic for attending events.
- `src/recommendations/` - Logic for recommending events.
- `src/users/` - User profile retrieval and management.
- `prisma/` - Database schema, migrations, and seed scripts.