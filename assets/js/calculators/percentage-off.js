(function () {
  "use strict";
  function num(id, min = 0) {
    const el = document.getElementById(id);
    if (!el) return null;
    const raw = el.value.trim();
    el.classList.remove("error");
    if (raw === "") { el.classList.add("error"); return null; }
    const n = Number(raw);
    if (!isFinite(n) || n < min) { el.classList.add("error"); return null; }
    return n;
  }
  function money(n) {
    return isFinite(n) ? n.toLocaleString(undefined, { style: "currency", currency: "USD" }) : "—";
  }
  function calc() {
    const price = num("po-price");
    const discount = num("po-discount", -100); // allow negative (surcharge)
    const taxRate = parseFloat(document.getElementById("po-tax")?.value) || 0;
    const box = document.getElementById("po-result");
    if (price === null || discount === null) { box.classList.remove("show"); return; }
    const savings = price * discount / 100;
    const subtotal = price - savings;
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;
    document.getElementById("po-main").textContent = money(total);
    document.getElementById("po-detail").innerHTML =
      `<strong>Original price:</strong> ${money(price)}<br>` +
      `<strong>Discount (${discount}%):</strong> −${money(savings)}<br>` +
      `<strong>Subtotal:</strong> ${money(subtotal)}<br>` +
      `<strong>Tax (${taxRate}%):</strong> +${money(tax)}<br>` +
      `<strong>Final price:</strong> <strong>${money(total)}</strong>`;
    box.classList.add("show");
  }
  function reset() {
    ["po-price","po-discount","po-tax"].forEach(id => {
      const el = document.getElementById(id); if (el) { el.value = ""; el.classList.remove("error"); }
    });
    const box = document.getElementById("po-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["po-price","po-discount","po-tax"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", calc);
    });
    const b = document.getElementById("po-calc"); if (b) b.addEventListener("click", calc);
    const r = document.getElementById("po-reset"); if (r) r.addEventListener("click", reset);
  });
})();
