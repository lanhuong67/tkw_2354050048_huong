export function initSlider() {
  const root = document.querySelector("[data-slider]");
  if (!root) return;

  const track = root.querySelector("[data-slider-track]");
  const slides = [...root.querySelectorAll("[data-slide]")];
  const previous = root.querySelector("[data-slider-prev]");
  const next = root.querySelector("[data-slider-next]");
  const dotsRoot = root.querySelector("[data-slider-dots]");
  const status = root.querySelector("[data-slider-status]");
  if (!track || slides.length < 2 || !previous || !next || !dotsRoot) return;

  let index = 0;
  let timer;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dots = slides.map((_, slideIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "h-3 w-3 rounded-pill bg-line transition-colors";
    dot.setAttribute("aria-label", `Đi tới cảm nhận ${slideIndex + 1}`);
    dot.addEventListener("click", () => go(slideIndex, true));
    dotsRoot.append(dot);
    return dot;
  });

  function go(nextIndex, announce = false) {
    index = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.toggleAttribute("inert", !active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.classList.toggle("bg-brand-600", active);
      dot.classList.toggle("bg-line", !active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });
    if (status && announce) status.textContent = `Cảm nhận ${index + 1} trên ${slides.length}`;
  }

  function stop() {
    window.clearInterval(timer);
    timer = undefined;
  }

  function start() {
    stop();
    if (reducedMotion || document.hidden) return;
    timer = window.setInterval(() => go(index + 1), 5000);
  }

  previous.addEventListener("click", () => go(index - 1, true));
  next.addEventListener("click", () => go(index + 1, true));
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", (event) => {
    if (!root.contains(event.relatedTarget)) start();
  });
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());

  go(0);
  start();
}
