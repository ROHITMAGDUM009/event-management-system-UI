# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**EMS** — Event Management System frontend. A React SPA built with Vite, Tailwind CSS v4, and React Router v7. Communicates with a Spring Boot backend at `http://localhost:8080/api`.

Backend location: `D:\Dev_Downloads\Workspaces\workspace_Projects_IDEA\IntelIJ-workspace\event-management-system\ems`

## Key Commands

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Development server | `npm run dev` |
| Production build | `npm run build` |
| Lint codebase | `npm run lint` |
| Preview production build | `npm run preview` |

*Note: No test framework configured. Add tests following standard `npm test` pattern if needed.*

## Architecture Essentials

### Core Patterns
- **AuthContext** (`src/context/AuthContext.jsx`): Manages `{token, role, isAuthenticated}` state persisted to localStorage
- **Axios Instance** (`src/api/axios.js`): Configured with base URL, automatic Bearer token injection, and 401 redirect handling
- **Route Protection** (`src/routes/ProtectedRoute.jsx`): Validates auth and role; redirects unauthenticated to `/login`, unauthorized to `/`
- **Role-Based Layouts**: 
  - Public (`MainLayout`): Home, Events, EventDetails, Login, Register
  - User (`/user`): Dashboard, MyBookings, MyEvents
  - Organizer (`/organizer`): Dashboard, CreateEvent, MyEvents, Bookings
  - Admin (`/admin`): Dashboard, Users, Organizers, Events, Payments

### Important Files
- `src/main.jsx`: Entry point wrapped in `<AuthProvider>`
- `src/App.jsx`: Simple wrapper for `<AppRoutes />`
- `src/api/axios.js`: Shared Axios instance with auth interceptors
- `src/context/AuthContext.jsx`: Authentication state management
- `src/routes/`: Contains `AppRoutes.jsx` (route definitions) and `ProtectedRoute.jsx`
- `src/pages/`: Organized by role subdirectories (admin/, organizer/, user/)
- `src/components/`: Reusable UI components (Navbar, Sidebar variants, StatusBadge, etc.)
- `src/index.css`: Tailwind CSS entry point

### Development Workflow
1. Install deps: `npm install`
2. Start dev server: `npm run dev` (hot-reload enabled)
3. Lint before commit: `npm run lint`
4. For API calls: Import from `src/api/axios.js` to inherit auth handling
5. For persistent user data: Use AuthContext (auto-syncs to localStorage)
6. For new roles: Update ProtectedRoute role checks and AuthContext role mappings

## Styling
Tailwind CSS v4 configured via `@tailwindcss/vite`. Base styles in `src/index.css`, imported in `main.jsx`.