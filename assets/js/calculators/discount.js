(function () {
  "use strict";
  function calc() {
    const price = parseFloat(document.getElementById("di-price")?.value || "");
    const discount = parseFloat(document.getElementById("di-discount")?.value || "");
    const box = document.getElementById("di-result");
    if (!box) return;
    if (!isFinite(price) || price < 0 || !isFinite(discount)) { box.classList.remove("show"); return; }
    const savings = price * discount / 100;
    const finalPrice = price - savings;
    const money = n => n.toLocaleString(undefined, { style: "currency", currency: "USD" });
    document.getElementById("di-main").textContent = money(finalPrice);
    document.getElementById("di-detail").innerHTML =
      `<strong>Original price:</strong> ${money(price)}<br>` +
      `<strong>Discount:</strong> ${discount}%<br>` +
      `<strong>Savings:</strong> ${money(savings)}<br>` +
      `<strong>Final price:</strong> <strong>${money(finalPrice)}</strong>`;
    box.classList.add("show");
  }
  function reset() {
    ["di-price","di-discount"].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = "";
    });
    const box = document.getElementById("di-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["di-price","di-discount"].forEach(id => {
      const el = document.getElementById(id); if (el) el.addEventListener("input", calc);
    });
    const b = document.getElementById("di-calc"); if (b) b.addEventListener("click", calc);
    const r = document.getElementById("di-reset"); if (r) r.addEventListener("click", reset);
  });
})();
