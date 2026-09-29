/* ============================================================
   ADVANCED PERCENTAGE CALCULATOR
   Adds: reverse %, X% of what, compound %, tips.
   ============================================================ */
(function () {
  "use strict";
  function num(id) {
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
  function setResult(boxId, mainId, detailId, main, detail) {
    const box = document.getElementById(boxId);
    if (!box) return;
    document.getElementById(mainId).textContent = main;
    document.getElementById(detailId).innerHTML = detail;
    box.classList.add("show");
  }
  function hideResult(boxId) {
    const box = document.getElementById(boxId);
    if (box) box.classList.remove("show");
  }

  /* Mode 4: Reverse percentage (original value before a % change) */
  function calcReverse() {
    const final = num("pc-rev-final");
    const pct = num("pc-rev-pct");
    const dir = document.getElementById("pc-rev-dir")?.value || "increase";
    if (final === null || pct === null) { hideResult("pc-rev-result"); return; }
    const factor = dir === "increase" ? (1 + pct/100) : (1 - pct/100);
    if (factor === 0) {
      setResult("pc-rev-result", "pc-rev-main", "pc-rev-detail",
        "Undefined", `Cannot reverse a 100% decrease.`);
      return;
    }
    const original = final / factor;
    setResult("pc-rev-result", "pc-rev-main", "pc-rev-detail",
      fmt(original),
      `<strong>Formula:</strong> Original = Final ÷ (1 ${dir === "increase" ? "+" : "−"} ${pct}/100)<br>` +
      `<strong>Original:</strong> ${fmt(original)}<br>` +
      `<strong>Final:</strong> ${fmt(final)}<br>` +
      `<strong>Change:</strong> ${pct}% ${dir}`);
  }

  /* Mode 5: X is what percent of Y (reverse form: "X increased by what % gives Y?") */
  function calcWhatPercent() {
    const part = num("pc-wp-part");
    const whole = num("pc-wp-whole");
    if (part === null || whole === null) { hideResult("pc-wp-result"); return; }
    if (whole === 0) {
      setResult("pc-wp-result", "pc-wp-main", "pc-wp-detail",
        "Undefined", `<span style="color:var(--danger);">Cannot divide by zero.</span>`);
      return;
    }
    const pct = (part / whole) * 100;
    setResult("pc-wp-result", "pc-wp-main", "pc-wp-detail",
      fmt(pct) + "%",
      `<strong>Formula:</strong> (${fmt(part)} ÷ ${fmt(whole)}) × 100<br>` +
      `<strong>Result:</strong> ${fmt(part)} is ${fmt(pct)}% of ${fmt(whole)}`);
  }

  /* Mode 6: Compounded percentage change */
  function calcCompounded() {
    const start = num("pc-cp-start");
    const pct = num("pc-cp-pct");
    const periods = num("pc-cp-periods");
    if (start === null || pct === null || periods === null) { hideResult("pc-cp-result"); return; }
    if (periods < 0 || !Number.isInteger(periods)) {
      setResult("pc-cp-result", "pc-cp-main", "pc-cp-detail",
        "Invalid", "Periods must be a non-negative integer.");
      return;
    }
    const multiplier = Math.pow(1 + pct/100, periods);
    const final = start * multiplier;
    const totalChange = ((final - start) / start) * 100;
    setResult("pc-cp-result", "pc-cp-main", "pc-cp-detail",
      fmt(final),
      `<strong>Formula:</strong> Final = ${fmt(start)} × (1 + ${pct}/100)^${periods}<br>` +
      `<strong>Multiplier:</strong> ${fmt(multiplier, 6)}<br>` +
      `<strong>Final value:</strong> ${fmt(final)}<br>` +
      `<strong>Total change:</strong> ${fmt(totalChange)}% over ${periods} period${periods === 1 ? "" : "s"}`);
  }

  /* Mode 7: Tip calculation shortcut */
  function calcTip() {
    const bill = num("pc-tip-bill");
    const pct = num("pc-tip-pct");
    const people = num("pc-tip-people") || 1;
    if (bill === null || pct === null) { hideResult("pc-tip-result"); return; }
    const tip = bill * pct / 100;
    const total = bill + tip;
    const per = total / people;
    setResult("pc-tip-result", "pc-tip-main", "pc-tip-detail",
      fmt(total, 2),
      `<strong>Bill:</strong> ${fmt(bill, 2)}<br>` +
      `<strong>Tip (${pct}%):</strong> ${fmt(tip, 2)}<br>` +
      `<strong>Total:</strong> ${fmt(total, 2)}<br>` +
      `<strong>Per person (${people}):</strong> ${fmt(per, 2)}`);
  }

  /* Boot */
  document.addEventListener("DOMContentLoaded", () => {
    const bindings = [
      [["pc-rev-final","pc-rev-pct","pc-rev-dir"], calcReverse],
      [["pc-wp-part","pc-wp-whole"], calcWhatPercent],
      [["pc-cp-start","pc-cp-pct","pc-cp-periods"], calcCompounded],
      [["pc-tip-bill","pc-tip-pct","pc-tip-people"], calcTip],
    ];
    bindings.forEach(([ids, fn]) => {
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.addEventListener("input", fn); el.addEventListener("change", fn); }
      });
    });
    // Reset buttons
    document.querySelectorAll("[data-pc-reset]").forEach(btn => {
      btn.addEventListener("click", () => {
        const group = btn.getAttribute("data-pc-reset");
        document.querySelectorAll(`[id^="pc-${group}-"]`).forEach(el => {
          if (el.tagName === "INPUT" || el.tagName === "SELECT") el.value = "";
        });
        document.querySelectorAll(`[id^="pc-${group}-"][id$="-result"]`).forEach(b => b.classList.remove("show"));
      });
    });
  });
})();
