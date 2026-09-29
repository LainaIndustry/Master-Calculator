(function () {
  "use strict";
  let expr = "";
  let display;

  function update() {
    if (display) display.value = expr || "0";
  }
  function press(val) {
    switch (val) {
      case "C": expr = ""; break;
      case "⌫": expr = expr.slice(0, -1); break;
      case "=":
        try {
          // Replace display tokens with JS operators before evaluation
          const js = expr
            .replace(/×/g, "*").replace(/÷/g, "/")
            .replace(/π/g, "Math.PI").replace(/e/g, "Math.E")
            .replace(/√\(/g, "Math.sqrt(")
            .replace(/sin\(/g, "Math.sin(").replace(/cos\(/g, "Math.cos(")
            .replace(/tan\(/g, "Math.tan(").replace(/log\(/g, "Math.log10(")
            .replace(/ln\(/g, "Math.log(").replace(/\^/g, "**");
          // eslint-disable-next-line no-new-func
          const result = Function("return (" + js + ")")();
          if (!isFinite(result)) throw new Error("Invalid");
          expr = String(result);
        } catch (e) { expr = "Error"; }
        break;
      default: expr += val;
    }
    update();
  }
  document.addEventListener("DOMContentLoaded", () => {
    display = document.getElementById("sci-display");
    document.querySelectorAll("[data-sci-key]").forEach(btn => {
      btn.addEventListener("click", () => press(btn.getAttribute("data-sci-key")));
    });
    // Keyboard support
    document.addEventListener("keydown", (e) => {
      if (!document.activeElement?.closest(".sci-calc")) return;
      if (/^[0-9+\-*/().]$/.test(e.key)) press(e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key);
      else if (e.key === "Enter") press("=");
      else if (e.key === "Backspace") press("⌫");
      else if (e.key === "Escape") press("C");
    });
  });
})();
