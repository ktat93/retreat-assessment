# Retreat Assessment

A full-stack venue booking inquiry application built with Next.js and NestJS.

## Demo
https://drive.google.com/file/d/157oLyeqVCfBxW7WiDI2n3lmvhBOQu6Qv/view?usp=sharing

## Tech Stack

- **Frontend**: Next.js 15, React 19, TanStack Query, React Hook Form, Zod, shadcn/ui
- **Backend**: NestJS 11, Prisma, PostgreSQL
- **Monorepo**: Turborepo, pnpm

## Prerequisites

- Node.js >= 20
- PostgreSQL database (or Docker)

## Setup Instructions

```bash
docker-compose up --build
```

This starts PostgreSQL, runs migrations, seeds the database, and starts the API.

To run the frontend:

```bash
pnpm install
pnpm --filter web dev
```

| Application | URL |
|-------------|-----|
| Web (Frontend) | http://localhost:3000 |
| API (Backend) | http://localhost:4000 |
| API Documentation | http://localhost:4000/api-docs |

## Approach & Tradeoffs

### Why a Monorepo?

- **Unified Development**: Single `pnpm dev` starts both apps
- **Shared Code**: `packages/ui` contains reusable shadcn/ui components
- **Atomic Changes**: Frontend and backend changes in single commits
- **Build Optimization**: Turborepo caches build outputs

### Technical Decisions

- **Form validation with Zod**: Type-safe validation on client via react-hook-form
- **Prisma**: Type-safe database queries and migrations

### Tradeoffs

- **No authentication**: Focused on core booking functionality
- **Minimal error handling**: Basic error states implemented

## Future Improvements

- Security: Helmet, rate limiting, stricter CORS
- Authentication: JWT with role-based access control
- Testing: Jest, Playwright E2E tests
- Performance: Redis caching
- Observability: Structured logging, Sentry
