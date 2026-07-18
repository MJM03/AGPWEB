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


## Novedades v1.6
- Formulario público de propuesta formal rediseñado y reordenado.
- Cálculo de tiempo teórico a 1 producto por segundo por operario.
- Cálculo operativo ajustable por eficiencia y horas por jornada.
- Horas y jornadas estimadas visibles y guardadas en las cotizaciones del ERP.


## Corrección v1.6
- Recálculo inmediato y robusto del resultado comercial.
- Lectura directa de todos los campos del cotizador.
- Validación entre volumen, operarios y jornadas.
- Cálculo de operarios mínimos para cumplir el plazo.
- Aviso visual cuando el plan operativo es insuficiente.
- Versionado de scripts para evitar que GitHub Pages o el navegador usen JavaScript anterior en caché.


## Estrategia comercial v1.6
El cotizador ahora genera cuatro escenarios:
- Captación: 10% de margen bruto.
- Inicio competitivo: 18% (recomendado para AGP en etapa inicial).
- Sostenible: 25%.
- Premium/corporativo: 32%.

Estos porcentajes son editables y funcionan sobre el costo operativo calculado. El sistema no permite bajar del margen mínimo configurado ni vender por debajo del costo. Las bandas son una política interna inicial, no un tarifario comprobado del mercado, porque los competidores consultados cotizan cada operación según alcance y no publican precios comparables.


## PDF profesional v1.6
- Plantillas Premium, Corporativa y Comercial.
- Portada personalizada por cliente.
- Resumen ejecutivo, alcance, entregables y metodología.
- Datos operativos, equipo, duración y propuesta económica.
- Condiciones comerciales, contacto y espacios de firma.
- Formato A4 listo para guardar como PDF desde el navegador.


## Integración comercial v1.6

### Web pública
- Se eliminó el cotizador y cualquier precio automático.
- Se añadió un diagnóstico gratuito orientado a bodegas, farmacias y pequeños negocios.
- El formulario registra el lead en AGP Platform y abre WhatsApp con el resumen.
- La web explica qué recibirá el cliente: tiempo, personal, alcance y propuesta personalizada.

### ERP
- Nuevo modo Barrio Express para farmacias y bodegas de hasta 3,000 productos y una sede.
- Precio mínimo viable con margen inicial configurable.
- Modalidades: Barrio Express, Lanzamiento, Crecimiento y Corporativo.
- Variables de recurrencia, valor estratégico, rubro y etapa comercial de AGP.
- Costeo por horas para operaciones pequeñas, evitando cobrar automáticamente una jornada completa.
- Reducción automática de costos accesorios en propuestas pequeñas.
- Nunca vende por debajo del costo calculado.
