# AGP Platform v1.0

Proyecto unificado con:
- `index.html`: web pública y estimador.
- `admin.html`: ERP/CRM administrativo.
- `pricing-engine.js`: motor único usado por ambos espacios.
- Leads creados en la web aparecen en el módulo Leads del panel, usando almacenamiento local compartido.

## Uso
Sube todos los archivos a la raíz de GitHub Pages. Abre `index.html`; el botón “Ingresar a AGP Platform” abre `admin.html`.

## WhatsApp
Edita `AGP_WHATSAPP` en `app.js`.

## Firebase
Esta versión funciona sin configuración y guarda datos en el navegador. La siguiente etapa para producción multiusuario es sustituir el adaptador localStorage por Firebase Auth/Firestore, manteniendo el motor y las interfaces.
