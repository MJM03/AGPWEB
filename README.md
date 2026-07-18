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


## Acceso local protegido
- URL: `login.html`
- Usuario demo: `admin@agp.pe`
- Contraseña demo: `AGP2026`
- El panel `admin.html` redirige al login cuando no existe una sesión activa.

> Para producción, reemplazar este acceso local por Firebase Authentication.


## Novedades v1.3
- Formulario público de propuesta formal rediseñado y reordenado.
- Cálculo de tiempo teórico a 1 producto por segundo por operario.
- Cálculo operativo ajustable por eficiencia y horas por jornada.
- Horas y jornadas estimadas visibles y guardadas en las cotizaciones del ERP.


## Corrección v1.3
- Recálculo inmediato y robusto del resultado comercial.
- Lectura directa de todos los campos del cotizador.
- Validación entre volumen, operarios y jornadas.
- Cálculo de operarios mínimos para cumplir el plazo.
- Aviso visual cuando el plan operativo es insuficiente.
- Versionado de scripts para evitar que GitHub Pages o el navegador usen JavaScript anterior en caché.
