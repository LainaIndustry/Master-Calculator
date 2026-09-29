(function () {
  "use strict";
  function calc() {
    const raw = document.getElementById("sd-input")?.value || "";
    const type = document.getElementById("sd-type")?.value || "sample";
    const box = document.getElementById("sd-result");
    if (!box) return;
    const nums = raw.split(/[\s,]+/).map(s => parseFloat(s)).filter(n => isFinite(n));
    if (nums.length < 2) {
      document.getElementById("sd-main").textContent = "Enter at least 2 numbers";
      box.classList.add("show"); return;
    }
    const n = nums.length;
    const mean = nums.reduce((a, b) => a + b, 0) / n;
    const sqDiffs = nums.map(x => (x - mean) ** 2);
    const variance = type === "population"
      ? sqDiffs.reduce((a, b) => a + b, 0) / n
      : sqDiffs.reduce((a, b) => a + b, 0) / (n - 1);
    const sd = Math.sqrt(variance);

    document.getElementById("sd-main").textContent = sd.toLocaleString(undefined, { maximumFractionDigits: 6 });
    document.getElementById("sd-detail").innerHTML =
      `<strong>Count (n):</strong> ${n}<br>` +
      `<strong>Mean:</strong> ${mean.toLocaleString(undefined, { maximumFractionDigits: 6 })}<br>` +
      `<strong>Variance:</strong> ${variance.toLocaleString(undefined, { maximumFractionDigits: 6 })}<br>` +
      `<strong>Standard deviation (${type}):</strong> ${sd.toLocaleString(undefined, { maximumFractionDigits: 6 })}<br>` +
      `<strong>Sum:</strong> ${nums.reduce((a,b)=>a+b,0)}<br>` +
      `<strong>Min / Max:</strong> ${Math.min(...nums)} / ${Math.max(...nums)}`;
    box.classList.add("show");
  }
  function reset() {
    const el = document.getElementById("sd-input"); if (el) el.value = "";
    const box = document.getElementById("sd-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    const i = document.getElementById("sd-input"); if (i) i.addEventListener("input", calc);
    const t = document.getElementById("sd-type"); if (t) t.addEventListener("change", calc);
    const b = document.getElementById("sd-calc"); if (b) b.addEventListener("click", calc);
    const r = document.getElementById("sd-reset"); if (r) r.addEventListener("click", reset);
  });
})();
