# Skill: Testing y bugs - cocoo-app

## Objetivo
Detectar regresiones en carga de ingresos/gastos, diagnostico, categorias, monedas y persistencia local.

## Cuando usarla
Usala ante bugs, cambios de calculo, ajustes de formularios o antes de entregar una mejora.

## Pasos obligatorios
- Reproducir el caso con pasos claros.
- Verificar datos iniciales y datos ya persistidos.
- Probar ARS, USD y tipo de cambio manual.
- Confirmar que el diagnostico coincide con el flujo esperado.

## Checklist antes de modificar
- Hay caso reproducible.
- Se identifico archivo probable.
- Se conocen datos de entrada y resultado esperado.

## Checklist antes de finalizar
- `npm run build` pasa.
- Flujo manual probado.
- No se pierden datos guardados.

## Errores que debe evitar
- Arreglar solo el sintoma visual.
- Cambiar formulas sin ejemplos numericos.
- Vaciar `localStorage` como solucion permanente.

## Comandos de verificacion
- `npm run build`
- `npm run dev`

## Formato de reporte final
- Bug reproducido.
- Causa.
- Fix aplicado.
- Pruebas realizadas.

