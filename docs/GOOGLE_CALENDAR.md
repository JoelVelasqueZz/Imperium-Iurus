# Google Calendar — configuración de desarrollo (T08)

Prueba de concepto: el proyecto se conecta a un **calendario de pruebas** de Google y lista sus próximos eventos, sin que nadie inicie sesión cada vez. Es la base de los endpoints de creación de eventos (T09) y de disponibilidad (T10).

**Criterio de la tarea:** lista eventos del calendario de pruebas (título y fecha).

> **Alcance:** solo desarrollo. Se usa una cuenta de Google creada solo para pruebas y un calendario con eventos inventados. El calendario real del abogado se configura más adelante, aparte, con su propia cuenta.

## Resumen

| Elemento | Valor |
| --- | --- |
| Cuenta de Google | Cuenta nueva solo para pruebas (la dirección la tiene el equipo) |
| Proyecto de Google Cloud | `imperium-iuris-dev` |
| API habilitada | Google Calendar API |
| Tipo de app OAuth | Externa, estado de publicación **Prueba (Testing)** |
| Usuarios de prueba | La misma cuenta de pruebas |
| Tipo de cliente OAuth | Aplicación web |
| URI de redireccionamiento | `https://developers.google.com/oauthplayground` |
| Obtención del refresh token | OAuth 2.0 Playground |
| Código | `lib/google-calendar.ts` |
| Ruta de comprobación | `GET /api/dev/google-eventos` (solo desarrollo; 404 en producción) |

## Scopes

Se piden solo los permisos necesarios:

| Scope | Para qué | Tarea |
| --- | --- | --- |
| `https://www.googleapis.com/auth/calendar.events` | Ver y crear eventos | T08, T09 |
| `https://www.googleapis.com/auth/calendar.events.freebusy` | Consultar qué horas están ocupadas | T10 |

No se usa `https://www.googleapis.com/auth/calendar` (acceso total al calendario) porque no hace falta.

## Variables de entorno

Van **solo** en `.env.local`, que Git ignora (`.gitignore`: `.env*.local`). En `.env.example` están los mismos nombres, vacíos.

| Variable | Qué es | ¿Secreta? |
| --- | --- | --- |
| `GOOGLE_CLIENT_ID` | ID del cliente OAuth (`...apps.googleusercontent.com`) | Sí |
| `GOOGLE_CLIENT_SECRET` | Secreto del cliente OAuth | Sí |
| `GOOGLE_REFRESH_TOKEN` | Llave de larga duración obtenida en OAuth Playground | Sí |
| `GOOGLE_CALENDAR_ID` | ID del calendario de pruebas (`...@group.calendar.google.com`) | No se publica |

Las credenciales nunca van en el repositorio, en el PR, en capturas ni en el chat del equipo. Si otra persona las necesita, se entregan por un canal privado. En las capturas de esta guía, los datos sensibles aparecen tapados.

## Paso 1: cuenta de Google para pruebas

Se creó una cuenta de Google nueva, usada solo para esta configuración. Conviene abrirla en un perfil de Chrome aparte (foto de perfil, arriba a la derecha → **Agregar**) para no mezclarla con cuentas personales.

## Paso 2: calendario de pruebas

1. Con la cuenta de pruebas, entrar a `calendar.google.com`.
2. A la izquierda, junto a **Otros calendarios**, pulsar **+ → Crear calendario**. Nombre: `Imperium Pruebas`. Zona horaria: **(GMT-05:00) Ecuador**. Pulsar **Crear calendario**.

![Crear calendario](attachments/t08-01-calendario-crear-1.png)
![Datos del calendario nuevo](attachments/t08-02-calendario-crear-2.png)

3. Clic en el nombre del calendario → **Configuración y uso compartido**. Bajar hasta **Integrar el calendario** y copiar el **ID del calendario** (termina en `@group.calendar.google.com`). Es el valor de `GOOGLE_CALENDAR_ID`.

![Configuración del calendario](attachments/t08-03-calendario-config.png)
![Sección Integrar el calendario](attachments/t08-04-calendario-integrar.png)

4. Crear tres eventos inventados para los próximos días, sin nombres ni datos de clientes reales. Sirven para comprobar la conexión.

![Eventos de prueba](attachments/t08-05-eventos-prueba.png)

## Paso 3: proyecto en Google Cloud y Calendar API

1. Entrar a `console.cloud.google.com` con la cuenta de pruebas y aceptar los términos. No se necesita tarjeta de crédito: la Calendar API es gratuita.

