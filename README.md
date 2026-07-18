# AGP Platform v2.0 Firebase

Versión conectada al proyecto Firebase `agp-platform`.

## Qué funciona

- Inicio de sesión real con Firebase Authentication.
- Sesión persistente entre recargas.
- Estado completo del ERP sincronizado con Cloud Firestore.
- Actualización en tiempo real entre computadoras y celulares.
- Diagnóstico público guardado en la colección `publicLeads`.
- Importación automática de nuevos leads al ERP.
- Eliminación del lead temporal después de consolidarlo en la base interna.
- Respaldo local de emergencia en `localStorage`.
- Herramienta manual de migración desde la versión local.
- Reglas de Firestore incluidas.
- Configuración para Firebase Hosting incluida.

## Archivos Firebase

- `firebase-config.js`
- `firebase-service.js`
- `admin-bootstrap.js`
- `firestore.rules`
- `firestore.indexes.json`
- `firebase.json`
- `.firebaserc`
- `migration.html`
- `migration.js`

## Paso obligatorio: publicar las reglas

En Firebase Console:

1. Firestore Database.
2. Reglas.
3. Reemplaza el contenido con `firestore.rules`.
4. Pulsa **Publicar**.

Sin estas reglas, la web pública podría no guardar leads o el ERP podría recibir errores de permisos.

## Probar

1. Publica todos los archivos en el mismo dominio.
2. Abre `login.html`.
3. Inicia sesión con el usuario creado en Firebase Authentication.
4. Crea o modifica un registro.
5. Abre `admin.html` en otro dispositivo e inicia sesión con el mismo usuario.
6. Los cambios deben aparecer automáticamente.

## Migración

La primera vez que el ERP encuentra Firestore vacío, sube automáticamente la base disponible en el navegador.

También puedes abrir:

`migration.html`

para forzar la migración de los datos locales. Esta acción reemplaza el estado de Firebase y crea una copia de seguridad local del estado anterior.

## Firebase Hosting

Con Firebase CLI instalado:

```bash
firebase login
firebase deploy --only firestore:rules,firestore:indexes
firebase deploy --only hosting
```

## Arquitectura actual

Para conservar compatibilidad con todos los módulos existentes, v2.0 almacena el estado del ERP en:

`workspaces/default`

Los diagnósticos públicos se reciben temporalmente en:

`publicLeads`

Esta arquitectura es adecuada para la etapa inicial. Cuando el volumen de información crezca, la siguiente evolución será separar clientes, cotizaciones, proyectos y movimientos en colecciones individuales para evitar el límite de tamaño de un documento de Firestore.
