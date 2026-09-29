(function () {
  "use strict";

  const SETS = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    digits: "0123456789",
    symbols: "!@#$%^&*()-_=+[]{};:,.<>?/~",
  };

  function secureRandomInt(max) {
    // Rejection sampling to avoid modulo bias
    const limit = Math.floor(0x100000000 / max) * max;
    const buf = new Uint32Array(1);
    let n;
    do {
      crypto.getRandomValues(buf);
      n = buf[0];
    } while (n >= limit);
    return n % max;
  }

  function generate() {
    const length = Math.max(4, Math.min(128, Number(document.getElementById("pw-length").value) || 16));
    const useLower = document.getElementById("pw-lower").checked;
    const useUpper = document.getElementById("pw-upper").checked;
    const useDigits = document.getElementById("pw-digits").checked;
    const useSymbols = document.getElementById("pw-symbols").checked;

    let pool = "";
    const mandatory = [];
    if (useLower) { pool += SETS.lower; mandatory.push(SETS.lower); }
    if (useUpper) { pool += SETS.upper; mandatory.push(SETS.upper); }
    if (useDigits) { pool += SETS.digits; mandatory.push(SETS.digits); }
    if (useSymbols) { pool += SETS.symbols; mandatory.push(SETS.symbols); }

    const out = document.getElementById("pw-output");
    if (!pool) {
      out.value = "Select at least one character set";
      return;
    }

    const chars = [];
    // Ensure at least one from each selected set
    mandatory.forEach(set => chars.push(set[secureRandomInt(set.length)]));
    while (chars.length < length) chars.push(pool[secureRandomInt(pool.length)]);

    // Shuffle using crypto-secure random
    for (let i = chars.length - 1; i > 0; i--) {
      const j = secureRandomInt(i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    out.value = chars.slice(0, length).join("");

    // Estimate entropy
    const bits = length * Math.log2(pool.length);
    document.getElementById("pw-entropy").textContent = `~${Math.round(bits)} bits of entropy`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("pw-generate");
    if (btn) btn.addEventListener("click", generate);
    const copy = document.getElementById("pw-copy");
    if (copy) copy.addEventListener("click", () => {
      const out = document.getElementById("pw-output");
      out.select();
      try {
        navigator.clipboard.writeText(out.value);
        copy.textContent = "Copied!";
        setTimeout(() => (copy.textContent = "Copy"), 1200);
      } catch (_) {}
    });
  });
})();
