(function () {
  "use strict";
  function encode() {
    const input = document.getElementById("b64-input")?.value || "";
    try {
      const out = btoa(unescape(encodeURIComponent(input)));
      document.getElementById("b64-output").value = out;
      showStatus("Encoded", false);
    } catch (e) { showStatus("Encoding error: " + e.message, true); }
  }
  function decode() {
    const input = document.getElementById("b64-input")?.value || "";
    try {
      const out = decodeURIComponent(escape(atob(input.trim())));
      document.getElementById("b64-output").value = out;
      showStatus("Decoded", false);
    } catch (e) { showStatus("Invalid Base64 input", true); }
  }
  function showStatus(msg, isError) {
    const el = document.getElementById("b64-status");
    if (!el) return;
    el.textContent = msg;
    el.style.color = isError ? "var(--danger)" : "var(--success)";
  }
  function copyOutput() {
    const out = document.getElementById("b64-output");
    if (!out || !out.value) return;
    out.select();
    try {
      navigator.clipboard.writeText(out.value);
      showStatus("Copied to clipboard", false);
    } catch (_) {}
  }
  function reset() {
    const i = document.getElementById("b64-input"); if (i) i.value = "";
    const o = document.getElementById("b64-output"); if (o) o.value = "";
    showStatus("", false);
  }
  document.addEventListener("DOMContentLoaded", () => {
    const e = document.getElementById("b64-encode"); if (e) e.addEventListener("click", encode);
    const d = document.getElementById("b64-decode"); if (d) d.addEventListener("click", decode);
    const c = document.getElementById("b64-copy"); if (c) c.addEventListener("click", copyOutput);
    const r = document.getElementById("b64-reset"); if (r) r.addEventListener("click", reset);
  });
})();
