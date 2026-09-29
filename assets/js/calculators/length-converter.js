(function () {
  "use strict";
  // All factors → meters (base unit)
  const TO_M = {
    mm: 0.001, cm: 0.01, m: 1, km: 1000,
    in: 0.0254, ft: 0.3048, yd: 0.9144,
    mi: 1609.344, nmi: 1852
  };
  function convert() {
    const from = document.getElementById("lc-from")?.value;
    const to = document.getElementById("lc-to")?.value;
    const inputEl = document.getElementById("lc-input");
    const value = Number(inputEl?.value);
    const box = document.getElementById("lc-result");
    if (!from || !to || !inputEl) return;
    inputEl.classList.remove("error");
    if (inputEl.value.trim() === "" || !isFinite(value)) {
      inputEl.classList.add("error"); box.classList.remove("show"); return;
    }
    const meters = value * TO_M[from];
    const result = meters / TO_M[to];
    document.getElementById("lc-main").textContent =
      result.toLocaleString(undefined, { maximumFractionDigits: 8 }) + " " + to;
    document.getElementById("lc-detail").innerHTML =
      `<strong>Input:</strong> ${value} ${from}<br>` +
      `<strong>Base:</strong> ${meters} m<br>` +
      `<strong>Result:</strong> ${result.toLocaleString(undefined, { maximumFractionDigits: 8 })} ${to}`;
    box.classList.add("show");
  }
  function reset() {
    ["lc-input"].forEach(id => {
      const el = document.getElementById(id); if (el) { el.value = ""; el.classList.remove("error"); }
    });
    const box = document.getElementById("lc-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["lc-input","lc-from","lc-to"].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.addEventListener("input", convert); el.addEventListener("change", convert); }
    });
    const b = document.getElementById("lc-calc"); if (b) b.addEventListener("click", convert);
    const r = document.getElementById("lc-reset"); if (r) r.addEventListener("click", reset);
  });
})();
