(function () {
  "use strict";
  function encode() {
    const input = document.getElementById("ue-input")?.value || "";
    try {
      document.getElementById("ue-output").value = encodeURIComponent(input);
      setStatus("Encoded", false);
    } catch (e) { setStatus("Encoding error", true); }
  }
  function decode() {
    const input = document.getElementById("ue-input")?.value || "";
    try {
      document.getElementById("ue-output").value = decodeURIComponent(input);
      setStatus("Decoded", false);
    } catch (e) { setStatus("Invalid percent-encoded input", true); }
  }
  function setStatus(msg, isError) {
    const el = document.getElementById("ue-status");
    if (!el) return;
    el.textContent = msg;
    el.style.color = isError ? "var(--danger)" : "var(--success)";
  }
  function copyOutput() {
    const out = document.getElementById("ue-output");
    if (!out?.value) return;
    out.select();
    try { navigator.clipboard.writeText(out.value); setStatus("Copied", false); } catch (_) {}
  }
  function reset() {
    const i = document.getElementById("ue-input"); if (i) i.value = "";
    const o = document.getElementById("ue-output"); if (o) o.value = "";
    setStatus("", false);
  }
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ue-encode")?.addEventListener("click", encode);
    document.getElementById("ue-decode")?.addEventListener("click", decode);
    document.getElementById("ue-copy")?.addEventListener("click", copyOutput);
    document.getElementById("ue-reset")?.addEventListener("click", reset);
  });
})();
