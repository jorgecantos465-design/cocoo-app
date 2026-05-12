import { expenseTypeLabels } from "../data";

export function toARS(amount, currency, exchangeRate) {
  const numericAmount = Number(amount) || 0;
  return currency === "USD" ? numericAmount * exchangeRate : numericAmount;
}

export function fromARS(amountARS, currency, exchangeRate) {
  if (currency === "USD") return exchangeRate ? amountARS / exchangeRate : 0;
  return amountARS;
}

export function monthKey(date) {
  return String(date || "").slice(0, 7);
}

export function formatMoney(value, currency = "ARS") {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "USD" ? 2 : 0
  }).format(Number.isFinite(value) ? value : 0);
}

export function percent(value) {
  return `${(Number.isFinite(value) ? value : 0).toFixed(1)}%`;
}

export function calculateSummary(transactions, settings) {
  const selected = transactions.filter((item) => monthKey(item.date) === settings.selectedMonth);
  const exchangeRate = Number(settings.exchangeRate) || 1;
  const totals = {
    incomeARS: 0,
    expenseARS: 0,
    byCategory: {},
    byExpenseType: { fixed: 0, variable: 0, extraordinary: 0 },
    selected
  };

  selected.forEach((item) => {
    const valueARS = toARS(item.amount, item.currency, exchangeRate);
    if (item.type === "income") {
      totals.incomeARS += valueARS;
      return;
    }

    totals.expenseARS += valueARS;
    totals.byCategory[item.category] = (totals.byCategory[item.category] || 0) + valueARS;
    totals.byExpenseType[item.expenseType] = (totals.byExpenseType[item.expenseType] || 0) + valueARS;
  });

  const balanceARS = totals.incomeARS - totals.expenseARS;
  const savingRate = totals.incomeARS ? (balanceARS / totals.incomeARS) * 100 : 0;
  const dominantCategory = Object.entries(totals.byCategory).sort((a, b) => b[1] - a[1])[0] || ["sin datos", 0];
  const fixedIncomeRate = totals.incomeARS ? (totals.byExpenseType.fixed / totals.incomeARS) * 100 : 0;
  const variableIncomeRate = totals.incomeARS ? (totals.byExpenseType.variable / totals.incomeARS) * 100 : 0;

  return {
    ...totals,
    balanceARS,
    savingRate,
    dominantCategory: {
      name: dominantCategory[0],
      amountARS: dominantCategory[1],
      shareOfExpenses: totals.expenseARS ? (dominantCategory[1] / totals.expenseARS) * 100 : 0
    },
    fixedIncomeRate,
    variableIncomeRate,
    incomeUSD: fromARS(totals.incomeARS, "USD", exchangeRate),
    expenseUSD: fromARS(totals.expenseARS, "USD", exchangeRate),
    balanceUSD: fromARS(balanceARS, "USD", exchangeRate)
  };
}

export function monthlyComparison(transactions, settings) {
  const exchangeRate = Number(settings.exchangeRate) || 1;
  const months = {};

  transactions.forEach((item) => {
    const key = monthKey(item.date);
    if (!months[key]) months[key] = { month: key, income: 0, expense: 0, balance: 0 };
    const valueARS = toARS(item.amount, item.currency, exchangeRate);
    if (item.type === "income") months[key].income += valueARS;
    if (item.type === "expense") months[key].expense += valueARS;
    months[key].balance = months[key].income - months[key].expense;
  });

  return Object.values(months).sort((a, b) => a.month.localeCompare(b.month));
}

export function buildDiagnosis(summary, settings) {
  const fixedRate = summary.incomeARS ? (summary.byExpenseType.fixed / summary.incomeARS) * 100 : 0;
  let status = "ordenado";

  if (summary.balanceARS < 0 || fixedRate > 70) status = "critico";
  else if (summary.incomeARS && summary.balanceARS < summary.incomeARS * 0.1) status = "ajustado";

  const findings = [];
  if (summary.balanceARS < 0) findings.push("El saldo mensual quedo negativo.");
  else findings.push(`El saldo mensual es ${formatMoney(summary.balanceARS)}.`);

  if (fixedRate > 70) findings.push("Los gastos fijos superan el 70% de los ingresos.");
  else if (fixedRate >= 50) findings.push("Los gastos fijos estan en una zona ajustada.");
  else findings.push("Los gastos fijos estan por debajo del 50% de los ingresos.");

  if (summary.dominantCategory.shareOfExpenses > 35) {
    findings.push(`${summary.dominantCategory.name} concentra mas del 35% del gasto total.`);
  } else {
    findings.push("No hay una categoria que domine excesivamente el gasto.");
  }

  const recommendations = [];
  if (summary.balanceARS < 0) recommendations.push("Recortar gastos variables esta semana hasta recuperar saldo positivo.");
  if (fixedRate > 50) recommendations.push("Renegociar o revisar gastos fijos antes de sumar nuevos compromisos.");
  if (summary.dominantCategory.shareOfExpenses > 35) recommendations.push(`Auditar la categoria ${summary.dominantCategory.name} y fijar un tope mensual.`);
  recommendations.push("Separar una reserva apenas ingresen fondos.");
  recommendations.push("Registrar gastos extraordinarios para que no distorsionen el presupuesto base.");

  const priorityByStatus = {
    ordenado: settings.financialGoal === "invertir" ? "invertir excedentes con criterio" : "sostener el orden y aumentar ahorro",
    ajustado: "proteger saldo positivo y reducir fugas",
    critico: "recuperar equilibrio mensual"
  };

  return {
    status,
    findings: findings.slice(0, 3),
    recommendations: recommendations.slice(0, 3),
    priority: priorityByStatus[status]
  };
}

export function expenseTypeHealth(fixedIncomeRate) {
  if (fixedIncomeRate < 50) return { label: "saludable", tone: "text-cocoo" };
  if (fixedIncomeRate <= 70) return { label: "ajustado", tone: "text-amber-700" };
  return { label: "critico", tone: "text-red-700" };
}

export function expenseTypeRows(summary) {
  return Object.entries(summary.byExpenseType).map(([key, amountARS]) => ({
    key,
    label: expenseTypeLabels[key],
    amountARS,
    incomeRate: summary.incomeARS ? (amountARS / summary.incomeARS) * 100 : 0,
    expenseRate: summary.expenseARS ? (amountARS / summary.expenseARS) * 100 : 0
  }));
}
