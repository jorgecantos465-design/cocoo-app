# Cocoo App

MVP responsive para claridad financiera personal. Permite cargar ingresos y gastos en ARS/USD, configurar el mes, administrar categorias, ver analisis y obtener un diagnostico simple.

## Correr localmente

```bash
npm install
npm run dev
```

Luego abrir la URL que indique Vite, normalmente `http://localhost:5173`.

## Scripts

```bash
npm run build
npm run preview
```

## Alcance actual

- Datos mock iniciales con persistencia en `localStorage`.
- Sin login, base de datos externa, bancos, MercadoPago ni APIs de dolar.
- Tipo de cambio manual configurable.
- Estructura preparada para comparar meses desde las transacciones cargadas.