![Términos de Google Cloud](attachments/t08-06-cloud-terminos-1.png)
![Consola de Google Cloud](attachments/t08-07-cloud-terminos-2.png)

2. Selector de proyectos (arriba, junto al logo) → **Proyecto nuevo**. Nombre: `imperium-iuris-dev` → **Crear**. Comprobar que quede seleccionado en el mismo selector.

![Selector de proyectos](attachments/t08-08-proyecto-nuevo-1.png)
![Proyecto nuevo](attachments/t08-09-proyecto-nuevo-2.png)
![Proyecto seleccionado](attachments/t08-10-proyecto-nuevo-3.png)

3. Menú ☰ → **APIs y servicios → Biblioteca**. Buscar `Google Calendar API`, abrirla y pulsar **Habilitar**.

![Buscar Google Calendar API](attachments/t08-11-calendar-api-buscar.png)
![Habilitar Google Calendar API](attachments/t08-12-calendar-api-habilitar.png)

## Paso 4: pantalla de consentimiento (Google Auth Platform)

Es la pantalla que ve una persona cuando una aplicación le pide permiso. Google la llama *Google Auth Platform* o *Pantalla de consentimiento de OAuth*.

1. Menú ☰ → **APIs y servicios → Pantalla de consentimiento de OAuth** → **Comenzar**.

![Menú de la pantalla de consentimiento](attachments/t08-13-consentimiento-menu.png)
![Comenzar](attachments/t08-14-consentimiento-comenzar.png)

2. **Información de la app:** nombre `Imperium Iuris DEV`; correo de asistencia: la cuenta de pruebas → **Siguiente**.

![Información de la app](attachments/t08-15-app-info.png)

3. **Público:** **Externo** → **Siguiente**.
4. **Información de contacto:** la cuenta de pruebas → **Siguiente**. Aceptar la política → **Crear**.

![Público externo](attachments/t08-16-publico-externo.png)
![Contacto y creación](attachments/t08-17-contacto-crear.png)

5. Menú izquierdo → **Público → Usuarios de prueba → Agregar usuarios** → la cuenta de pruebas → **Guardar**. Si la cuenta no está en esta lista, Google no la deja autorizar la app. En esa misma página el estado de publicación debe quedar en **Prueba (Testing)**; no se pulsa **Publicar app**.

![Agregar usuario de prueba](attachments/t08-18-usuarios-prueba-1.png)
![Usuario de prueba agregado y estado Testing](attachments/t08-19-usuarios-prueba-2.png)

6. **Acceso a los datos → Agregar o quitar permisos**. En **Agregar permisos manualmente**, pegar los dos scopes (uno por línea) → **Agregar a la tabla → Actualizar → Guardar**.

```text
https://www.googleapis.com/auth/calendar.events
https://www.googleapis.com/auth/calendar.events.freebusy
```

![Agregar scopes manualmente](attachments/t08-20-scopes-1.png)
![Scopes guardados](attachments/t08-21-scopes-2.png)

## Paso 5: cliente OAuth

1. Menú izquierdo → **Clientes → Crear cliente**.

![Clientes](attachments/t08-22-clientes.png)

2. Tipo de aplicación: **Aplicación web**. Nombre: `Imperium DEV - Playground`.

![Tipo de cliente](attachments/t08-23-cliente-tipo.png)

3. En **URIs de redireccionamiento autorizados** → **Agregar URI** → exactamente esto, sin barra al final:

```text
https://developers.google.com/oauthplayground
```

![URI de redireccionamiento](attachments/t08-24-cliente-uri.png)

4. Pulsar **Crear**. Aparecen el **ID de cliente** y el **Secreto del cliente**. Guardarlos de inmediato (descargar el JSON fuera de la carpeta del proyecto): Google puede no volver a mostrar el secreto completo.

![Cliente creado (datos tapados)](attachments/t08-25-cliente-creado.png)

## Paso 6: refresh token con OAuth Playground

OAuth Playground es una página de Google para hacer la autorización a mano, sin programar.

1. Abrir `https://developers.google.com/oauthplayground` en la ventana de la cuenta de pruebas.
2. Engranaje (arriba a la derecha) → marcar **Use your own OAuth credentials** → pegar el **OAuth Client ID** y el **OAuth Client secret**. *Access type*: **Offline**. Cerrar el engranaje.

![Configuración de OAuth Playground](attachments/t08-26-playground-config.png)

3. En **Step 1**, caja **Input your own scopes**: pegar los dos scopes **en una sola línea, separados por un espacio**:

```text
https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.freebusy
```

![Scopes en Playground](attachments/t08-27-playground-scopes.png)

