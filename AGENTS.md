# AGENTS.md - cocoo-app

## Objetivo del proyecto

MVP responsive de claridad financiera personal. Permite cargar ingresos y gastos en ARS/USD, configurar mes y categorias, ver analisis y obtener un diagnostico simple con persistencia local.

## Stack tecnico detectado

- React 19
- Vite 7
- Tailwind CSS 3
- PostCSS + Autoprefixer
- Datos iniciales y persistencia en `localStorage`
- JavaScript sin TypeScript

## Comandos

- Instalacion: `npm install`
- Desarrollo: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Test: no hay script de test detectado

## Estructura y archivos criticos

- `src/App.jsx`: experiencia principal y flujo de la app.
- `src/main.jsx`: punto de entrada React.
- `src/data.js`: datos mock/iniciales.
- `src/utils/finance.js`: calculos y utilidades financieras.
- `src/styles.css`: estilos globales.
- `index.html`, `tailwind.config.js`, `postcss.config.js`: configuracion de app y estilos.

## Reglas de trabajo

- No tocar `node_modules` ni `dist`.
- No cambiar `package.json` o `package-lock.json` sin avisar antes.
- Mantener la app sin login, sin backend y sin integraciones externas salvo autorizacion.
- Preservar compatibilidad con datos ya guardados en `localStorage`.
- Antes de cambiar calculos, identificar casos de prueba manuales y validar resultados esperados.
- Mantener textos en espanol claro y orientado a usuarios no tecnicos.

## No tocar sin autorizacion

- Modelo de datos persistido en `localStorage`.
- Semantica de categorias, monedas y tipo de cambio.
- Formulas de diagnostico financiero en `src/utils/finance.js`.
- Datos iniciales de `src/data.js` si afectan demos o capturas existentes.

## Estrategia de commits

- Commits pequenos por tema: UI, calculos, datos o estilos.
- Si se cambia logica financiera, separar el commit de cambios visuales.
- Mensajes sugeridos: `feat:`, `fix:`, `refactor:`, `docs:`.

## Criterios de finalizacion

- `npm run build` pasa sin errores.
- La app corre con `npm run dev`.
- Los flujos principales de carga, edicion y diagnostico funcionan.
- No se pierden datos existentes de `localStorage` salvo migracion aprobada.

## Subagentes recomendados

Antes de activar un rol, revisar el indice operativo en `skills/README.md`.

- Roadmap y negocio: usar `skills/roadmap-negocio.md`.
- Arquitectura tecnica: usar `skills/arquitectura-tecnica.md`.
- Frontend UI: usar `skills/frontend-ui.md`.
- UX y flujo: usar `skills/ux-flujo.md`.
- Motor matematico / logica de negocio: usar `skills/motor-matematico-logica.md`.
- Datos iniciales / seed: usar `skills/carga-datos-inicial.md`.
- Testing y bugs: usar `skills/testing-bugs.md`.
