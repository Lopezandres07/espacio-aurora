# QA Strategy & Automation - Espacio Aurora

## 🎯 Filosofía de Pruebas
Este directorio contiene la suite de pruebas automatizadas bajo el enfoque **BDD (Behavior Driven Development)**. El objetivo es asegurar la calidad de los flujos críticos del SaaS de Espacio Aurora, garantizando que las reglas de negocio se cumplan antes, durante y después del desarrollo.

## 🛠️ Stack Tecnológico
- **Framework:** Playwright
- **Lenguaje:** TypeScript
- **BDD:** Cucumber.js + Gherkin

## 🏷️ Estrategia de Etiquetado (Tags)
- `@admin`: Flujos del panel de administración y gestión de agenda.
- `@auth`: Procesos de registro, inicio de sesión y protección de rutas.
- `@whatsapp`: Flujos de captura de leads y redirección de contacto.
- `@guest` / `@success` / `@negative` / `@security` / `@control` / `@historial`: Sub-etiquetas para casos de borde, flujos alternativos y validaciones de seguridad.

## 📋 Escenarios y Criterios de Aceptación (Features)

A continuación, se detallan las características principales del sistema escritas en sintaxis Gherkin para su automatización:

### 1. Flujo de Administración y Gestión de Agenda
Como administradora (Aurora), quiero ver un calendario con todas las citas del día para organizar mi tiempo y preparar los insumos necesarios.

- gherkin
Feature: Flujo de Administracion y Gestion de Agenda

  Background:
    Given la administradora Aurora ha iniciado sesión correctamente
    And se encuentra en el panel del calendario ("Dashboard")

  @admin @control
  Scenario Outline: Gestionar el estado de una cita programada
    Given existe una cita en agenda para hoy con la clienta "Valeria Roa" con estado inicial "Pendiente"
    When la administradora selecciona la cita en el calendario
    And cambia el estado de la cita a "<nuevo_estado>"
    Then el sistema debe actualizar el estado de la cita a "<nuevo_estado>"
    And la cita debe aparecer visualmente con un estilo o color diferente que identifique el estado "<nuevo_estado>"
    
    Examples:
      | nuevo_estado |
      | Completada   |
      | Cancelada    |

  @admin @historial
  Scenario: Consultar el historial de servicios de un cliente específico antes de su cita
    Given existe una cita en agenda para la clienta "Valeria Roa" programada a las 14:00 horas
    When la administradora hace clic en el nombre "Valeria Roa" en el detalle de la cita
    And selecciona la opción "Ver historial de cliente"
    Then el sistema debe abrir el perfil completo de la clienta
    And debe listar los servicios que la clienta se ha realizado en visitas anteriores ("Pink Glow", "Vitaminas", etc.)

### 2. Flujo de Autenticación
  Como cliente nuevo, quiero crear una cuenta con mi correo y teléfono para llevar un registro de mis tratamientos y agendar más rápido.

  - gherkin
  Feature: Flujo de Autenticación (Auth)
  Como cliente nuevo, quiero crear una cuenta con mi correo y teléfono para llevar un registro de mis tratamientos y agendar más rápido.

  Background:
    Given el usuario está en la página de registro

  @auth @success
  Scenario: Registro exitoso con datos válidos
    When el usuario ingresa un nombre válido "Maria Lopez"
    And el usuario ingresa un correo nuevo "maria@example.com"
    And el usuario ingresa un teléfono "123456789"
    And el usuario ingresa una contraseña segura
    And hace clic en "Crear cuenta"
    Then el sistema debe registrar al usuario y asignar un token de sesión (JWT o Cookie)
    And el usuario debe ser redirigido al Dashboard

  @auth @negative
  Scenario: Intento de registro con un correo duplicado
    Given ya existe una cuenta registrada con el correo "maria@example.com"
    When el usuario ingresa un nombre válido "Maria Lopez"
    And el usuario ingresa el correo duplicado "maria@example.com"
    And el usuario ingresa un teléfono "123456789"
    And el usuario ingresa una contraseña segura
    And hace clic en "Crear cuenta"
    Then el sistema debe rechazar el registro
    And debe mostrar un mensaje de error "El correo ingresado ya está en uso"

  @auth @security
  Scenario: Intento de acceder al historial de citas sin iniciar sesión (Protección de rutas)
    Given el usuario no ha iniciado sesión
    When intenta acceder directamente a la ruta protegida "/historial-citas"
    Then el sistema debe denegar el acceso
    And el usuario debe ser redirigido a la página de inicio de sesión
    And debe mostrar un mensaje "Debes iniciar sesión para ver esta página"

### 3. Flujo de Captura de Leads
Como Usuario Invitado, quiero ingresar mi nombre al contactar por WhatsApp para que la especialista sepa quién soy desde el primer mensaje.

- gherkin
Feature: Registro de interés de servicios

  Background:
   Given el usuario está en la página de inicio

  @whatsapp @guest
  Scenario: El usuario invitado quiere contactar por un servicio vía WhatsApp
    When hace clic en el botón de whatsapp flotante
    Then se debe mostrar un menú emergente para ingresar datos
    When el usuario ingresa su nombre "John Doe"
    And selecciona el servicio "Pink Glow" de la lista
    And hace clic en "Ir al chat"
    Then se debe realizar una petición POST a "/api/leads/contact" con el servicio "Pink Glow"
    And debe redirigir al chat de WhatsApp con un mensaje que incluya "John Doe" y "Pink Glow"
        
  @whatsapp @guest
  Scenario: El usuario invitado navegó por un servicio específico antes de contactar
    Given el usuario ha navegado por la página del servicio "PRP"
    When hace clic en el botón de whatsapp flotante
    Then el servicio "PRP" debe estar preseleccionado en el menú emergente
    When el usuario ingresa su nombre "John Doe"
    And hace clic en "Ir al chat"
    Then se debe realizar una petición POST a "/api/leads/contact" con el servicio "PRP"
    And debe redirigir al chat de WhatsApp con un mensaje que incluya "John Doe" y "PRP"

  @whatsapp @auth
  Scenario: El usuario registrado tiene sus datos autocompletados
    Given el usuario ha iniciado sesión como "John Doe"
    When hace clic en el botón de whatsapp flotante
    Then se debe mostrar el menú con el nombre "John Doe" ya completado
    And el campo de nombre debe ser de solo lectura
    When el usuario selecciona el servicio "PRP"
    And hace clic en "Ir al chat"
    Then se debe realizar una petición POST a "/api/leads/contact" con el servicio "PRP"
    And debe redirigir al chat de WhatsApp con un mensaje que incluya "John Doe" y "PRP"

  @whatsapp @negative
  Scenario Outline: Validación de campos obligatorios en el menú de contacto
    When hace clic en el botón de whatsapp flotante
    And el usuario ingresa su nombre "<nombre>"
    And selecciona el servicio "<servicio>" de la lista
    Then el botón de "Ir al chat" debe estar <estado>
    And debe mostrar un mensaje de error "<mensaje>"
    Examples:
      | nombre   | servicio  | estado       | mensaje                   |
      |          | PRP       | deshabilitado| El nombre es obligatorio  |
      | John Doe |           | deshabilitado| Seleccione un servicio    |

## Ejecutar todas las pruebas en modo headless
npx playwright test

## Ejecutar específicamente los flujos de WhatsApp
npx playwright test --grep @whatsapp

## Ejecutar pruebas de regresión de administración
npx playwright test --grep @admin