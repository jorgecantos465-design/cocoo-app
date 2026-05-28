# Skill: Arquitectura tecnica - cocoo-app

## Objetivo
Mantener una arquitectura simple de React/Vite con estado local, calculos separados y persistencia segura en `localStorage`.

## Cuando usarla
Usala al mover estado, cambiar estructura de componentes, modificar persistencia o preparar refactors.

## Pasos obligatorios
- Leer `src/App.jsx`, `src/data.js` y `src/utils/finance.js`.
- Identificar fuentes de estado y datos persistidos.
- Mantener cambios chicos y reversibles.
- Evitar dependencias nuevas salvo autorizacion.

## Checklist antes de modificar
- Entiendo el shape de datos guardados.
- No hay cambio en `package.json`.
- Se sabe que pantalla o flujo consume cada dato.

## Checklist antes de finalizar
- Build exitoso.
- No quedan imports muertos.
- La app carga con datos existentes y con datos iniciales.

## Errores que debe evitar
- Mezclar calculos financieros dentro de componentes visuales.
- Romper compatibilidad con `localStorage`.
- Crear abstracciones grandes para un MVP chico.

## Comandos de verificacion
- `npm run build`
- `npm run preview`

## Formato de reporte final
- Cambio estructural.
- Compatibilidad preservada.
- Verificacion ejecutada.
- Riesgo residual.

