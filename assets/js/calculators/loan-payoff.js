/* ============================================================
   MORTGAGE / LOAN PAYOFF CALCULATOR
   Shows how extra monthly payments shorten a loan term.
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
    const P = num("lp-amount");
    const rate = num("lp-rate", -1, true);
    const years = num("lp-years");
    const extra = parseFloat(document.getElementById("lp-extra")?.value || "0") || 0;
    const box = document.getElementById("lp-result");
    if (P === null || rate === null || years === null) { box.classList.remove("show"); return; }

    const n = Math.round(years * 12);
    const r = rate / 100 / 12;

    let M;
    if (r === 0) M = P / n;
    else { const pow = Math.pow(1 + r, n); M = P * (r * pow) / (pow - 1); }

    // Simulate with extra payments
    let balance = P;
    let months = 0;
    let totalInterest = 0;
    const maxMonths = 1200; // safety
    while (balance > 0.005 && months < maxMonths) {
      const interest = balance * r;
      let principal = (M + extra) - interest;
      if (principal > balance) principal = balance;
      balance -= principal;
      totalInterest += interest;
      months++;
    }

    const baselineTotalInterest = (M * n) - P;
    const interestSaved = baselineTotalInterest - totalInterest;
    const monthsSaved = n - months;

    document.getElementById("lp-main").textContent = money(M + extra) + " /month";
    document.getElementById("lp-detail").innerHTML =
      `<strong>Base payment:</strong> ${money(M)}<br>` +
      `<strong>Extra payment:</strong> ${money(extra)}<br>` +
      `<strong>Total monthly:</strong> ${money(M + extra)}<br>` +
      `<strong>Payoff time:</strong> ${Math.floor(months/12)} years, ${months%12} months (${months} payments)<br>` +
      `<strong>Total interest paid:</strong> ${money(totalInterest)}<br>` +
      `<strong>Interest saved vs baseline:</strong> ${money(interestSaved)}<br>` +
      `<strong>Time saved:</strong> ${Math.floor(monthsSaved/12)} years, ${monthsSaved%12} months`;
    box.classList.add("show");
  }
  function reset() {
    ["lp-amount","lp-rate","lp-years","lp-extra"].forEach(id => {
      const el = document.getElementById(id); if (el) { el.value = ""; el.classList.remove("error"); }
    });
    const box = document.getElementById("lp-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["lp-amount","lp-rate","lp-years","lp-extra"].forEach(id => {
      const el = document.getElementById(id); if (el) el.addEventListener("input", calc);
    });
    const b = document.getElementById("lp-calc"); if (b) b.addEventListener("click", calc);
    const r = document.getElementById("lp-reset"); if (r) r.addEventListener("click", reset);
  });
})();
