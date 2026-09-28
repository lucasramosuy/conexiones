# Conexiones

16 palabras, 4 grupos. Juego diario de categorías jurídicas uruguayas bajo la identidad de lucasramos.uy. El primer acertijo salió el 28/09/2026.

## Juego diario

El Worker selecciona un acertijo curado de `POOL` en `worker.js` según la fecha de Uruguay (UTC−3), empezando el 28/09/2026. La selección es igual para todos los jugadores y cambia a las 00:00 de Uruguay. El cliente carga `/conexiones/api/today` sin usar caché, usa el ID y la fecha que entrega la API y recarga la página cuando termina el día.

Hay que agrupar 16 palabras en cuatro categorías escondidas de a cuatro. Cada categoría tiene su color de dificultad (amarillo, verde, azul, violeta, de más fácil a más difícil). Cuatro errores y se pierde; al fallar con tres de cuatro bien elegidas el juego avisa «Te falta una». Al perder se revelan las categorías que faltaban.

**El pool contiene 30 acertijos distintos.** Tras el día 30 se repite el orden; antes de agotar el pool, añadir acertijos curados y ejecutar el deploy manual para mantener el juego nuevo. Cambiar el orden de los acertijos existentes cambia fechas futuras; no cambiar la fecha de inicio ni reutilizar IDs del día, ya que las partidas se guardan por ID. La curaduría es de términos del derecho uruguayo (Código Civil, Código Penal, CGP, Constitución, leyes especiales), revisada contra el texto oficial del IMPO.

Las categorías viajan en la respuesta de la API y la validación es en el navegador: como en Fotograma, quien abra las herramientas de desarrollo puede espiar la solución. Es un juego personal sin cuentas ni ranking; se acepta ese límite a cambio de no tener servidor de partidas.

La racha cuenta **días consecutivos ganados** según la fecha del acertijo en Uruguay. Una derrota no suma; si pasa un día sin ganar, la racha visible vuelve a cero. Se guarda en `localStorage` del dispositivo: no sincroniza entre equipos y puede perderse al borrar los datos del navegador. La partida del día (grupos encontrados, errores, resultado) también se guarda por ID en el dispositivo. Después de ganar o perder se puede generar y descargar una imagen PNG vertical (1080 × 1920) con las cuatro categorías en su color, el Nº, la fecha y el puntaje. Todo se crea en el navegador con Canvas, sin subir la partida a un servidor, y las fuentes del kit se cargan con `document.fonts.load` antes de pintar (patrón de la sección 7 del brand kit). En navegadores que admitan Web Share API con archivos aparece además «Compartir imagen». «Copiar resultado como texto» mantiene la grilla de 🟨, 🟩, 🟦 y 🟪 en el orden en que se resolvieron las categorías, número, errores (`X` si se perdió) y enlace, sin revelar los grupos. Si falla el portapapeles, se muestra el texto para seleccionarlo manualmente.

## Desarrollo

```bash
pnpm install
pnpm prepare
pnpm run check
pnpm dev
```

Las fuentes del kit se copian desde paquetes @fontsource versionados al build y se sirven localmente. No hay cuentas, secretos ni APIs externas.

## Despliegue

Después del merge: Actions > **Desplegar Conexiones** > **Run workflow** en `main`. El workflow instala pnpm, ejecuta `check` y `prepare`, y despliega Worker y assets en un solo comando. No hay auto-deploy por merge. La credencial `CLOUDFLARE_API_TOKEN` queda en GitHub Actions > Repository secrets, nunca en el repo. La configuración incluye `lucasramos.uy/conexiones` y `lucasramos.uy/conexiones/*`, más específicas que la ruta del proxy general; no modifica el código de `normativa` ni otras rutas. También hay `workers.dev` para diagnóstico.

Reglas visuales: https://github.com/lucasramosuy/brand/blob/main/BRAND.md
