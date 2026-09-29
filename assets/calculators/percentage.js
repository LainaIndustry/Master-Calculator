/* ============================================================
   PERCENTAGE CALCULATOR
   Handles: "X% of Y", "X is what % of Y", "% change"
   ============================================================ */
(function () {
  "use strict";

  function parseNum(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    const raw = el.value.trim();
    el.classList.remove("error");
    if (raw === "") { el.classList.add("error"); return null; }
    const n = Number(raw);
    if (!isFinite(n)) { el.classList.add("error"); return null; }
    return n;
  }

  function fmt(n, d = 4) {
    if (!isFinite(n)) return "—";
    return Number(n.toFixed(d)).toLocaleString(undefined, { maximumFractionDigits: d });
  }

  /* -------- Mode 1: X% of Y -------- */
  function calcOf() {
    const p = parseNum("m1-percent");
    const v = parseNum("m1-value");
    const box = document.getElementById("m1-result");
    const main = document.getElementById("m1-main");
    const detail = document.getElementById("m1-detail");
    if (p === null || v === null) { box.classList.remove("show"); return; }
    const result = (p / 100) * v;
    main.textContent = fmt(result);
    detail.innerHTML = `<strong>Formula:</strong> ${fmt(p)}% × ${fmt(v)} = <strong>${fmt(result)}</strong>`;
    box.classList.add("show");
  }

  /* -------- Mode 2: X is what % of Y -------- */
  function calcIsWhat() {
    const x = parseNum("m2-x");
    const y = parseNum("m2-y");
    const box = document.getElementById("m2-result");
    const main = document.getElementById("m2-main");
    const detail = document.getElementById("m2-detail");
    if (x === null || y === null) { box.classList.remove("show"); return; }
    if (y === 0) {
      main.textContent = "Undefined";
      detail.innerHTML = `<span style="color:var(--danger);">Cannot divide by zero (Y must not be 0).</span>`;
      box.classList.add("show");
      return;
    }
    const result = (x / y) * 100;
    main.textContent = fmt(result) + "%";
    detail.innerHTML = `<strong>Formula:</strong> (${fmt(x)} ÷ ${fmt(y)}) × 100 = <strong>${fmt(result)}%</strong>`;
    box.classList.add("show");
  }

  /* -------- Mode 3: % change from old to new -------- */
  function calcChange() {
    const o = parseNum("m3-old");
    const n = parseNum("m3-new");
    const box = document.getElementById("m3-result");
    const main = document.getElementById("m3-main");
    const detail = document.getElementById("m3-detail");
    if (o === null || n === null) { box.classList.remove("show"); return; }
    if (o === 0) {
      main.textContent = "Undefined";
      detail.innerHTML = `<span style="color:var(--danger);">Cannot compute percentage change from 0.</span>`;
      box.classList.add("show");
      return;
    }
    const change = ((n - o) / Math.abs(o)) * 100;
    const dir = change > 0 ? "increase" : change < 0 ? "decrease" : "no change";
    main.textContent = (change >= 0 ? "+" : "") + fmt(change) + "%";
    detail.innerHTML =
      `<strong>Formula:</strong> ((${fmt(n)} − ${fmt(o)}) ÷ |${fmt(o)}|) × 100<br>` +
      `<strong>Interpretation:</strong> ${fmt(Math.abs(change))}% ${dir} from ${fmt(o)} to ${fmt(n)}.`;
    box.classList.add("show");
  }

  function reset(mode) {
    ["m" + mode + "-percent", "m" + mode + "-value", "m" + mode + "-x", "m" + mode + "-y", "m" + mode + "-old", "m" + mode + "-new"]
      .forEach((id) => {
        const el = document.getElementById(id);
        if (el) { el.value = ""; el.classList.remove("error"); }
      });
    const box = document.getElementById("m" + mode + "-result");
    if (box) box.classList.remove("show");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const bindings = [
      ["m1-calc", calcOf], ["m1-reset", () => reset(1)],
      ["m2-calc", calcIsWhat], ["m2-reset", () => reset(2)],
      ["m3-calc", calcChange], ["m3-reset", () => reset(3)],
    ];
    bindings.forEach(([id, fn]) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", fn);
    });
    // Live calc on input
    ["m1-percent","m1-value"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", calcOf);
    });
    ["m2-x","m2-y"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", calcIsWhat);
    });
    ["m3-old","m3-new"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", calcChange);
    });
  });
})();
