(function () {
  "use strict";
  const TO_KG = {
    mg: 1e-6, g: 0.001, kg: 1, t: 1000,
    oz: 0.0283495, lb: 0.453592, st: 6.35029,
    ton_us: 907.185, ton_uk: 1016.05
  };
  function convert() {
    const from = document.getElementById("wc-from")?.value;
    const to = document.getElementById("wc-to")?.value;
    const inputEl = document.getElementById("wc-input");
    const value = Number(inputEl?.value);
    const box = document.getElementById("wc-result");
    if (!from || !to || !inputEl) return;
    inputEl.classList.remove("error");
    if (inputEl.value.trim() === "" || !isFinite(value)) {
      inputEl.classList.add("error"); box.classList.remove("show"); return;
    }
    const kg = value * TO_KG[from];
    const result = kg / TO_KG[to];
    document.getElementById("wc-main").textContent =
      result.toLocaleString(undefined, { maximumFractionDigits: 8 }) + " " + to;
    document.getElementById("wc-detail").innerHTML =
      `<strong>Input:</strong> ${value} ${from}<br>` +
      `<strong>In kilograms:</strong> ${kg} kg<br>` +
      `<strong>Result:</strong> ${result.toLocaleString(undefined, { maximumFractionDigits: 8 })} ${to}`;
    box.classList.add("show");
  }
  function reset() {
    const el = document.getElementById("wc-input"); if (el) { el.value = ""; el.classList.remove("error"); }
    document.getElementById("wc-result")?.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["wc-input","wc-from","wc-to"].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.addEventListener("input", convert); el.addEventListener("change", convert); }
    });
    document.getElementById("wc-calc")?.addEventListener("click", convert);
    document.getElementById("wc-reset")?.addEventListener("click", reset);
  });
})();
