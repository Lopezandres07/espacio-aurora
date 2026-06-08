# 🛰️ Espacio Aurora — Backend

API REST construida con **Express 5 + TypeScript + Prisma + PostgreSQL (Neon)**.

## 🚀 Inicio rápido

```bash
npm install
npm run db:generate   # Genera el cliente Prisma
npm run dev           # Inicia con ts-node-dev en modo watch
```

Puerto por defecto: `3001` (configurable vía `.env` → `PORT`).

---

## 📁 Estructura de carpetas

```
backend/
├── prisma/
│   └── schema.prisma        # Modelos de BD: User, Service, Lead, Appointment
├── src/
│   ├── app.ts                # Configuración de Express (cors, json, rutas)
│   ├── server.ts             # Entry point: conecta Prisma y levanta el servidor
│   ├── controllers/
│   │   ├── auth.controller.ts        # Registro y login (bcrypt + JWT)
│   │   ├── admin.controller.ts       # CRUD completo para admin (citas, clientes, servicios, stats)
│   │   ├── appointment.controller.ts # Citas del usuario autenticado
│   │   ├── lead.controller.ts        # Captura de leads (botón WhatsApp)
│   │   └── serviceController.ts      # Listado público de servicios
│   ├── middlewares/
│   │   └── auth.middleware.ts        # authenticateToken + requireAdmin (JWT)
│   └── routes/
│       ├── auth.routes.ts            # POST /register, POST /login
│       ├── admin.routes.ts           # Rutas protegidas ADMIN (citas, clientes, servicios, stats)
│       ├── appointment.routes.ts     # GET /me, GET /me/history (cliente autenticado)
│       ├── lead.routes.ts            # POST /contact (público)
│       └── service.route.ts          # GET / , GET /:id (público)
├── .env                      # Variables: QA_DATABASE_URL, JWT_SECRET, PORT
├── package.json
└── tsconfig.json
```

---

## 🗄️ Modelos de base de datos (Prisma)

| Modelo          | Descripción                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| **User**        | Usuarios con roles `CLIENT` / `ADMIN`. Campos: name, email, phone, password, medicalHistory (opcional).    |
| **Service**     | Servicios ofrecidos (nombre, descripción, precio).                                                         |
| **Lead**        | Contactos capturados desde el botón de WhatsApp. Relación opcional con User y Service.                     |
| **Appointment** | Citas con estados `PENDING` / `COMPLETED` / `CANCELLED`. Relaciona User ↔ Service con notas de evaluación. |

---

## 🔌 Endpoints API (`/api/v1/...`)

### Públicos

| Método | Ruta             | Descripción                |
| ------ | ---------------- | -------------------------- |
| POST   | `/auth/register` | Registro de usuario        |
| POST   | `/auth/login`    | Login → devuelve JWT       |
| GET    | `/services`      | Lista todos los servicios  |
| GET    | `/services/:id`  | Detalle de un servicio     |
| POST   | `/leads/contact` | Registrar lead de contacto |

### Protegidos (Cliente autenticado)

| Método | Ruta                       | Descripción        |
| ------ | -------------------------- | ------------------ |
| GET    | `/appointments/me`         | Citas del usuario  |
| GET    | `/appointments/me/history` | Historial de citas |

### Protegidos (Solo Admin)

| Método | Ruta                             | Descripción                |
| ------ | -------------------------------- | -------------------------- |
| GET    | `/admin/appointments`            | Todas las citas            |
| POST   | `/admin/appointments`            | Crear cita para un cliente |
| PATCH  | `/admin/appointments/:id/status` | Cambiar estado de cita     |
| GET    | `/admin/clients`                 | Listar clientes            |
| GET    | `/admin/clients/:id/history`     | Historial de un cliente    |
| GET    | `/admin/services`                | Servicios (vista admin)    |
| POST   | `/admin/services`                | Crear servicio             |
| PUT    | `/admin/services/:id`            | Actualizar servicio        |
| DELETE | `/admin/services/:id`            | Eliminar servicio          |
| GET    | `/admin/dashboard/stats`         | Estadísticas del dashboard |

### Health check

- `GET /health` → `{ status: "OK" }`

---

## 📜 Scripts disponibles

| Script        | Comando               | Descripción                         |
| ------------- | --------------------- | ----------------------------------- |
| `dev`         | `npm run dev`         | Servidor en modo desarrollo (watch) |
| `build`       | `npm run build`       | Compila TypeScript a JS             |
| `start`       | `npm run start`       | Ejecuta la build de producción      |
| `db:generate` | `npm run db:generate` | Genera el cliente Prisma            |
| `db:push`     | `npm run db:push`     | Sincroniza schema con la BD         |
| `db:studio`   | `npm run db:studio`   | Abre Prisma Studio (GUI de la BD)   |

---
