export const defaultCategories = [
  "vivienda",
  "comida",
  "transporte",
  "salud",
  "educacion",
  "deudas",
  "ocio",
  "servicios",
  "impuestos",
  "ahorro/inversion",
  "otros"
].map((name, index) => ({ id: `cat-${index + 1}`, name }));

export const defaultSettings = {
  selectedMonth: "2026-05",
  exchangeRate: 1100,
  exchangeRateSource: "manual",
  exchangeRateUpdatedAt: "",
  mainCurrency: "ARS",
  financialGoal: "ordenar"
};

export const seedTransactions = [
  {
    id: "t-1",
    date: "2026-05-02",
    type: "income",
    description: "Sueldo principal",
    amount: 1800000,
    currency: "ARS",
    incomeType: "sueldo"
  },
  {
    id: "t-2",
    date: "2026-05-08",
    type: "income",
    description: "Proyecto freelance",
    amount: 500,
    currency: "USD",
    incomeType: "honorarios"
  },
  {
    id: "t-3",
    date: "2026-05-03",
    type: "expense",
    description: "Alquiler",
    amount: 650000,
    currency: "ARS",
    category: "vivienda",
    expenseType: "fixed"
  },
  {
    id: "t-4",
    date: "2026-05-04",
    type: "expense",
    description: "Supermercado",
    amount: 260000,
    currency: "ARS",
    category: "comida",
    expenseType: "variable"
  },
  {
    id: "t-5",
    date: "2026-05-06",
    type: "expense",
    description: "Internet y celular",
    amount: 90000,
    currency: "ARS",
    category: "servicios",
    expenseType: "fixed"
  },
  {
    id: "t-6",
    date: "2026-05-12",
    type: "expense",
    description: "Arreglo del auto",
    amount: 300,
    currency: "USD",
    category: "transporte",
    expenseType: "extraordinary"
  },
  {
    id: "t-7",
    date: "2026-04-02",
    type: "income",
    description: "Sueldo abril",
    amount: 1650000,
    currency: "ARS",
    incomeType: "sueldo"
  },
  {
    id: "t-8",
    date: "2026-04-05",
    type: "expense",
    description: "Gastos abril",
    amount: 1220000,
    currency: "ARS",
    category: "otros",
    expenseType: "variable"
  }
];

export const expenseTypeLabels = {
  fixed: "fijo",
  variable: "variable",
  extraordinary: "extraordinario"
};

export const incomeTypes = ["sueldo", "honorarios", "negocio", "renta", "inversion", "otro"];
export const expenseTypes = ["fixed", "variable", "extraordinary"];
export const goals = ["ordenar", "ahorrar", "reducir deudas", "invertir", "entender gastos"];
