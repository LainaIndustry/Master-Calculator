(function () {
  "use strict";
  function calc() {
    const startVal = document.getElementById("dc-start")?.value;
    const op = document.getElementById("dc-op")?.value || "add";
    const amount = Number(document.getElementById("dc-amount")?.value || 0);
    const unit = document.getElementById("dc-unit")?.value || "days";
    const box = document.getElementById("dc-result");
    if (!startVal) { box.classList.remove("show"); return; }
    const d = new Date(startVal + "T00:00:00");
    if (isNaN(d)) return;
    const sign = op === "subtract" ? -1 : 1;
    const n = sign * amount;
    const result = new Date(d);
    if (unit === "days") result.setDate(result.getDate() + n);
    else if (unit === "weeks") result.setDate(result.getDate() + n * 7);
    else if (unit === "months") result.setMonth(result.getMonth() + n);
    else if (unit === "years") result.setFullYear(result.getFullYear() + n);

    const fmt = result.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    document.getElementById("dc-main").textContent = fmt;
    const diffDays = Math.round((result - d) / 86400000);
    document.getElementById("dc-detail").innerHTML =
      `<strong>From:</strong> ${d.toLocaleDateString()}<br>` +
      `<strong>Change:</strong> ${op} ${amount} ${unit}<br>` +
      `<strong>Days difference:</strong> ${diffDays > 0 ? "+" : ""}${diffDays} day${Math.abs(diffDays) === 1 ? "" : "s"}`;
    box.classList.add("show");
  }
  function reset() {
    ["dc-start","dc-amount"].forEach(id => {
      const el = document.getElementById(id); if (el) { el.value = ""; el.classList.remove("error"); }
    });
    const box = document.getElementById("dc-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    const t = new Date().toISOString().slice(0,10);
    const s = document.getElementById("dc-start"); if (s && !s.value) s.value = t;
    ["dc-start","dc-amount","dc-op","dc-unit"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", calc);
      if (el) el.addEventListener("change", calc);
    });
    const b = document.getElementById("dc-calc"); if (b) b.addEventListener("click", calc);
    const r = document.getElementById("dc-reset"); if (r) r.addEventListener("click", reset);
  });
})();
