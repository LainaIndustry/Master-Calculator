(function () {
  "use strict";
  const toC = {
    C: v => v,
    F: v => (v - 32) * 5 / 9,
    K: v => v - 273.15
  };
  const fromC = {
    C: v => v,
    F: v => v * 9 / 5 + 32,
    K: v => v + 273.15
  };
  function convert() {
    const from = document.getElementById("tc-from")?.value || "C";
    const to = document.getElementById("tc-to")?.value || "F";
    const inputEl = document.getElementById("tc-input");
    const value = Number(inputEl?.value);
    const box = document.getElementById("tc-result");
    if (!inputEl) return;
    inputEl.classList.remove("error");
    if (inputEl.value.trim() === "" || !isFinite(value)) {
      inputEl.classList.add("error"); box.classList.remove("show"); return;
    }
    const celsius = toC[from](value);
    if (celsius < -273.15) {
      document.getElementById("tc-main").textContent = "Below absolute zero";
      document.getElementById("tc-detail").innerHTML =
        `<span style="color:var(--danger);">The value ${value} ${from} is physically impossible.</span>`;
      box.classList.add("show"); return;
    }
    const result = fromC[to](celsius);
    const symbol = to === "K" ? "K" : "°" + to;
    document.getElementById("tc-main").textContent =
      result.toLocaleString(undefined, { maximumFractionDigits: 4 }) + " " + symbol;
    document.getElementById("tc-detail").innerHTML =
      `<strong>Input:</strong> ${value} °${from}<br>` +
      `<strong>In Celsius:</strong> ${celsius.toLocaleString(undefined, { maximumFractionDigits: 4 })} °C<br>` +
      `<strong>In Fahrenheit:</strong> ${fromC.F(celsius).toLocaleString(undefined, { maximumFractionDigits: 4 })} °F<br>` +
      `<strong>In Kelvin:</strong> ${fromC.K(celsius).toLocaleString(undefined, { maximumFractionDigits: 4 })} K`;
    box.classList.add("show");
  }
  function reset() {
    const el = document.getElementById("tc-input");
    if (el) { el.value = ""; el.classList.remove("error"); }
    const box = document.getElementById("tc-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["tc-input","tc-from","tc-to"].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.addEventListener("input", convert); el.addEventListener("change", convert); }
    });
    const b = document.getElementById("tc-calc"); if (b) b.addEventListener("click", convert);
    const r = document.getElementById("tc-reset"); if (r) r.addEventListener("click", reset);
  });
})();
