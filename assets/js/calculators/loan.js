/* ============================================================
   LOAN CALCULATOR
   Standard amortized loan: M = P * r(1+r)^n / ((1+r)^n - 1)
   ============================================================ */
(function () {
  "use strict";

  function num(id, min = -Infinity, allowZero = false) {
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
    if (!isFinite(n)) return "—";
    return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  }

  function calculate() {
    const P = num("loan-amount", 0, false);
    const annualRate = num("loan-rate", -1, true); // allow 0%
    const years = num("loan-years", 0, false);
    const box = document.getElementById("loan-result");

    if (P === null || annualRate === null || years === null) {
      box.classList.remove("show");
      return;
    }

    const n = Math.round(years * 12);
    const r = annualRate / 100 / 12;

    let M;
    if (r === 0) {
      M = P / n;
    } else {
      const pow = Math.pow(1 + r, n);
      M = P * (r * pow) / (pow - 1);
    }

    const totalPaid = M * n;
    const totalInterest = totalPaid - P;

    document.getElementById("loan-main").textContent = money(M);
    document.getElementById("loan-detail").innerHTML =
      `<strong>Loan amount:</strong> ${money(P)}<br>` +
      `<strong>Term:</strong> ${years} years (${n} months)<br>` +
      `<strong>Annual rate:</strong> ${annualRate}%<br>` +
      `<strong>Total payments:</strong> ${money(totalPaid)}<br>` +
      `<strong>Total interest:</strong> ${money(totalInterest)}`;

    // Amortization schedule (first 12 + last 12 rows if long)
    const tbody = document.getElementById("amort-body");
    if (tbody) {
      let balance = P;
      let rows = "";
      const maxRows = 360;
      const step = n > 60 ? Math.ceil(n / 60) : 1;
      for (let i = 1; i <= n && i <= maxRows; i++) {
        const interest = balance * r;
        const principal = M - interest;
        balance = Math.max(0, balance - principal);
        if (i === 1 || i === n || i % step === 0) {
          rows += `<tr>
            <td>${i}</td>
            <td>${money(M)}</td>
            <td>${money(principal)}</td>
            <td>${money(interest)}</td>
            <td>${money(balance)}</td>
          </tr>`;
        }
      }
      tbody.innerHTML = rows;
    }

    box.classList.add("show");
  }

  function reset() {
    ["loan-amount", "loan-rate", "loan-years"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) { el.value = ""; el.classList.remove("error"); }
    });
    const box = document.getElementById("loan-result");
    if (box) box.classList.remove("show");
    const tbody = document.getElementById("amort-body");
    if (tbody) tbody.innerHTML = "";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const calc = document.getElementById("loan-calc");
    const rst = document.getElementById("loan-reset");
    if (calc) calc.addEventListener("click", calculate);
    if (rst) rst.addEventListener("click", reset);
    ["loan-amount", "loan-rate", "loan-years"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", calculate);
    });
  });
})();
