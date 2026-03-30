# API Contracts

## Leads
### POST /api/leads/contact
- **Body:** `{ "serviceId": string, "clientName": string }`
- **Response:** `201 Created { "message": "Lead registrado", "whatsappUrl": string }`

## Auth
### POST /api/auth/register
- **Body:** `{ "name": string, "email": string, "phone": string }`
- **Response:** `201 Created { "token": string, "user": Object }`