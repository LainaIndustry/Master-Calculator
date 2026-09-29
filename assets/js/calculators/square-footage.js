(function () {
  "use strict";
  function calc() {
    const length = parseFloat(document.getElementById("sf-length")?.value || "");
    const width = parseFloat(document.getElementById("sf-width")?.value || "");
    const unit = document.getElementById("sf-unit")?.value || "ft";
    const price = parseFloat(document.getElementById("sf-price")?.value || "0") || 0;
    const box = document.getElementById("sf-result");
    if (!box) return;
    if (!isFinite(length) || !isFinite(width) || length <= 0 || width <= 0) { box.classList.remove("show"); return; }

    // Convert to feet
    const toFt = { ft: 1, m: 3.28084, in: 1/12, yd: 3, cm: 1/30.48 };
    const L = length * toFt[unit];
    const W = width * toFt[unit];
    const sqft = L * W;
    const sqm = sqft * 0.092903;
    const sqyd = sqft / 9;

    let costHtml = "";
    if (price > 0) {
      const cost = sqft * price;
      costHtml = `<br><strong>Cost (at $${price}/sq ft):</strong> ${cost.toLocaleString(undefined, { style: "currency", currency: "USD" })}`;
    }
    document.getElementById("sf-main").textContent = sqft.toLocaleString(undefined, { maximumFractionDigits: 2 }) + " sq ft";
    document.getElementById("sf-detail").innerHTML =
      `<strong>Length:</strong> ${length} ${unit}<br>` +
      `<strong>Width:</strong> ${width} ${unit}<br>` +
      `<strong>Square feet:</strong> ${sqft.toLocaleString(undefined, { maximumFractionDigits: 2 })}<br>` +
      `<strong>Square meters:</strong> ${sqm.toLocaleString(undefined, { maximumFractionDigits: 3 })}<br>` +
      `<strong>Square yards:</strong> ${sqyd.toLocaleString(undefined, { maximumFractionDigits: 3 })}${costHtml}`;
    box.classList.add("show");
  }
  function reset() {
    ["sf-length","sf-width","sf-price"].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = "";
    });
    const box = document.getElementById("sf-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["sf-length","sf-width","sf-price","sf-unit"].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); }
    });
    const b = document.getElementById("sf-calc"); if (b) b.addEventListener("click", calc);
    const r = document.getElementById("sf-reset"); if (r) r.addEventListener("click", reset);
  });
})();
