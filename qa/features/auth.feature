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
