export function initFaq() {
  const root = document.getElementById("faq");
  if (!root) return;

  const triggers = [...root.querySelectorAll("[data-faq-trigger]")];
  if (!triggers.length) return;

  function setOpen(trigger, open) {
    const item = trigger.closest("details");
    if (!item) return;
    item.open = open;
    trigger.setAttribute("aria-expanded", String(open));
  }

  triggers.forEach((trigger) => setOpen(trigger, trigger.closest("details").open));

  root.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-faq-trigger]");
    if (!trigger || !root.contains(trigger)) return;

    event.preventDefault();
    const willOpen = trigger.getAttribute("aria-expanded") !== "true";
    triggers.forEach((item) => setOpen(item, false));
    if (willOpen) setOpen(trigger, true);
  });
}
