/* ============================================================
   SALARY CONVERTER
   Converts between hourly, weekly, biweekly, monthly, annual.
   Assumes 40 hrs/week, 52 weeks/year by default (adjustable).
   ============================================================ */
(function () {
  "use strict";
  function calc() {
    const amount = parseFloat(document.getElementById("sl-amount")?.value || "");
    const from = document.getElementById("sl-from")?.value || "year";
    const hours = parseFloat(document.getElementById("sl-hours")?.value || "40") || 40;
    const weeks = parseFloat(document.getElementById("sl-weeks")?.value || "52") || 52;
    const box = document.getElementById("sl-result");
    if (!box) return;
    if (!isFinite(amount) || amount < 0) { box.classList.remove("show"); return; }

    let hourly;
    if (from === "hour") hourly = amount;
    else if (from === "day") hourly = amount / 8;
    else if (from === "week") hourly = amount / hours;
    else if (from === "biweek") hourly = amount / (hours * 2);
    else if (from === "month") hourly = amount / ((hours * weeks) / 12);
    else hourly = amount / (hours * weeks);

    const money = n => n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
    const day = hourly * 8;
    const week = hourly * hours;
    const biweek = week * 2;
    const month = (hourly * hours * weeks) / 12;
    const year = hourly * hours * weeks;

    document.getElementById("sl-main").textContent = money(year) + " / year";
    document.getElementById("sl-detail").innerHTML =
      `<strong>Hourly:</strong> ${money(hourly)}<br>` +
      `<strong>Daily (8 hrs):</strong> ${money(day)}<br>` +
      `<strong>Weekly:</strong> ${money(week)}<br>` +
      `<strong>Bi-weekly:</strong> ${money(biweek)}<br>` +
      `<strong>Monthly:</strong> ${money(month)}<br>` +
      `<strong>Annual:</strong> ${money(year)}<br>` +
      `<em>Based on ${hours} hrs/week, ${weeks} weeks/year.</em>`;
    box.classList.add("show");
  }
  function reset() {
    ["sl-amount","sl-hours","sl-weeks"].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = "";
    });
    const box = document.getElementById("sl-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["sl-amount","sl-from","sl-hours","sl-weeks"].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); }
    });
    const b = document.getElementById("sl-calc"); if (b) b.addEventListener("click", calc);
    const r = document.getElementById("sl-reset"); if (r) r.addEventListener("click", reset);
  });
})();
