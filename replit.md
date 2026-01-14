# TaskFlow - Project Management SaaS

## Overview

TaskFlow is a modern project management SaaS application built with a React frontend and Express backend. The platform enables teams to manage projects, tasks, and workflows with a Kanban-style board interface. It features role-based task routing where tasks flow through defined workflow stages (e.g., Manager → Developer → Tester → Deployed).

The application uses a monorepo structure with shared types between frontend and backend, ensuring type safety across the full stack.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom plugins for Replit integration
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom theme configuration using CSS variables
- **Animations**: Framer Motion for smooth transitions and drag-and-drop interactions
- **Charts**: Recharts for dashboard analytics visualization

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with tsx for development
- **API Design**: RESTful API with typed route definitions shared with frontend
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod for runtime type validation, drizzle-zod for schema-to-validation integration

### Code Organization
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Route page components
    hooks/        # Custom React hooks for data fetching
    lib/          # Utility functions and query client
server/           # Express backend
  routes.ts       # API route definitions
  storage.ts      # Data access layer with memory/database implementations
  db.ts           # Database connection setup
shared/           # Shared code between frontend and backend
  schema.ts       # Drizzle database schema definitions
  routes.ts       # API route contracts with Zod schemas
```

### Data Model
The application uses these core entities:
- **Users**: Team members with roles (Manager, Developer, Tester, Admin)
- **Workspaces**: Top-level organizational containers
- **Projects**: Collections of tasks within a workspace
- **Tasks**: Individual work items with status, priority, assignee, and due dates
- **Workflows**: Customizable step sequences that define task progression paths
- **Comments**: Discussion threads on tasks
- **Activities**: Audit log of actions taken
- **Notifications**: User alerts for assignments and updates

### API Contract Pattern
Routes are defined in `shared/routes.ts` with full type information that both frontend and backend consume. This ensures API contracts are enforced at compile time and enables automatic request/response validation.

## External Dependencies

### Database
- **PostgreSQL**: Primary database via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations with `npm run db:push`
- **connect-pg-simple**: Session storage for PostgreSQL

### Key Runtime Dependencies
- **@tanstack/react-query**: Async state management and caching
- **drizzle-orm**: Type-safe database queries
- **zod**: Schema validation for API requests/responses
- **framer-motion**: Animation library for UI interactions
- **recharts**: Charting library for analytics dashboard
- **date-fns**: Date formatting and manipulation
- **lucide-react**: Icon library

### Build & Development
- **Vite**: Frontend build and dev server with HMR
- **esbuild**: Server-side bundling for production
- **tsx**: TypeScript execution for development

### UI Framework
- **Radix UI**: Accessible primitive components (dialogs, dropdowns, etc.)
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management