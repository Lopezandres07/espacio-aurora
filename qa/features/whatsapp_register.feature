Feature: Registro de interés de servicios

    Background: 
        Given el usuario está en la página de servicios


    Scenario: El usuario quiere contactar por un servicio vía WhatsApp
        When hace clic en el botón de contacto de "Plasma Rico en Plaquetas"
        Then el sistema debe registrar un nuevo "Lead" en la base de datos
        And debe redirigir al usuario al chat de WhatsApp con el mensaje correcto