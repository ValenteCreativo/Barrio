# BARRIO

Base inicial del proyecto BARRIO: una landing pública para presentar la propuesta y una demo navegable de la experiencia. El repositorio todavía no contiene backend, base de datos, autenticación real ni procesamiento de pagos.

## Estructura

```text
apps/
  landing/      Landing estática y formulario de lista de espera
  prototype/    Demo local navegable de BARRIO
  android/      Espacio reservado para la futura app nativa
```

## Probar localmente

No requiere instalación de paquetes ni servicios externos. Abre `apps/landing/index.html` en un navegador. El botón **Probar la demo** lleva al prototipo interactivo incluido.

Si prefieres servir la carpeta con un servidor estático local, usa cualquier servidor de archivos estáticos y apunta a `apps/landing/` como raíz. La demo vive en `apps/prototype/`.

## Lista de espera

El formulario valida el correo y está preparado para enviar un `POST` JSON a un endpoint externo configurado en `apps/landing/config.js`. Sin endpoint, muestra un aviso transparente y no afirma que la suscripción se haya guardado. No se almacena información localmente.

Para habilitar registros reales, elige un proveedor de lista de espera o mailing y coloca su endpoint seguro en la configuración. Revisa también su consentimiento de privacidad antes de publicar la landing. No incluyas claves privadas en archivos del frontend.

## App Android

`apps/android/` queda reservado para iniciar el cliente nativo Android. Se propone Kotlin con Jetpack Compose para la app. La integración con servidor, base de datos, seguridad y pagos se mantiene fuera de este alcance.

## Alcance actual

- Diseño adaptable para celular y escritorio.
- Landing pública con enlaces a la demo y suscripción preparada para endpoint.
- Prototipo de interfaz completo con datos locales de ejemplo.
- Sin backend, base de datos, autenticación, analítica ni pagos reales.

