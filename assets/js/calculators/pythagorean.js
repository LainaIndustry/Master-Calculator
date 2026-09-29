(function () {
  "use strict";
  function calc() {
    const a = parseFloat(document.getElementById("py-a")?.value || "");
    const b = parseFloat(document.getElementById("py-b")?.value || "");
    const c = parseFloat(document.getElementById("py-c")?.value || "");
    const box = document.getElementById("py-result");
    if (!box) return;
    const known = [a, b, c].filter(x => isFinite(x) && x > 0);
    if (known.length !== 2) { box.classList.remove("show"); return; }
    let A = isFinite(a) && a > 0 ? a : null;
    let B = isFinite(b) && b > 0 ? b : null;
    let C = isFinite(c) && c > 0 ? c : null;
    let solvedFor = "";
    if (A !== null && B !== null) { C = Math.sqrt(A * A + B * B); solvedFor = "hypotenuse c"; }
    else if (A !== null && C !== null) {
      if (C <= A) { box.classList.remove("show"); return; }
      B = Math.sqrt(C * C - A * A); solvedFor = "leg b";
    } else if (B !== null && C !== null) {
      if (C <= B) { box.classList.remove("show"); return; }
      A = Math.sqrt(C * C - B * B); solvedFor = "leg a";
    }
    const area = 0.5 * A * B;
    document.getElementById("py-main").textContent = `Solved for ${solvedFor}`;
    document.getElementById("py-detail").innerHTML =
      `<strong>Leg a:</strong> ${A.toLocaleString(undefined,{maximumFractionDigits:6})}<br>` +
      `<strong>Leg b:</strong> ${B.toLocaleString(undefined,{maximumFractionDigits:6})}<br>` +
      `<strong>Hypotenuse c:</strong> ${C.toLocaleString(undefined,{maximumFractionDigits:6})}<br>` +
      `<strong>Area:</strong> ${area.toLocaleString(undefined,{maximumFractionDigits:6})}<br>` +
      `<strong>Perimeter:</strong> ${(A+B+C).toLocaleString(undefined,{maximumFractionDigits:6})}<br><br>` +
      `<em>Formula: a² + b² = c²</em>`;
    box.classList.add("show");
  }
  function reset() {
    ["py-a","py-b","py-c"].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = "";
    });
    const box = document.getElementById("py-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["py-a","py-b","py-c"].forEach(id => {
      const el = document.getElementById(id); if (el) el.addEventListener("input", calc);
    });
    const b = document.getElementById("py-calc"); if (b) b.addEventListener("click", calc);
    const r = document.getElementById("py-reset"); if (r) r.addEventListener("click", reset);
  });
})();
