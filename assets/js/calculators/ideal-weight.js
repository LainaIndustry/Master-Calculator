(function () {
  "use strict";
  function calc() {
    const unit = document.getElementById("iw-unit")?.value || "metric";
    const sex = document.getElementById("iw-sex")?.value || "male";
    let heightCm;
    if (unit === "metric") {
      heightCm = parseFloat(document.getElementById("iw-cm")?.value || "");
    } else {
      const ft = parseFloat(document.getElementById("iw-ft")?.value || "0");
      const inch = parseFloat(document.getElementById("iw-in")?.value || "0");
      heightCm = (ft * 12 + inch) * 2.54;
    }
    const box = document.getElementById("iw-result");
    if (!box) return;
    if (!isFinite(heightCm) || heightCm < 150 || heightCm > 220) {
      box.classList.remove("show"); return;
    }
    const inches = heightCm / 2.54;
    const over5ft = Math.max(0, inches - 60);

    let devine, robinson, miller, hamwi;
    if (sex === "male") {
      devine = 50 + 2.3 * over5ft;
      robinson = 52 + 1.9 * over5ft;
      miller = 56.2 + 1.41 * over5ft;
      hamwi = 48 + 2.7 * over5ft;
    } else {
      devine = 45.5 + 2.3 * over5ft;
      robinson = 49 + 1.7 * over5ft;
      miller = 53.1 + 1.36 * over5ft;
      hamwi = 45.5 + 2.2 * over5ft;
    }
    const avg = (devine + robinson + miller + hamwi) / 4;
    const minHealthy = 18.5 * Math.pow(heightCm/100, 2);
    const maxHealthy = 24.9 * Math.pow(heightCm/100, 2);

    document.getElementById("iw-main").textContent = avg.toFixed(1) + " kg (" + (avg * 2.20462).toFixed(1) + " lb)";
    document.getElementById("iw-detail").innerHTML =
      `<strong>Average of 4 formulas:</strong> ${avg.toFixed(1)} kg<br>` +
      `<strong>Devine:</strong> ${devine.toFixed(1)} kg<br>` +
      `<strong>Robinson:</strong> ${robinson.toFixed(1)} kg<br>` +
      `<strong>Miller:</strong> ${miller.toFixed(1)} kg<br>` +
      `<strong>Hamwi:</strong> ${hamwi.toFixed(1)} kg<br>` +
      `<strong>Healthy BMI weight range:</strong> ${minHealthy.toFixed(1)} – ${maxHealthy.toFixed(1)} kg`;
    box.classList.add("show");
  }
  function toggleUnits() {
    const unit = document.getElementById("iw-unit")?.value;
    document.getElementById("iw-metric-fields").style.display = unit === "metric" ? "" : "none";
    document.getElementById("iw-imperial-fields").style.display = unit === "metric" ? "none" : "";
  }
  function reset() {
    ["iw-cm","iw-ft","iw-in"].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = "";
    });
    document.getElementById("iw-result")?.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("iw-unit")?.addEventListener("change", toggleUnits);
    ["iw-cm","iw-ft","iw-in","iw-sex"].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); }
    });
    document.getElementById("iw-calc")?.addEventListener("click", calc);
    document.getElementById("iw-reset")?.addEventListener("click", reset);
  });
})();
