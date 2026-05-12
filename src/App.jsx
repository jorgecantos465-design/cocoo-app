import { useMemo, useState } from "react";
import {
  defaultCategories,
  defaultSettings,
  expenseTypeLabels,
  expenseTypes,
  goals,
  incomeTypes,
  seedTransactions
} from "./data";
import {
  buildDiagnosis,
  calculateSummary,
  expenseTypeHealth,
  expenseTypeRows,
  formatMoney,
  monthlyComparison,
  percent
} from "./utils/finance";

const navItems = [
  { id: "dashboard", label: "Inicio" },
  { id: "settings", label: "Mes" },
  { id: "income", label: "Ingresos" },
  { id: "expenses", label: "Gastos" },
  { id: "categories", label: "Categorias" },
  { id: "analysis", label: "Analisis" },
  { id: "charts", label: "Graficos" },
  { id: "diagnosis", label: "Diagnostico" }
];

function useLocalState(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  const update = (nextValue) => {
    const resolved = typeof nextValue === "function" ? nextValue(value) : nextValue;
    setValue(resolved);
    localStorage.setItem(key, JSON.stringify(resolved));
  };

  return [value, update];
}

function App() {
  const [active, setActive] = useState("dashboard");
  const [settings, setSettings] = useLocalState("cocoo-settings", defaultSettings);
  const [transactions, setTransactions] = useLocalState("cocoo-transactions", seedTransactions);
  const [categories, setCategories] = useLocalState("cocoo-categories", defaultCategories);

  const summary = useMemo(() => calculateSummary(transactions, settings), [transactions, settings]);
  const months = useMemo(() => monthlyComparison(transactions, settings), [transactions, settings]);
  const diagnosis = useMemo(() => buildDiagnosis(summary, settings), [summary, settings]);

  const addTransaction = (transaction) => {
    setTransactions((items) => [{ ...transaction, id: crypto.randomUUID() }, ...items]);
  };

  const addCategory = (name) => {
    const cleanName = name.trim().toLowerCase();
    if (!cleanName || categories.some((item) => item.name === cleanName)) return;
    setCategories((items) => [...items, { id: crypto.randomUUID(), name: cleanName }]);
  };

  const currentPage = {
    dashboard: <Dashboard summary={summary} settings={settings} />,
    settings: <SettingsPanel settings={settings} setSettings={setSettings} />,
    income: <IncomeForm addTransaction={addTransaction} settings={settings} />,
    expenses: <ExpenseForm addTransaction={addTransaction} categories={categories} settings={settings} />,
    categories: <CategoriesPanel categories={categories} addCategory={addCategory} />,
    analysis: <ExpenseAnalysis summary={summary} />,
    charts: <Charts summary={summary} months={months} />,
    diagnosis: <Diagnosis diagnosis={diagnosis} summary={summary} />
  }[active];

  return (
    <div className="min-h-screen bg-sand text-ink">
      <header className="border-b border-black/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cocoo">Cocoo</p>
            <h1 className="text-2xl font-semibold">Claridad financiera personal</h1>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`nav-button ${active === item.id ? "nav-button-active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">{currentPage}</main>
    </div>
  );
}

function Dashboard({ summary, settings }) {
  const cards = [
    { label: "Ingresos del mes", value: formatMoney(summary.incomeARS), sub: `${formatMoney(summary.incomeUSD, "USD")} eq.` },
    { label: "Gastos del mes", value: formatMoney(summary.expenseARS), sub: `${formatMoney(summary.expenseUSD, "USD")} eq.` },
    { label: "Saldo mensual", value: formatMoney(summary.balanceARS), sub: `${formatMoney(summary.balanceUSD, "USD")} eq.` },
    { label: "Ahorro", value: percent(summary.savingRate), sub: "sobre ingresos" },
    { label: "Gastos fijos", value: percent(summary.fixedIncomeRate), sub: "sobre ingresos" },
    { label: "Gastos variables", value: percent(summary.variableIncomeRate), sub: "sobre ingresos" },
    { label: "Categoria dominante", value: summary.dominantCategory.name, sub: percent(summary.dominantCategory.shareOfExpenses) },
    { label: "Moneda principal", value: settings.mainCurrency, sub: `USD ${settings.exchangeRate} ARS` }
  ];

  return (
    <section className="space-y-6">
      <SectionTitle title="Dashboard" detail={`Mes analizado: ${settings.selectedMonth}`} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <MetricCard key={card.label} {...card} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Resumen ARS / USD">
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniStat label="Ingresos" ars={summary.incomeARS} usd={summary.incomeUSD} />
            <MiniStat label="Gastos" ars={summary.expenseARS} usd={summary.expenseUSD} />
            <MiniStat label="Saldo" ars={summary.balanceARS} usd={summary.balanceUSD} />
          </div>
        </Panel>
        <Panel title="Lectura rapida">
          <p className="text-sm leading-6 text-black/70">
            El objetivo del mes es <strong>{settings.financialGoal}</strong>. La categoria con mayor peso es{" "}
            <strong>{summary.dominantCategory.name}</strong> y los gastos fijos representan{" "}
            <strong>{percent(summary.fixedIncomeRate)}</strong> de los ingresos.
          </p>
        </Panel>
      </div>
    </section>
  );
}

function SettingsPanel({ settings, setSettings }) {
  const update = (field, value) => setSettings({ ...settings, [field]: value });

  return (
    <section className="space-y-6">
      <SectionTitle title="Configuracion del mes" detail="Ajusta la base de analisis." />
      <Panel title="Parametros">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Mes de analisis">
            <input className="input" type="month" value={settings.selectedMonth} onChange={(event) => update("selectedMonth", event.target.value)} />
          </Field>
          <Field label="Tipo de cambio USD/ARS">
            <input className="input" type="number" min="1" value={settings.exchangeRate} onChange={(event) => update("exchangeRate", Number(event.target.value))} />
          </Field>
          <Field label="Moneda principal">
            <select className="input" value={settings.mainCurrency} onChange={(event) => update("mainCurrency", event.target.value)}>
              <option value="ARS">ARS</option>
              <option value="USD">USD</option>
            </select>
          </Field>
          <Field label="Objetivo financiero">
            <select className="input" value={settings.financialGoal} onChange={(event) => update("financialGoal", event.target.value)}>
              {goals.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Panel>
    </section>
  );
}

function IncomeForm({ addTransaction, settings }) {
  const [form, setForm] = useState({
    date: `${settings.selectedMonth}-10`,
    description: "",
    amount: "",
    currency: "ARS",
    incomeType: "sueldo"
  });

  const submit = (event) => {
    event.preventDefault();
    if (!form.description || !form.amount) return;
    addTransaction({ ...form, type: "income", amount: Number(form.amount) });
    setForm({ ...form, description: "", amount: "" });
  };

  return (
    <FormPanel title="Carga de ingresos" onSubmit={submit}>
      <TransactionFields form={form} setForm={setForm} />
      <Field label="Tipo de ingreso">
        <select className="input" value={form.incomeType} onChange={(event) => setForm({ ...form, incomeType: event.target.value })}>
          {incomeTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>
    </FormPanel>
  );
}

function ExpenseForm({ addTransaction, categories, settings }) {
  const [form, setForm] = useState({
    date: `${settings.selectedMonth}-10`,
    description: "",
    amount: "",
    currency: "ARS",
    category: categories[0]?.name || "otros",
    expenseType: "variable"
  });

  const submit = (event) => {
    event.preventDefault();
    if (!form.description || !form.amount) return;
    addTransaction({ ...form, type: "expense", amount: Number(form.amount) });
    setForm({ ...form, description: "", amount: "" });
  };

  return (
    <FormPanel title="Carga de gastos" onSubmit={submit}>
      <TransactionFields form={form} setForm={setForm} />
      <Field label="Categoria">
        <select className="input" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Tipo de gasto">
        <select className="input" value={form.expenseType} onChange={(event) => setForm({ ...form, expenseType: event.target.value })}>
          {expenseTypes.map((type) => (
            <option key={type} value={type}>
              {expenseTypeLabels[type]}
            </option>
          ))}
        </select>
      </Field>
    </FormPanel>
  );
}

function CategoriesPanel({ categories, addCategory }) {
  const [name, setName] = useState("");

  const submit = (event) => {
    event.preventDefault();
    addCategory(name);
    setName("");
  };

  return (
    <section className="space-y-6">
      <SectionTitle title="Categorias de gastos" detail="Administra la clasificacion del presupuesto." />
      <Panel title="Categorias actuales">
        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span className="rounded-full border border-cocoo/20 bg-mint px-3 py-1 text-sm text-cocoo" key={category.id}>
              {category.name}
            </span>
          ))}
        </div>
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={submit}>
          <input className="input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nueva categoria" />
          <button className="primary-button" type="submit">
            Agregar
          </button>
        </form>
      </Panel>
    </section>
  );
}

function ExpenseAnalysis({ summary }) {
  const rows = expenseTypeRows(summary);
  const fixedHealth = expenseTypeHealth(summary.fixedIncomeRate);

  return (
    <section className="space-y-6">
      <SectionTitle title="Analisis de gastos" detail="Peso de gastos fijos, variables y extraordinarios." />
      <div className="grid gap-4 lg:grid-cols-3">
        {rows.map((row) => (
          <MetricCard
            key={row.key}
            label={`Gasto ${row.label}`}
            value={formatMoney(row.amountARS)}
            sub={`${percent(row.incomeRate)} de ingresos / ${percent(row.expenseRate)} de gastos`}
          />
        ))}
      </div>
      <Panel title="Umbral de gastos fijos">
        <p className="text-sm leading-6 text-black/70">
          Estado: <strong className={fixedHealth.tone}>{fixedHealth.label}</strong>. Menos de 50% es saludable, entre 50% y 70% es ajustado, y mas de 70% es critico.
        </p>
      </Panel>
    </section>
  );
}

function Charts({ summary, months }) {
  const categoryData = Object.entries(summary.byCategory).map(([label, value]) => ({ label, value }));
  const typeData = expenseTypeRows(summary).map((row) => ({ label: row.label, value: row.amountARS }));

  return (
    <section className="space-y-6">
      <SectionTitle title="Graficos mensuales" detail="Visualizaciones simples para comparar meses." />
      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Ingresos vs gastos por mes">
          <BarChart data={months} keys={["income", "expense"]} />
        </Panel>
        <Panel title="Saldo mensual por mes">
          <BarChart data={months} keys={["balance"]} />
        </Panel>
        <Panel title="Gastos por categoria">
          <HorizontalBars data={categoryData} />
        </Panel>
        <Panel title="Gastos por tipo">
          <HorizontalBars data={typeData} />
        </Panel>
      </div>
    </section>
  );
}

function Diagnosis({ diagnosis, summary }) {
  return (
    <section className="space-y-6">
      <SectionTitle title="Diagnostico Cocoo" detail="Lectura automatica basada en tus datos." />
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Panel title="Estado general">
          <div className={`status-pill status-${diagnosis.status}`}>{diagnosis.status}</div>
          <p className="mt-4 text-sm leading-6 text-black/70">
            Prioridad financiera del mes: <strong>{diagnosis.priority}</strong>.
          </p>
          <p className="mt-2 text-sm text-black/60">Saldo actual: {formatMoney(summary.balanceARS)}.</p>
        </Panel>
        <Panel title="Hallazgos y recomendaciones">
          <div className="grid gap-5 md:grid-cols-2">
            <ListBlock title="3 hallazgos principales" items={diagnosis.findings} />
            <ListBlock title="3 recomendaciones practicas" items={diagnosis.recommendations} />
          </div>
        </Panel>
      </div>
    </section>
  );
}

function TransactionFields({ form, setForm }) {
  return (
    <>
      <Field label="Fecha">
        <input className="input" type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
      </Field>
      <Field label="Concepto">
        <input className="input" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Ej: sueldo, alquiler, supermercado" />
      </Field>
      <Field label="Monto">
        <input className="input" type="number" min="0" step="0.01" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} />
      </Field>
      <Field label="Moneda">
        <select className="input" value={form.currency} onChange={(event) => setForm({ ...form, currency: event.target.value })}>
          <option value="ARS">ARS</option>
          <option value="USD">USD</option>
        </select>
      </Field>
    </>
  );
}

function FormPanel({ title, children, onSubmit }) {
  return (
    <section className="space-y-6">
      <SectionTitle title={title} detail="Los movimientos se guardan localmente en este navegador." />
      <Panel title="Nuevo movimiento">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
          {children}
          <div className="md:col-span-2">
            <button className="primary-button" type="submit">
              Guardar movimiento
            </button>
          </div>
        </form>
      </Panel>
    </section>
  );
}

function MetricCard({ label, value, sub }) {
  return (
    <article className="rounded-lg border border-black/10 bg-white p-4 shadow-soft">
      <p className="text-sm text-black/60">{label}</p>
      <p className="mt-2 break-words text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-black/50">{sub}</p>
    </article>
  );
}

function MiniStat({ label, ars, usd }) {
  return (
    <div className="rounded-lg bg-sand p-4">
      <p className="text-sm text-black/60">{label}</p>
      <p className="mt-2 font-semibold">{formatMoney(ars)}</p>
      <p className="text-sm text-black/50">{formatMoney(usd, "USD")}</p>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function SectionTitle({ title, detail }) {
  return (
    <div>
      <h2 className="text-3xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-black/60">{detail}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-black/70">{label}</span>
      {children}
    </label>
  );
}

function ListBlock({ title, items }) {
  return (
    <div>
      <h3 className="mb-3 font-semibold">{title}</h3>
      <ol className="space-y-2">
        {items.map((item) => (
          <li className="rounded-lg bg-sand p-3 text-sm text-black/75" key={item}>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}

function BarChart({ data, keys }) {
  const max = Math.max(...data.flatMap((item) => keys.map((key) => Math.abs(item[key]))), 1);

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.month}>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">{item.month}</span>
            <span className="text-black/50">{formatMoney(item.balance)}</span>
          </div>
          <div className="grid gap-2">
            {keys.map((key) => (
              <div className="flex items-center gap-3" key={key}>
                <span className="w-16 text-xs uppercase text-black/50">{key}</span>
                <div className="h-3 flex-1 rounded-full bg-black/10">
                  <div className={`h-3 rounded-full ${key === "expense" ? "bg-clay" : key === "balance" ? "bg-leaf" : "bg-cocoo"}`} style={{ width: `${Math.max((Math.abs(item[key]) / max) * 100, 4)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function HorizontalBars({ data }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  if (!data.length) return <p className="text-sm text-black/60">Todavia no hay datos para graficar.</p>;

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between gap-3 text-sm">
            <span className="font-medium">{item.label}</span>
            <span className="text-black/50">{formatMoney(item.value)}</span>
          </div>
          <div className="h-3 rounded-full bg-black/10">
            <div className="h-3 rounded-full bg-cocoo" style={{ width: `${Math.max((item.value / max) * 100, 4)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
