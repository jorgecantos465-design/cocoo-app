# Skill: Roadmap y negocio - cocoo-app

## Objetivo
Priorizar mejoras del MVP de claridad financiera personal segun impacto en entendimiento, diagnostico y uso recurrente.

## Cuando usarla
Usala para definir alcance, ordenar features, evaluar tradeoffs de producto o decidir si una mejora entra al MVP.

## Pasos obligatorios
- Identificar el problema financiero del usuario.
- Separar valor de negocio, riesgo tecnico y esfuerzo.
- Revisar si la propuesta mantiene el alcance sin backend ni integraciones.
- Definir resultado esperado medible.

## Checklist antes de modificar
- Hay objetivo de usuario claro.
- No requiere login, APIs externas ni pagos.
- No rompe datos guardados en `localStorage`.
- El cambio cabe en el flujo actual.

## Checklist antes de finalizar
- El alcance queda documentado.
- Se explican impactos en diagnostico, datos o UI.
- Quedan pendientes y riesgos visibles.

## Errores que debe evitar
- Convertir el MVP en sistema contable.
- Agregar integraciones antes de validar el flujo base.
- Cambiar categorias o monedas sin plan de migracion.

## Comandos de verificacion
- `npm run build`
- `npm run dev`

## Formato de reporte final
- Decision tomada.
- Valor para el usuario.
- Archivos tocados.
- Riesgos y proximo paso.