4. Pulsar **Authorize APIs** y elegir la cuenta de pruebas.

![Elegir la cuenta de pruebas (datos tapados)](attachments/t08-28-playground-cuenta.png)

5. Google muestra el aviso "Google no verificó esta app". Es lo esperado en modo Testing: pulsar **Continuar**, marcar las casillas de permisos y volver a pulsar **Continuar**.

![Aviso de app no verificada](attachments/t08-29-app-no-verificada.png)

6. De vuelta en el Playground, **Step 2 → Exchange authorization code for tokens**.

![Intercambio del código (datos tapados)](attachments/t08-30-playground-tokens.png)

7. Copiar el **Refresh token** completo: es el valor de `GOOGLE_REFRESH_TOKEN`.

## Paso 7: configurar el proyecto

1. Agregar al final de `.env.local` (carpeta principal), sin comillas y sin espacios alrededor del `=`:

```text
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GOOGLE_CALENDAR_ID=...
```

2. Agregar las mismas variables **vacías** al final de `.env.example`:

```text
# ─── GOOGLE CALENDAR (T08) ───
# Valores solo en .env.local. Los entrega el equipo por un canal privado.
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_CALENDAR_ID=
```

3. Reiniciar `npm run dev` (Ctrl + C y volver a ejecutarlo) para que lea las variables nuevas.

## Cómo funciona el código

`lib/google-calendar.ts` no agrega dependencias: usa `fetch`.

- **`obtenerTokenGoogle()`** cambia el refresh token por un *access token* en `https://oauth2.googleapis.com/token`. El access token dura 1 hora; se guarda en memoria y se reutiliza hasta un minuto antes de vencer. La usan la T09 y la T10.
- **`listarProximosEventos(cantidad = 5)`** llama a `GET /calendar/v3/calendars/{GOOGLE_CALENDAR_ID}/events` y devuelve `{ id, titulo, inicio }` de los próximos eventos. Es la que cumple el criterio de la T08.

## Comprobación

Con `npm run dev`, abrir `http://localhost:3000/api/dev/google-eventos`. Respuesta esperada (JSON):

```json
{
  "success": true,
  "data": [
    { "id": "...", "titulo": "Reunión de prueba 1", "inicio": "2026-11-17T10:00:00-05:00" }
  ]
}
```

![Eventos del calendario de pruebas](attachments/t08-31-resultado.png)

Si responde `success: false`, el mensaje real de Google aparece en la terminal donde corre `npm run dev` (ver **Errores comunes**).

**En producción la ruta devuelve 404.** La ruta `app/api/dev/google-eventos/route.ts` comprueba `process.env.NODE_ENV === 'production'` y en ese caso responde `404`. Para comprobarlo en local: detener `npm run dev`, ejecutar `npm run build` y luego `npm start`, y abrir la misma dirección. Debe responder `404` con `{"success":false,"error":"No encontrado"}`.

## Mantenimiento: el token vence cada 7 días

Mientras la app esté en **Prueba (Testing)**, Google invalida el refresh token de los usuarios de prueba a los 7 días. El síntoma es el error `invalid_grant` en la terminal. Solución: repetir el **Paso 6** y reemplazar `GOOGLE_REFRESH_TOKEN` en `.env.local`.

Para el calendario real se necesitará otra configuración (cuenta del abogado y app publicada o cuenta de empresa). Queda fuera de esta tarea.

## Errores comunes

| Error | Causa probable | Solución |
| --- | --- | --- |
| `invalid_grant` | Token vencido (7 días), copiado incompleto o generado con otro cliente | Repetir el Paso 6 |
| `invalid_client` | ID o secreto mal copiados | Revisar `.env.local` (sin espacios ni comillas) |
| `redirect_uri_mismatch` | La URI del cliente no es exactamente la del Playground | Corregir en el Paso 5 |
| `access_denied` / "la app no está disponible" | La cuenta no está en Usuarios de prueba | Paso 4, punto 5 |
| 403 "insufficient permissions" / "API has not been used" | API no habilitada o faltan scopes | Pasos 3 y 4; luego repetir el Paso 6 |
| 404 al listar | `GOOGLE_CALENDAR_ID` incorrecto o calendario de otra cuenta | Revisar el ID del Paso 2 |
| La ruta responde 404 en `npm run dev` | Falta el archivo `app/api/dev/google-eventos/route.ts` o está mal ubicado | Revisar el nombre y la ruta de carpetas |
| Nada cambia tras editar `.env.local` | El servidor no se reinició | Reiniciar `npm run dev` |
