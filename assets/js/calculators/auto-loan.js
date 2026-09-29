/* ============================================================
   AUTO LOAN CALCULATOR
   Includes sales tax, trade-in, down payment, and term.
   ============================================================ */
(function () {
  "use strict";
  function num(id, min = 0, allowZero = false) {
    const el = document.getElementById(id);
    if (!el) return null;
    const raw = el.value.trim();
    el.classList.remove("error");
    if (raw === "") { el.classList.add("error"); return null; }
    const n = Number(raw);
    if (!isFinite(n) || (allowZero ? n < min : n <= min)) { el.classList.add("error"); return null; }
    return n;
  }
  function money(n) {
    return isFinite(n) ? n.toLocaleString(undefined, { style: "currency", currency: "USD" }) : "—";
  }
  function calc() {
    const price = num("al-price");
    const taxRate = parseFloat(document.getElementById("al-tax")?.value || "0") || 0;
    const tradeIn = parseFloat(document.getElementById("al-trade")?.value || "0") || 0;
    const down = parseFloat(document.getElementById("al-down")?.value || "0") || 0;
    const rate = num("al-rate", -1, true);
    const years = num("al-years", 0);
    const box = document.getElementById("al-result");
    if (price === null || rate === null || years === null) { box.classList.remove("show"); return; }

    const tax = price * taxRate / 100;
    const totalCost = price + tax - tradeIn - down;
    const P = Math.max(0, totalCost);
    const n = years * 12;
    const r = rate / 100 / 12;
    let M;
    if (r === 0) M = P / n;
    else { const pow = Math.pow(1 + r, n); M = P * (r * pow) / (pow - 1); }
    const totalPaid = M * n;
    const totalInterest = totalPaid - P;

    document.getElementById("al-main").textContent = money(M);
    document.getElementById("al-detail").innerHTML =
      `<strong>Vehicle price:</strong> ${money(price)}<br>` +
      `<strong>Sales tax:</strong> +${money(tax)}<br>` +
      `<strong>Trade-in:</strong> −${money(tradeIn)}<br>` +
      `<strong>Down payment:</strong> −${money(down)}<br>` +
      `<strong>Amount financed:</strong> ${money(P)}<br>` +
      `<strong>Term:</strong> ${years} years (${n} months) at ${rate}%<br>` +
      `<strong>Total payments:</strong> ${money(totalPaid)}<br>` +
      `<strong>Total interest:</strong> ${money(totalInterest)}`;
    box.classList.add("show");
  }
  function reset() {
    ["al-price","al-tax","al-trade","al-down","al-rate","al-years"].forEach(id => {
      const el = document.getElementById(id); if (el) { el.value = ""; el.classList.remove("error"); }
    });
    const box = document.getElementById("al-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["al-price","al-tax","al-trade","al-down","al-rate","al-years"].forEach(id => {
      const el = document.getElementById(id); if (el) el.addEventListener("input", calc);
    });
    const b = document.getElementById("al-calc"); if (b) b.addEventListener("click", calc);
    const r = document.getElementById("al-reset"); if (r) r.addEventListener("click", reset);
  });
})();
