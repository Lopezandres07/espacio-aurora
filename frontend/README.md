# 🌌 Espacio Aurora — Frontend

SPA construida con **React 19 + TypeScript + Vite + TailwindCSS 3 + React Router 7**.

## 🚀 Inicio rápido

```bash
npm install
npm run dev       # Inicia Vite en modo desarrollo
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

## Notas del Desarrollador

- Peticiones HTTP: En el caso de la vista de perfil de usuarios, es ideal que esa vista maneje la peticion al backend hacia un endpoint, para que traiga toda la info y alimente los componentes hijos, esto se le llama patron BFF (Backend For Frontend), la cual sirve para alimentar una vista concreta.

- Ocupar la doble negacion !!, sirve para convertir un valor en su equivalente booleano, ejemplo si un valor es vacio o undefined, lo pasa a false, si tiene valor lo pasa a true.
