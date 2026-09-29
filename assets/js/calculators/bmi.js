/* ============================================================
   BMI CALCULATOR
   BMI = weight(kg) / height(m)^2
   Also supports Imperial (lb, in) input.
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

  function classify(bmi) {
    if (bmi < 16) return { label: "Severely underweight", cls: "warn" };
    if (bmi < 18.5) return { label: "Underweight", cls: "warn" };
    if (bmi < 25) return { label: "Normal weight", cls: "" };
    if (bmi < 30) return { label: "Overweight", cls: "warn" };
    if (bmi < 35) return { label: "Obese (Class I)", cls: "danger" };
    if (bmi < 40) return { label: "Obese (Class II)", cls: "danger" };
    return { label: "Obese (Class III)", cls: "danger" };
  }

  function calc() {
    const unit = document.getElementById("bmi-unit")?.value || "metric";
    let kg, m;

    if (unit === "metric") {
      kg = num("bmi-weight-kg");
      const cm = num("bmi-height-cm");
      if (kg === null || cm === null) { hide(); return; }
      m = cm / 100;
    } else {
      const lb = num("bmi-weight-lb");
      const inches = num("bmi-height-in");
      if (lb === null || inches === null) { hide(); return; }
      kg = lb * 0.453592;
      m = inches * 0.0254;
    }

    const bmi = kg / (m * m);
    const cat = classify(bmi);

    const main = document.getElementById("bmi-main");
    const detail = document.getElementById("bmi-detail");
    const box = document.getElementById("bmi-result");
    if (!main || !box) return;

    main.textContent = bmi.toFixed(1);
    const detailHtml =
      `<strong>Category:</strong> <span class="text-${cat.cls === 'danger' ? 'danger' : cat.cls === 'warn' ? 'warning' : 'success'}">${cat.label}</span><br>` +
      `<strong>Weight:</strong> ${kg.toFixed(1)} kg (${(kg * 2.20462).toFixed(1)} lb)<br>` +
      `<strong>Height:</strong> ${(m * 100).toFixed(1)} cm (${(m / 0.0254).toFixed(1)} in)<br>` +
      `<strong>Healthy BMI range:</strong> 18.5 – 24.9<br>` +
      `<strong>Healthy weight for your height:</strong> ${(18.5 * m * m).toFixed(1)} – ${(24.9 * m * m).toFixed(1)} kg`;
    if (detail) detail.innerHTML = detailHtml;

    box.classList.add("show");
    box.classList.remove("warn", "danger");
    if (cat.cls) box.classList.add(cat.cls);
  }

  function hide() {
    const box = document.getElementById("bmi-result");
    if (box) box.classList.remove("show");
  }

  function reset() {
    ["bmi-weight-kg", "bmi-height-cm", "bmi-weight-lb", "bmi-height-in"].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.value = ""; el.classList.remove("error"); }
    });
    hide();
  }

  function toggleUnits() {
    const unit = document.getElementById("bmi-unit")?.value;
    const metric = document.getElementById("bmi-metric-fields");
    const imperial = document.getElementById("bmi-imperial-fields");
    if (!metric || !imperial) return;
    if (unit === "metric") {
      metric.style.display = ""; imperial.style.display = "none";
    } else {
      metric.style.display = "none"; imperial.style.display = "";
    }
    reset();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const sel = document.getElementById("bmi-unit");
    if (sel) sel.addEventListener("change", toggleUnits);
    ["bmi-weight-kg","bmi-height-cm","bmi-weight-lb","bmi-height-in"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", calc);
    });
    const btn = document.getElementById("bmi-calc");
    if (btn) btn.addEventListener("click", calc);
    const rst = document.getElementById("bmi-reset");
    if (rst) rst.addEventListener("click", reset);
  });
})();
