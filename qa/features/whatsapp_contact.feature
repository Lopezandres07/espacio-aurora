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