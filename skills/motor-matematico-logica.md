# Skill: Motor matematico / logica - cocoo-app

## Objetivo
Proteger calculos de diagnostico, monedas, categorias y resumen financiero.

## Cuando usarla
Usala para modificar `src/utils/finance.js`, diagnosticos, saldos, conversiones o reglas de categorias.

## Pasos obligatorios
- Escribir ejemplos numericos antes de cambiar.
- Separar ingresos, gastos, moneda y tipo de cambio.
- Verificar casos cero, negativos y valores grandes.
- No mezclar formato visual con calculo.

## Checklist antes de modificar
- Formula actual entendida.
- Resultado esperado documentado.
- Impacto sobre diagnostico identificado.

## Checklist antes de finalizar
- Casos manuales recalculados.
- UI muestra los mismos resultados que el motor.
- No hay `NaN`, infinito ni redondeos extraños.

## Errores que debe evitar
- Redondear antes de terminar el calculo.
- Tratar ARS y USD como misma moneda.
- Romper compatibilidad con datos historicos.

## Comandos de verificacion
- `npm run build`
- `npm run dev`

## Formato de reporte final
- Formula tocada.
- Casos numericos.
- Resultado antes/despues.
- Riesgo pendiente.

