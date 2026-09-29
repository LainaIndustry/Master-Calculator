(function () {
  "use strict";
  function toMinutes(timeStr) {
    if (!timeStr) return null;
    const [h, m] = timeStr.split(":").map(Number);
    if (!isFinite(h) || !isFinite(m)) return null;
    return h * 60 + m;
  }
  function calc() {
    const start = toMinutes(document.getElementById("hr-start")?.value);
    const end = toMinutes(document.getElementById("hr-end")?.value);
    const breakMin = parseFloat(document.getElementById("hr-break")?.value || "0") || 0;
    const rate = parseFloat(document.getElementById("hr-rate")?.value || "0") || 0;
    const box = document.getElementById("hr-result");
    if (!box) return;
    if (start === null || end === null) { box.classList.remove("show"); return; }
    let minutes = end - start;
    if (minutes < 0) minutes += 24 * 60; // overnight shift
    minutes -= breakMin;
    if (minutes < 0) minutes = 0;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const decimalHours = minutes / 60;
    let payHtml = "";
    if (rate > 0) {
      const pay = decimalHours * rate;
      payHtml = `<br><strong>Pay:</strong> ${pay.toLocaleString(undefined, { style: "currency", currency: "USD" })}`;
    }
    document.getElementById("hr-main").textContent = `${hours}h ${mins}m`;
    document.getElementById("hr-detail").innerHTML =
      `<strong>Start:</strong> ${document.getElementById("hr-start").value}<br>` +
      `<strong>End:</strong> ${document.getElementById("hr-end").value}<br>` +
      `<strong>Break:</strong> ${breakMin} min<br>` +
      `<strong>Total minutes:</strong> ${minutes}<br>` +
      `<strong>Decimal hours:</strong> ${decimalHours.toFixed(2)}${payHtml}`;
    box.classList.add("show");
  }
  function reset() {
    ["hr-start","hr-end","hr-break","hr-rate"].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = "";
    });
    document.getElementById("hr-result")?.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["hr-start","hr-end","hr-break","hr-rate"].forEach(id => {
      const el = document.getElementById(id); if (el) el.addEventListener("input", calc);
    });
    document.getElementById("hr-calc")?.addEventListener("click", calc);
    document.getElementById("hr-reset")?.addEventListener("click", reset);
  });
})();
