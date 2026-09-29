(function () {
  "use strict";
  function toHex() {
    const input = document.getElementById("hc-input")?.value || "";
    try {
      const bytes = new TextEncoder().encode(input);
      const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join(" ");
      document.getElementById("hc-output").value = hex;
      setStatus("Encoded to hex", false);
    } catch (e) { setStatus("Error: " + e.message, true); }
  }
  function fromHex() {
    const input = (document.getElementById("hc-input")?.value || "").trim();
    try {
      const clean = input.replace(/[\s,]+/g, "");
      if (clean.length % 2 !== 0 || /[^0-9a-fA-F]/.test(clean)) {
        setStatus("Invalid hex (odd length or non-hex characters)", true); return;
      }
      const bytes = new Uint8Array(clean.match(/.{2}/g).map(b => parseInt(b, 16)));
      const text = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
      document.getElementById("hc-output").value = text;
      setStatus("Decoded from hex", false);
    } catch (e) { setStatus("Decode error", true); }
  }
  function setStatus(msg, isError) {
    const el = document.getElementById("hc-status");
    if (!el) return;
    el.textContent = msg;
    el.style.color = isError ? "var(--danger)" : "var(--success)";
  }
  function copyOutput() {
    const out = document.getElementById("hc-output");
    if (!out?.value) return;
    out.select();
    try { navigator.clipboard.writeText(out.value); setStatus("Copied", false); } catch (_) {}
  }
  function reset() {
    document.getElementById("hc-input").value = "";
    document.getElementById("hc-output").value = "";
    setStatus("", false);
  }
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("hc-tohex")?.addEventListener("click", toHex);
    document.getElementById("hc-fromhex")?.addEventListener("click", fromHex);
    document.getElementById("hc-copy")?.addEventListener("click", copyOutput);
    document.getElementById("hc-reset")?.addEventListener("click", reset);
  });
})();
