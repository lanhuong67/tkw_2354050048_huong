export function initTheme() {
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;

  function updateToggle(dark) {
    toggle.setAttribute("aria-checked", String(dark));
    toggle.setAttribute("aria-label", dark ? "Tắt chế độ tối" : "Bật chế độ tối");
  }

  updateToggle(document.documentElement.classList.contains("dark"));

  toggle.addEventListener("click", () => {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
    updateToggle(dark);
  });
}
