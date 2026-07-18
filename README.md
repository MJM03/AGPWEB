# AGP Web Comercial v1.0.0

Web responsive, PWA e instalable, lista para GitHub Pages.

## Archivos
Todos se encuentran en la raíz, sin carpetas.

## Configuración
Abre `app.js` y modifica:

```js
const CONFIG={
  whatsapp:"51999999999",
  email:"contacto@agp.com"
};
```

El número se escribe con código de país, sin `+`, espacios ni guiones.

## Publicar
1. Sube todos los archivos a la raíz del repositorio.
2. Ve a Settings > Pages.
3. Selecciona `Deploy from a branch`.
4. Elige `main` y `/root`.

## Cotizador
Las tarifas se modifican en el objeto `RATES` de `app.js`.
Los valores son preliminares y no sustituyen una propuesta comercial formal.

## Solicitudes
Se guardan en `localStorage` y pueden descargarse como JSON.
