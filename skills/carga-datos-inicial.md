# Skill: Carga de datos inicial - cocoo-app

## Objetivo
Mantener datos mock realistas y compatibles con el modelo local del MVP.

## Cuando usarla
Usala al editar `src/data.js`, categorias iniciales, ejemplos o defaults de usuario.

## Pasos obligatorios
- Revisar shape esperado por `src/App.jsx`.
- Mantener ejemplos anonimos y verosimiles.
- Evitar datos personales reales.
- Validar que la app arranca sin datos previos.

## Checklist antes de modificar
- Se sabe que campo consume cada pantalla.
- No se cambia modelo persistido sin migracion.
- Los valores tienen moneda y categoria coherente.

## Checklist antes de finalizar
- Arranque limpio probado.
- Datos iniciales no rompen diagnostico.
- No hay datos sensibles.

## Errores que debe evitar
- Usar casos irreales que oculten bugs.
- Cambiar claves usadas por `localStorage`.
- Incluir informacion personal.

## Comandos de verificacion
- `npm run build`
- `npm run dev`

## Formato de reporte final
- Datos cambiados.
- Motivo.
- Compatibilidad.
- Prueba de arranque limpio.

