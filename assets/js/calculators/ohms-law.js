/* ============================================================
   OHM'S LAW CALCULATOR
   Solves for V, I, R, or P from any two knowns.
   ============================================================ */
(function () {
  "use strict";
  function calc() {
    const v = parseFloat(document.getElementById("ol-v")?.value || "");
    const i = parseFloat(document.getElementById("ol-i")?.value || "");
    const r = parseFloat(document.getElementById("ol-r")?.value || "");
    const p = parseFloat(document.getElementById("ol-p")?.value || "");
    const box = document.getElementById("ol-result");
    if (!box) return;

    const known = [v, i, r, p].filter(x => isFinite(x) && x !== 0);
    if (known.length < 2) {
      box.classList.remove("show");
      return;
    }

    let V = isFinite(v) ? v : null;
    let I = isFinite(i) ? i : null;
    let R = isFinite(r) ? r : null;
    let P = isFinite(p) ? p : null;

    // Solve step by step from available pairs
    if (V !== null && I !== null) { R = V / I; P = V * I; }
    else if (V !== null && R !== null) { I = V / R; P = V * I; }
    else if (V !== null && P !== null) { I = P / V; R = V / I; }
    else if (I !== null && R !== null) { V = I * R; P = V * I; }
    else if (I !== null && P !== null) { V = P / I; R = V / I; }
    else if (R !== null && P !== null) { V = Math.sqrt(P * R); I = V / R; }

    const fmt = (n, unit) => isFinite(n) ? `${n.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${unit}` : "—";

    document.getElementById("ol-main").textContent = "Solved";
    document.getElementById("ol-detail").innerHTML =
      `<strong>Voltage (V):</strong> ${fmt(V, "V")}<br>` +
      `<strong>Current (I):</strong> ${fmt(I, "A")}<br>` +
      `<strong>Resistance (R):</strong> ${fmt(R, "Ω")}<br>` +
      `<strong>Power (P):</strong> ${fmt(P, "W")}<br><br>` +
      `<em>Formulas: V = IR, P = VI = I²R = V²/R</em>`;
    box.classList.add("show");
  }
  function reset() {
    ["ol-v","ol-i","ol-r","ol-p"].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = "";
    });
    const box = document.getElementById("ol-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["ol-v","ol-i","ol-r","ol-p"].forEach(id => {
      const el = document.getElementById(id); if (el) el.addEventListener("input", calc);
    });
    const b = document.getElementById("ol-calc"); if (b) b.addEventListener("click", calc);
    const r = document.getElementById("ol-reset"); if (r) r.addEventListener("click", reset);
  });
})();
