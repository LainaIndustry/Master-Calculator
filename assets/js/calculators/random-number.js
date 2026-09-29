(function () {
  "use strict";
  function secureInt(min, max) {
    const range = max - min + 1;
    if (range <= 0) return min;
    const limit = Math.floor(0x100000000 / range) * range;
    const buf = new Uint32Array(1);
    let n;
    do { crypto.getRandomValues(buf); n = buf[0]; } while (n >= limit);
    return min + (n % range);
  }
  function generate() {
    const min = parseInt(document.getElementById("rn-min")?.value || "1", 10);
    const max = parseInt(document.getElementById("rn-max")?.value || "100", 10);
    const count = Math.min(1000, Math.max(1, parseInt(document.getElementById("rn-count")?.value || "1", 10)));
    const unique = document.getElementById("rn-unique")?.checked;
    const out = document.getElementById("rn-output");
    const box = document.getElementById("rn-result");
    if (!isFinite(min) || !isFinite(max) || min > max) {
      out.textContent = "Invalid range — min must be ≤ max.";
      box.classList.add("show"); return;
    }
    const total = max - min + 1;
    if (unique && count > total) {
      out.textContent = `Cannot generate ${count} unique numbers from a range of ${total}.`;
      box.classList.add("show"); return;
    }
    let result = [];
    if (unique) {
      const set = new Set();
      while (set.size < count) set.add(secureInt(min, max));
      result = Array.from(set);
    } else {
      for (let i = 0; i < count; i++) result.push(secureInt(min, max));
    }
    out.textContent = result.join(", ");
    box.classList.add("show");
  }
  function reset() {
    ["rn-min","rn-max","rn-count"].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = "";
    });
    const out = document.getElementById("rn-output"); if (out) out.textContent = "";
    document.getElementById("rn-result").classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    const b = document.getElementById("rn-generate"); if (b) b.addEventListener("click", generate);
    const c = document.getElementById("rn-copy");
    if (c) c.addEventListener("click", () => {
      const out = document.getElementById("rn-output");
      if (out?.textContent) { navigator.clipboard.writeText(out.textContent); c.textContent = "Copied!"; setTimeout(() => c.textContent = "Copy", 1200); }
    });
    const r = document.getElementById("rn-reset"); if (r) r.addEventListener("click", reset);
  });
})();
