(function () {
  "use strict";
  function calc() {
    const unit = document.getElementById("bmr-unit")?.value || "metric";
    const age = parseFloat(document.getElementById("bmr-age")?.value || "");
    const sex = document.getElementById("bmr-sex")?.value || "male";
    const activity = parseFloat(document.getElementById("bmr-activity")?.value || "1.55");
    const formula = document.getElementById("bmr-formula")?.value || "mifflin";
    const box = document.getElementById("bmr-result");
    if (!age || age <= 0) { box.classList.remove("show"); return; }

    let weightKg, heightCm;
    if (unit === "metric") {
      weightKg = parseFloat(document.getElementById("bmr-kg")?.value || "");
      heightCm = parseFloat(document.getElementById("bmr-cm")?.value || "");
    } else {
      const lb = parseFloat(document.getElementById("bmr-lb")?.value || "");
      const inches = parseFloat(document.getElementById("bmr-in")?.value || "");
      weightKg = lb * 0.453592;
      heightCm = inches * 2.54;
    }
    if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) { box.classList.remove("show"); return; }

    let bmr;
    if (formula === "mifflin") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === "male" ? 5 : -161);
    } else { // Harris-Benedict revised
      if (sex === "male") bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
      else bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age;
    }
    const tdee = bmr * activity;

    document.getElementById("bmr-main").textContent = Math.round(bmr).toLocaleString() + " cal/day";
    document.getElementById("bmr-detail").innerHTML =
      `<strong>Formula:</strong> ${formula === "mifflin" ? "Mifflin-St Jeor" : "Harris-Benedict (revised)"}<br>` +
      `<strong>BMR:</strong> ${Math.round(bmr).toLocaleString()} calories/day (at rest)<br>` +
      `<strong>TDEE (×${activity}):</strong> ${Math.round(tdee).toLocaleString()} calories/day<br>` +
      `<strong>Weight loss target:</strong> ${Math.round(tdee - 500).toLocaleString()} cal/day (−500)<br>` +
      `<strong>Weight gain target:</strong> ${Math.round(tdee + 500).toLocaleString()} cal/day (+500)`;
    box.classList.add("show");
  }
  function toggleUnits() {
    const unit = document.getElementById("bmr-unit")?.value;
    document.getElementById("bmr-metric-fields").style.display = unit === "metric" ? "" : "none";
    document.getElementById("bmr-imperial-fields").style.display = unit === "metric" ? "none" : "";
  }
  function reset() {
    ["bmr-age","bmr-kg","bmr-cm","bmr-lb","bmr-in"].forEach(id => {
      const el = document.getElementById(id); if (el) { el.value = ""; el.classList.remove("error"); }
    });
    const box = document.getElementById("bmr-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    const u = document.getElementById("bmr-unit"); if (u) u.addEventListener("change", toggleUnits);
    ["bmr-age","bmr-kg","bmr-cm","bmr-lb","bmr-in","bmr-sex","bmr-activity","bmr-formula"].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); }
    });
    const b = document.getElementById("bmr-calc"); if (b) b.addEventListener("click", calc);
    const r = document.getElementById("bmr-reset"); if (r) r.addEventListener("click", reset);
  });
})();
