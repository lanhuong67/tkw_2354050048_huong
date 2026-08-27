export function initNav() {
  const header = document.getElementById("site-header");
  const menu = document.getElementById("mobile-menu");
  const toggle = document.querySelector("[data-menu-toggle]");
  if (!header || !menu || !toggle) return;

  function setOpen(open) {
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    document.body.classList.toggle("overflow-hidden", open);
  }

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (toggle.getAttribute("aria-expanded") === "true" && !header.contains(event.target)) {
      setOpen(false);
    }
  });

  const desktop = window.matchMedia("(min-width: 64rem)");
  desktop.addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}

export function initHeaderOnScroll() {
  const header = document.getElementById("site-header");
  const sentinel = document.getElementById("nav-sentinel");
  if (!header || !sentinel) return;

  const observer = new IntersectionObserver(([entry]) => {
    header.classList.toggle("shadow-sm", !entry.isIntersecting);
  });

  observer.observe(sentinel);
}

export function initToTop() {
  const button = document.getElementById("to-top");
  if (!button) return;

  function updateVisibility() {
    button.classList.toggle("hidden", window.scrollY <= 400);
  }

  window.addEventListener("scroll", updateVisibility, { passive: true });
  button.addEventListener("click", () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  updateVisibility();
}
