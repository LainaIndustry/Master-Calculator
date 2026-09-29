/* ============================================================
   COMPOUND INTEREST CALCULATOR
   A = P(1 + r/n)^(nt) + PMT * [((1+r/n)^(nt) - 1) / (r/n)]
   Includes optional monthly contributions.
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
    if (!isFinite(n)) return "—";
    return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
  }

  function calc() {
    const P = num("ci-principal", 0, true);
    const annualRate = num("ci-rate", -1, true);
    const years = num("ci-years", 0);
    const n = num("ci-compound", 1); // compounding periods per year
    const pmt = num("ci-contribution", 0, true); // monthly contribution
    const box = document.getElementById("ci-result");

    if (P === null || annualRate === null || years === null || n === null) {
      box.classList.remove("show"); return;
    }

    const r = annualRate / 100;
    const t = years;
    const periods = n * t;
    const ratePerPeriod = r / n;

    // Lump sum future value
    const fvLump = P * Math.pow(1 + ratePerPeriod, periods);

    // Monthly contributions grow at the periodic rate adjusted for monthly frequency
    let fvContrib = 0;
    if (pmt && pmt > 0) {
      const monthlyRate = r / 12;
      const months = Math.round(t * 12);
      if (monthlyRate === 0) {
        fvContrib = pmt * months;
      } else {
        fvContrib = pmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      }
    }

    const totalFV = fvLump + fvContrib;
    const totalContributions = (pmt || 0) * Math.round(t * 12);
    const totalInterest = totalFV - P - totalContributions;

    document.getElementById("ci-main").textContent = money(totalFV);
    document.getElementById("ci-detail").innerHTML =
      `<strong>Initial principal:</strong> ${money(P)}<br>` +
      `<strong>Total contributions:</strong> ${money(totalContributions)}<br>` +
      `<strong>Total interest earned:</strong> ${money(totalInterest)}<br>` +
      `<strong>Compounding:</strong> ${n}× per year over ${t} year${t === 1 ? "" : "s"}`;

    // Growth table — year by year
    const tbody = document.getElementById("ci-table-body");
    if (tbody) {
      let rows = "";
      for (let y = 0; y <= Math.floor(t); y++) {
        const yYears = y;
        const lumpFV = P * Math.pow(1 + ratePerPeriod, n * yYears);
        let contribFV = 0;
        if (pmt && pmt > 0) {
          const monthlyRate = r / 12;
          const months = yYears * 12;
          contribFV = monthlyRate === 0
            ? pmt * months
            : pmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        }
        const total = lumpFV + contribFV;
        const contributed = P + (pmt || 0) * yYears * 12;
        const interest = total - contributed;
        rows += `<tr>
          <td>${y}</td>
          <td>${money(contributed)}</td>
          <td>${money(interest)}</td>
          <td>${money(total)}</td>
        </tr>`;
      }
      tbody.innerHTML = rows;
    }

    box.classList.add("show");
  }

  function reset() {
    ["ci-principal", "ci-rate", "ci-years", "ci-compound", "ci-contribution"].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.value = ""; el.classList.remove("error"); }
    });
    const box = document.getElementById("ci-result");
    if (box) box.classList.remove("show");
    const tbody = document.getElementById("ci-table-body");
    if (tbody) tbody.innerHTML = "";
  }

  document.addEventListener("DOMContentLoaded", () => {
    ["ci-principal", "ci-rate", "ci-years", "ci-compound", "ci-contribution"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", calc);
    });
    const b = document.getElementById("ci-calc");
    if (b) b.addEventListener("click", calc);
    const r = document.getElementById("ci-reset");
    if (r) r.addEventListener("click", reset);
  });
})();
