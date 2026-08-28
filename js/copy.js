export function initCopyCode() {
  const button = document.querySelector("[data-copy-code]");
  const status = document.querySelector("[data-copy-status]");
  if (!button || !status) return;

  let resetTimer;

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copyCode);
      status.textContent = "Đã sao chép mã khuyến mãi.";
      button.textContent = "Đã sao chép";
    } catch {
      status.textContent = "Không thể sao chép tự động. Hãy chọn mã và sao chép thủ công.";
      return;
    }

    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      button.textContent = "Sao chép mã";
      status.textContent = "";
    }, 3000);
  });
}
