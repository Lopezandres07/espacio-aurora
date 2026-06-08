# 🌌 Espacio Aurora — Frontend

SPA construida con **React 19 + TypeScript + Vite + TailwindCSS 3 + React Router 7**.

## 🚀 Inicio rápido

```bash
npm install
npm run dev       # Inicia Vite en modo desarrollo
```

---

## 📁 Estructura de carpetas

```
frontend/src/
├── App.tsx                   # Router principal con todas las rutas
├── main.tsx                  # Entry point: monta React en el DOM
├── index.css                 # Estilos globales + directivas de Tailwind
│
├── api/
│   └── axios.ts              # Instancia de Axios configurada (baseURL, interceptores JWT)
│
├── services/
│   └── authService.ts        # Funciones de login/register que llaman al backend
│
├── store/
│   └── authStore.ts          # Estado global de autenticación (Zustand): user, token, login, logout
│
├── types/
│   └── auth.ts               # Interfaces TypeScript: LoginData, RegisterData, User, AuthResponse
│
├── hooks/                    # (Vacía) — Preparada para custom hooks
│
├── components/
│   ├── Navbar.tsx            # Barra de navegación responsive con menú hamburguesa y menú de perfil
│   ├── FormError.tsx         # Componente reutilizable para mostrar errores de formulario
│   └── WhatsAppModal.tsx     # Modal para capturar datos antes de redirigir a WhatsApp
│
├── layouts/
│   ├── MainLayout.tsx        # Layout público: Navbar + Outlet
│   └── DashboardLayout.tsx   # Layout del dashboard: sidebar + contenido
│
├── pages/
│   ├── public/
│   │   ├── Home.tsx          # Landing page con hero, servicios y sección de contacto
│   │   ├── Login.tsx         # Formulario de login (react-hook-form)
│   │   └── Register.tsx      # Formulario de registro (react-hook-form)
│   └── private/
│       ├── UserDashboard.tsx  # Dashboard del cliente: citas, historial
│       └── AdminDashboard.tsx # Dashboard admin: stats, gestión de citas/clientes/servicios
│
└── assets/
    ├── hero.png              # Imagen principal del hero
    ├── react.svg             # Logo React
    └── vite.svg              # Logo Vite
```

---

## 🗺️ Rutas de la aplicación

| Ruta         | Página           | Acceso      | Descripción                          |
| ------------ | ---------------- | ----------- | ------------------------------------ |
| `/`          | `Home`           | Público     | Landing page principal               |
| `/login`     | `Login`          | Público     | Formulario de inicio de sesión       |
| `/register`  | `Register`       | Público     | Formulario de registro               |
| `/dashboard` | `UserDashboard`  | Autenticado | Panel del cliente (citas, historial) |
| `/admin`     | `AdminDashboard` | Solo Admin  | Panel de administración completo     |

---

## 🧩 Componentes principales

| Componente        | Descripción                                                                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Navbar**        | Navegación responsive: links a secciones (Servicios, Sobre mí, Contacto → Instagram). Menú hamburguesa en móvil. Si el usuario está logueado muestra menú de perfil con opciones de "Mi perfil" y "Cerrar sesión". |
| **FormError**     | Muestra mensajes de error de validación debajo de los campos de formulario.                                                                                                                                        |
| **WhatsAppModal** | Modal que captura nombre y servicio de interés antes de abrir el chat de WhatsApp. Registra el lead en el backend.                                                                                                 |

---

## 🏪 Estado global (Zustand)

El store `authStore.ts` maneja:

- `user` — datos del usuario autenticado (o `null`)
- `token` — JWT almacenado
- `login(data)` — guarda user + token
- `logout()` — limpia sesión

---

## 📦 Dependencias clave

| Paquete            | Uso                                      |
| ------------------ | ---------------------------------------- |
| `react-router-dom` | Enrutamiento SPA                         |
| `zustand`          | Estado global ligero                     |
| `axios`            | Cliente HTTP para comunicarse con la API |
| `react-hook-form`  | Manejo de formularios con validación     |
| `lucide-react`     | Iconos SVG                               |
| `react-icons`      | Iconos adicionales (Font Awesome, etc.)  |
| `tailwindcss`      | Framework de utilidad CSS                |
| `date-fns`         | Formato y manipulación de fechas         |
| `classnames`       | Condicionales de clases CSS              |

---

## 📜 Scripts disponibles

| Script    | Comando           | Descripción                         |
| --------- | ----------------- | ----------------------------------- |
| `dev`     | `npm run dev`     | Servidor de desarrollo Vite         |
| `build`   | `npm run build`   | Compila TS + build de producción    |
| `preview` | `npm run preview` | Previsualiza la build de producción |
| `lint`    | `npm run lint`    | Ejecuta ESLint                      |

---
