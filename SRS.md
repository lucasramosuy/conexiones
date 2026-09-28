# SRS - Conexiones

## Alcance
- Un acertijo diario común a todos según la fecha de Uruguay (UTC−3), a partir del 28/09/2026. El pool contiene 30 acertijos curados de categorías jurídicas uruguayas; después se repite hasta agregar más contenido y desplegar manualmente. No prometer contenido nuevo indefinidamente sin curaduría.
- 16 términos para agrupar en cuatro categorías ocultas de cuatro, cada una con su color de dificultad (amarillo, verde, azul, violeta, en orden creciente). Selección de a cuatro, botones de mezclar y desmarcar, y aviso de «Te falta una» cuando tres de las cuatro elegidas son del mismo grupo.
- Cuatro errores y se pierde: al perder se revelan las categorías faltantes atenuadas. Al ganar, la racha de días consecutivos se actualiza en `localStorage` (por fechas del acertijo; no se sincroniza entre dispositivos).
- Curaduría verificable: términos y figuras del derecho uruguayo contrastados con el texto oficial del IMPO (Código Penal, Código Civil, CGP) y fuentes de gub.uy; sin figuras derogadas ni errores de doctrina básica.
- Al terminar, generar en Canvas una imagen vertical de 1080 × 1920 con las cuatro categorías en su color, Nº, fecha y puntaje, siguiendo el patrón del brand kit: fuentes self-hosteadas declaradas con `@font-face` y cargadas con `document.fonts.load` por peso antes de pintar; nunca fuentes del sistema visibles. Vista previa, descarga y Web Share API de archivos donde esté disponible; sin subir la partida al servidor.
- Mantener la copia de número, errores, grilla de emojis por categoría resuelta y enlace como alternativa de texto, sin revelar los grupos; selección manual si falla el portapapeles.
- Estado de la partida por ID en `localStorage`; recarga automática a la medianoche uruguaya.
- La API `/conexiones/api/today` entrega el acertijo con sus categorías: la validación es en el navegador y la solución es visible para quien inspeccione la red. Se acepta ese límite (juego personal sin cuentas ni ranking) a cambio de no mantener servidor de partidas.
- Hosting en Worker + Static Assets de Cloudflare bajo `/conexiones/`; despliegue manual mediante GitHub Actions. Sin secretos ni servicios pagos.

## Fuera de alcance
- Archivo de acertijos anteriores, cuentas, estadísticas compartidas, ranking, generación automática de acertijos, contenido nuevo indefinido sin mantenimiento, costes pagos o cambios en el Worker proxy general.
