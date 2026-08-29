const STORAGE_KEY = "skillup-records-v1";

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

function saveRecords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.records));
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
  const removeButton = row.querySelector("[data-remove]");
  removeButton.dataset.remove = record.id;
  removeButton.setAttribute("aria-label", `Xóa học viên ${record.trader}`);
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
  const addForm = root.querySelector("[data-add-form]");
  const toast = root.querySelector("[data-toast]");

  function announce(message) {
    toast.textContent = message;
    window.setTimeout(() => {
      if (toast.textContent === message) toast.textContent = "";
    }, 3500);
  }

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

  tbody.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove]");
    if (!button) return;
    state.records = state.records.filter((record) => record.id !== button.dataset.remove);
    saveRecords();
    render();
    announce("Đã xóa bản ghi.");
  });

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!addForm.reportValidity()) return;
    const formData = new FormData(addForm);
    const newRecord = {
      id: `LH-${Date.now().toString().slice(-9)}`,
      trader: formData.get("trader").trim(),
      category: formData.get("category"),
      status: formData.get("status"),
      weight: Number(formData.get("weight")),
      amount: Number(formData.get("amount")),
      date: new Date().toISOString().slice(0, 10),
    };
    state.records = [newRecord, ...state.records];
    saveRecords();
    addForm.reset();
    render();
    announce("Đã thêm học viên mới.");
  });

  root.querySelector("[data-restore]").addEventListener("click", async () => {
    state.loading = true;
    state.error = null;
    render();
    try {
      state.records = await loadRecords();
      saveRecords();
      announce("Đã khôi phục dữ liệu mẫu.");
    } catch (err) {
      state.error = `Không tải được dữ liệu: ${err.message}`;
    } finally {
      state.loading = false;
      render();
    }
  });

  async function start() {
    render();
    try {
      const savedRecords = localStorage.getItem(STORAGE_KEY);
      state.records = savedRecords ? JSON.parse(savedRecords) : await loadRecords();
      if (!savedRecords) saveRecords();
    } catch (err) {
      state.error = `Không tải được dữ liệu: ${err.message}`;
    } finally {
      state.loading = false;
      render();
    }
  }

  start();
}
