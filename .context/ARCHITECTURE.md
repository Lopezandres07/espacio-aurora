# Project Architecture

## Directory Structure (Monorepo)
- `/frontend`: React app (Vite). Arquitectura por componentes (atoms, molecules, pages).
- `/backend`: API REST (Express). Capas: Routes -> Controllers -> Services -> DB.
- `/qa`: Suite de automatización. Estructura: /features y /step_definitions.

## Key Data Models
- **User:** id, name, email, role (ADMIN/CLIENT).
- **Service:** id, name, price, duration.
- **Lead:** id, service_id, client_name, status (PENDING/CONTACTED).
- **Appointment:** id, user_id, service_id, date, status.