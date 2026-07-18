# AGPWeb v2.1

Landing responsive con estimador preliminar para AGP Control Integral.

## Archivos
- `index.html`
- `styles.css`
- `app.js`
- `logo-agp.svg`

## Configuración obligatoria
En `app.js`, reemplaza:

```js
const AGP_WHATSAPP = "51999999999";
```

por el número real de WhatsApp, usando código de país y sin `+`, espacios ni guiones.

Ejemplo Perú:

```js
const AGP_WHATSAPP = "51987654321";
```

## Logo
El archivo `logo-agp.svg` incluido es un reemplazo temporal profesional.  
Para usar el logo oficial, reemplaza ese archivo manteniendo exactamente el nombre `logo-agp.svg`, o modifica las rutas en `index.html`.

## Publicación en GitHub Pages
Sube todos los archivos a la raíz del repositorio. No requiere carpetas ni compilación.

## Cambios principales
- Eliminado el botón de instalación.
- WhatsApp implementado con SVG integrado, sin librerías externas.
- Estimación preliminar por rango.
- Planes Esencial, Profesional e Integral.
- Cálculo por volumen, sedes, ciudad, horario, complejidad y adicionales.
- Copia y envío del resumen por WhatsApp.
- Diseño responsive y optimizado para móviles.
