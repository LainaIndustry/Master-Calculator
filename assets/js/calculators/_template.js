/* ============================================================
   TEMPLATE CALCULATOR
   Copy this file to create a new calculator.
   Rename to <slug>.js and follow the pattern.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Validation helper ---------- */
  function num(id, min = 0, allowZero = false) {
    const el = document.getElementById(id);
    if (!el) return null;
    const raw = el.value.trim();
    el.classList.remove("error");
    if (raw === "") { el.classList.add("error"); return null; }
    const n = Number(raw);
    if (!isFinite(n) || (allowZero ? n < min : n <= min)) {
      el.classList.add("error");
      return null;
    }
    return n;
  }

  /* ---------- Formatting helper ---------- */
  function money(n) {
    return isFinite(n)
      ? n.toLocaleString(undefined, { style: "currency", currency: "USD" })
      : "—";
  }

  /* ---------- Main calculation ---------- */
  function calc() {
    const a = num("tc-a");       // REQUIRED: rename to your input IDs
    const b = num("tc-b");
    const box = document.getElementById("tc-result");
    if (!box) return;

    if (a === null || b === null) {
      box.classList.remove("show");
      return;
    }

    // ---- YOUR MATH HERE ----
    const result = a + b; // replace with real formula

    // ---- Render main result ----
    const main = document.getElementById("tc-main");
    const detail = document.getElementById("tc-detail");
    if (main) main.textContent = money(result);
    if (detail) {
      detail.innerHTML =
        `<strong>Input A:</strong> ${money(a)}<br>` +
        `<strong>Input B:</strong> ${money(b)}<br>` +
        `<strong>Result:</strong> <strong>${money(result)}</strong>`;
    }
    box.classList.add("show");
  }

  /* ---------- Reset ---------- */
  function reset() {
    ["tc-a", "tc-b"].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.value = ""; el.classList.remove("error"); }
    });
    const box = document.getElementById("tc-result");
    if (box) box.classList.remove("show");
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    ["tc-a", "tc-b"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", calc);
    });
    const b = document.getElementById("tc-calc");
    if (b) b.addEventListener("click", calc);
    const r = document.getElementById("tc-reset");
    if (r) r.addEventListener("click", reset);
  });
})();
