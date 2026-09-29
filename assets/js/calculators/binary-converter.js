(function () {
  "use strict";
  function toBinary() {
    const input = document.getElementById("bc-input")?.value || "";
    try {
      const bytes = new TextEncoder().encode(input);
      const binary = Array.from(bytes).map(b => b.toString(2).padStart(8, "0")).join(" ");
      document.getElementById("bc-output").value = binary;
      setStatus("Encoded to binary", false);
    } catch (e) { setStatus("Error", true); }
  }
  function fromBinary() {
    const input = (document.getElementById("bc-input")?.value || "").trim();
    try {
      const clean = input.replace(/\s+/g, "");
      if (clean.length % 8 !== 0 || /[^01]/.test(clean)) {
        setStatus("Invalid binary (must be multiples of 8 bits, containing only 0 and 1)", true); return;
      }
      const bytes = new Uint8Array(clean.match(/.{8}/g).map(b => parseInt(b, 2)));
      const text = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
      document.getElementById("bc-output").value = text;
      setStatus("Decoded from binary", false);
    } catch (e) { setStatus("Decode error", true); }
  }
  function setStatus(msg, isError) {
    const el = document.getElementById("bc-status");
    if (!el) return;
    el.textContent = msg;
    el.style.color = isError ? "var(--danger)" : "var(--success)";
  }
  function copyOutput() {
    const out = document.getElementById("bc-output");
    if (!out?.value) return;
    out.select();
    try { navigator.clipboard.writeText(out.value); setStatus("Copied", false); } catch (_) {}
  }
  function reset() {
    document.getElementById("bc-input").value = "";
    document.getElementById("bc-output").value = "";
    setStatus("", false);
  }
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("bc-tobin")?.addEventListener("click", toBinary);
    document.getElementById("bc-frombin")?.addEventListener("click", fromBinary);
    document.getElementById("bc-copy")?.addEventListener("click", copyOutput);
    document.getElementById("bc-reset")?.addEventListener("click", reset);
  });
})();
