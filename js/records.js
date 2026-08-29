const state = {
  records: [],
  loading: true,
  error: null,
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
    loading.hidden = !state.loading;
    error.hidden = !state.error;
    empty.hidden = state.loading || Boolean(state.error) || state.records.length > 0;
    table.hidden = state.loading || Boolean(state.error) || state.records.length === 0;
    errorMessage.textContent = state.error ?? "";
    count.textContent = state.loading ? "Đang tải dữ liệu…" : `${state.records.length} học viên`;
    tbody.replaceChildren(...state.records.map((record) => buildRow(record, template)));
  }

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
