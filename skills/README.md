# Skills - cocoo-app

## Indice

- `roadmap-negocio.md`: alcance del MVP financiero y prioridades.
- `arquitectura-tecnica.md`: estructura React/Vite, estado local y persistencia.
- `frontend-ui.md`: interfaz, responsive y lectura visual.
- `ux-flujo.md`: carga de datos, pasos, mensajes y diagnostico.
- `motor-matematico-logica.md`: calculos, monedas, categorias y diagnostico.
- `carga-datos-inicial.md`: datos mock y defaults.
- `testing-bugs.md`: reproduccion y validacion de bugs.

## Cuando activar cada skill

- Cambios de alcance, features o prioridades: `roadmap-negocio.md`.
- Cambios en estado, estructura o persistencia: `arquitectura-tecnica.md`.
- Cambios visuales: `frontend-ui.md`.
- Cambios de textos, flujo o diagnostico percibido: `ux-flujo.md`.
- Cambios de calculo o reglas financieras: `motor-matematico-logica.md` + `testing-bugs.md`.
- Cambios en `src/data.js`: `carga-datos-inicial.md`.
- Bugs o regresiones: `testing-bugs.md`.

## Orden recomendado si hay varias capas

1. `roadmap-negocio.md` si cambia alcance.
2. `arquitectura-tecnica.md` si cambia estructura o persistencia.
3. `motor-matematico-logica.md` si cambia calculo.
4. `frontend-ui.md` o `ux-flujo.md` segun corresponda.
5. `testing-bugs.md` siempre al cerrar.

## Matriz de riesgo

- Bajo: copy, estilos menores, README.
- Medio: layout principal, defaults, categorias visuales.
- Alto: `src/utils/finance.js`, modelo `localStorage`, `src/data.js` con cambio de shape.

## Comandos seguros

- `npm run build`
- `npm run dev`
- `npm run preview`

## Comandos condicionales

- `npm install`: solo si faltan dependencias o se clona limpio.

## Comandos prohibidos o que requieren confirmacion

- `npm audit fix`: requiere confirmacion.
- Cambios en `package.json` o `package-lock.json`: requieren confirmacion.
- Borrado o migracion de datos de `localStorage`: requiere confirmacion.

## Ownership por archivos criticos

- `src/utils/finance.js`: Motor matematico.
- `src/App.jsx`: Arquitectura tecnica, Frontend UI, UX.
- `src/data.js`: Carga de datos inicial.
- `src/styles.css`: Frontend UI.
- `README.md`: Roadmap y negocio, UX.

