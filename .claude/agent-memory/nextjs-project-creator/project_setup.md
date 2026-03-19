---
name: project_setup
description: Core setup decisions for the services-psychologist-client Next.js project
type: project
---

The project was scaffolded with Next.js 16.2.0 (latest stable as of 2026-03-19) using the App Router, TypeScript, Tailwind CSS v4, and ESLint.

**Why:** User requested a production-ready Next.js 15.x+ project with TypeScript from the start, App Router, and a clean folder structure.

**How to apply:** All new pages go under src/app/, reusable components under src/components/ui/, static assets under src/assets/ (images/, fonts/), and public files under public/. The @/* import alias resolves to ./src/*. Package manager is npm.

Key versions:
- next: 16.2.0
- react: 19.2.4
- react-dom: 19.2.4
- typescript: ^5
- tailwindcss: ^4
- eslint-config-next: 16.2.0
