const dong = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export function initPricing() {
  const toggle = document.getElementById("pricing-toggle");
  if (!toggle) return;

  const prices = [...document.querySelectorAll("[data-price]")];
  const periods = [...document.querySelectorAll("[data-price-period]")];

  function updatePrices(yearly) {
    const key = yearly ? "yearly" : "monthly";
    prices.forEach((price) => {
      price.textContent = dong.format(Number(price.dataset[key]));
    });
    periods.forEach((period) => {
      period.textContent = yearly ? "/ năm" : "/ tháng";
    });
    toggle.setAttribute("aria-checked", String(yearly));
    toggle.setAttribute("aria-label", yearly ? "Hiển thị giá theo tháng" : "Hiển thị giá theo năm");
    toggle.firstElementChild?.classList.toggle("translate-x-5", yearly);
  }

  toggle.addEventListener("click", () => {
    updatePrices(toggle.getAttribute("aria-checked") !== "true");
  });

  updatePrices(false);
}
