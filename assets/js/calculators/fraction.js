(function () {
  "use strict";
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; }
  function simplify(n, d) {
    if (d === 0) return { n, d };
    const sign = d < 0 ? -1 : 1;
    n *= sign; d *= sign;
    const g = gcd(n, d) || 1;
    return { n: n / g, d: d / g };
  }
  function parseFrac(nId, dId) {
    const n = parseFloat(document.getElementById(nId)?.value || "");
    const d = parseFloat(document.getElementById(dId)?.value || "");
    return { n: isFinite(n) ? n : 0, d: isFinite(d) ? d : 1 };
  }
  function calc() {
    const f1 = parseFrac("fr-n1", "fr-d1");
    const f2 = parseFrac("fr-n2", "fr-d2");
    const op = document.getElementById("fr-op")?.value || "+";
    const box = document.getElementById("fr-result");
    if (!box) return;
    if (f1.d === 0 || f2.d === 0) {
      document.getElementById("fr-main").textContent = "Undefined (denominator = 0)";
      box.classList.add("show"); return;
    }
    let rn, rd;
    if (op === "+") { rn = f1.n * f2.d + f2.n * f1.d; rd = f1.d * f2.d; }
    else if (op === "-") { rn = f1.n * f2.d - f2.n * f1.d; rd = f1.d * f2.d; }
    else if (op === "×") { rn = f1.n * f2.n; rd = f1.d * f2.d; }
    else if (op === "÷") {
      if (f2.n === 0) {
        document.getElementById("fr-main").textContent = "Undefined (division by 0)";
        box.classList.add("show"); return;
      }
      rn = f1.n * f2.d; rd = f1.d * f2.n;
    }
    const s = simplify(rn, rd);
    document.getElementById("fr-main").textContent = `${s.n}/${s.d}`;
    const dec = s.n / s.d;
    document.getElementById("fr-detail").innerHTML =
      `<strong>Input:</strong> ${f1.n}/${f1.d} ${op} ${f2.n}/${f2.d}<br>` +
      `<strong>Unsimplified:</strong> ${rn}/${rd}<br>` +
      `<strong>Simplified:</strong> ${s.n}/${s.d}<br>` +
      `<strong>Decimal:</strong> ${dec.toLocaleString(undefined, { maximumFractionDigits: 8 })}`;
    box.classList.add("show");
  }
  function reset() {
    ["fr-n1","fr-d1","fr-n2","fr-d2"].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = "";
    });
    const box = document.getElementById("fr-result"); if (box) box.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["fr-n1","fr-d1","fr-n2","fr-d2"].forEach(id => {
      const el = document.getElementById(id); if (el) el.addEventListener("input", calc);
    });
    const o = document.getElementById("fr-op"); if (o) o.addEventListener("change", calc);
    const b = document.getElementById("fr-calc"); if (b) b.addEventListener("click", calc);
    const r = document.getElementById("fr-reset"); if (r) r.addEventListener("click", reset);
  });
})();
