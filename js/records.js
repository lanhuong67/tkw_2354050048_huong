const state = {
  records: [],
  query: "",
  category: "all",
  status: "all",
  sort: "date-desc",
  loading: true,
  error: null,
};

const sorters = {
  "date-desc": (a, b) => b.date.localeCompare(a.date),
  "date-asc": (a, b) => a.date.localeCompare(b.date),
  "amount-desc": (a, b) => b.amount - a.amount,
  "amount-asc": (a, b) => a.amount - b.amount,
  "name-asc": (a, b) => a.trader.localeCompare(b.trader, "vi"),
};

const moneyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("vi-VN");

const statusLabels = {
  "moi-dang-ky": "Mới đăng ký",
  "dang-hoc": "Đang học",
  "da-hoan-thanh": "Đã hoàn thành",
};

function debounce(fn, delay = 300) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), delay);
  };
}

function visibleRecords() {
  const query = state.query.trim().toLocaleLowerCase("vi");
  return state.records
    .filter((record) => state.category === "all" || record.category === state.category)
    .filter((record) => state.status === "all" || record.status === state.status)
    .filter((record) => {
      if (!query) return true;
      return record.trader.toLocaleLowerCase("vi").includes(query)
        || record.id.toLocaleLowerCase("vi").includes(query);
    })
    .slice()
    .sort(sorters[state.sort]);
}

async function loadRecords() {
  const response = await fetch("./data/records.json");
  if (!response.ok) {
    throw new Error(`máy chủ trả về ${response.status}`);
  }
  return response.json();
}

function buildRow(record, template) {
  const row = template.content.firstElementChild.cloneNode(true);
  row.querySelector("[data-cell='id']").textContent = record.id;
  row.querySelector("[data-cell='trader']").textContent = record.trader;
  row.querySelector("[data-cell='category']").textContent = record.category;
  row.querySelector("[data-cell='status']").textContent = statusLabels[record.status] ?? record.status;
  row.querySelector("[data-cell='weight']").textContent = `${record.weight} bài`;
  row.querySelector("[data-cell='amount']").textContent = moneyFormatter.format(record.amount);
  row.querySelector("[data-cell='date']").textContent = dateFormatter.format(new Date(`${record.date}T00:00:00`));
  return row;
}

export function initRecords() {
  const root = document.querySelector("[data-records-app]");
  if (!root) return;

  const tbody = root.querySelector("[data-records-body]");
  const template = document.getElementById("record-row-template");
  const loading = root.querySelector("[data-state='loading']");
  const empty = root.querySelector("[data-state='empty']");
  const error = root.querySelector("[data-state='error']");
  const table = root.querySelector("[data-state='table']");
  const count = root.querySelector("[data-record-count]");
  const errorMessage = root.querySelector("[data-error-message]");

  function render() {
    const records = state.loading || state.error ? [] : visibleRecords();
    loading.hidden = !state.loading;
    error.hidden = !state.error;
    empty.hidden = state.loading || Boolean(state.error) || records.length > 0;
    table.hidden = state.loading || Boolean(state.error) || records.length === 0;
    errorMessage.textContent = state.error ?? "";
    count.textContent = state.loading ? "Đang tải dữ liệu…" : `${records.length} / ${state.records.length} học viên`;
    tbody.replaceChildren(...records.map((record) => buildRow(record, template)));
  }

  root.querySelector("[data-query]").addEventListener("input", debounce((event) => {
    state.query = event.target.value;
    render();
  }));

  root.querySelector("[data-category]").addEventListener("change", (event) => {
    state.category = event.target.value;
    render();
  });

  root.querySelector("[data-status]").addEventListener("change", (event) => {
    state.status = event.target.value;
    render();
  });

  root.querySelector("[data-sort]").addEventListener("change", (event) => {
    state.sort = event.target.value;
    render();
  });

  async function start() {
    render();
    try {
      state.records = await loadRecords();
    } catch (err) {
      state.error = `Không tải được dữ liệu: ${err.message}`;
    } finally {
      state.loading = false;
      render();
    }
  }

  start();
}
