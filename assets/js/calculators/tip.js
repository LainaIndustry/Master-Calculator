(function () {
  "use strict";
  function calc() {
    const bill = parseFloat(document.getElementById("tp-bill")?.value || "");
    const tipPct = parseFloat(document.getElementById("tp-pct")?.value || "");
    const people = parseFloat(document.getElementById("tp-people")?.value || "1") || 1;
    const taxPct = parseFloat(document.getElementById("tp-tax")?.value || "0") || 0;
    const box = document.getElementById("tp-result");
    if (!box) return;
    if (!isFinite(bill) || bill <= 0) { box.classList.remove("show"); return; }

    const tax = bill * taxPct / 100;
    const subtotal = bill - tax;
    const tip = subtotal * tipPct / 100;
    const total = bill + tip;
    const perPerson = total / people;

    document.getElementById("tp-main").textContent = total.toLocaleString(undefined, { style: "currency", currency: "USD" });
    document.getElementById("tp-detail").innerHTML =
      `<strong>Bill (with tax):</strong> ${bill.toLocaleString(undefined, { style: "currency", currency: "USD" })}<br>` +
      `<strong>Tax portion:</strong> ${tax.toLocaleString(undefined, { style: "currency", currency: "USD" })}<br>` +
      `<strong>Subtotal:</strong> ${subtotal.toLocaleString(undefined, { style: "currency", currency: "USD" })}<br>` +
      `<strong>Tip (${tipPct}%):</strong> ${tip.toLocaleString(undefined, { style: "currency", currency: "USD" })}<br>` +
      `<strong>Total:</strong> ${total.toLocaleString(undefined, { style: "currency", currency: "USD" })}<br>` +
      `<strong>Per person (${people}):</strong> ${perPerson.toLocaleString(undefined, { style: "currency", currency: "USD" })}`;
    box.classList.add("show");
  }
  function reset() {
    ["tp-bill","tp-pct","tp-people","tp-tax"].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = "";
    });
    const box = document.getElementById("tp-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["tp-bill","tp-pct","tp-people","tp-tax"].forEach(id => {
      const el = document.getElementById(id); if (el) el.addEventListener("input", calc);
    });
    const b = document.getElementById("tp-calc"); if (b) b.addEventListener("click", calc);
    const r = document.getElementById("tp-reset"); if (r) r.addEventListener("click", reset);
  });
})();
