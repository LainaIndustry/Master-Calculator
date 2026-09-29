(function () {
  "use strict";
  function calc() {
    const calories = parseFloat(document.getElementById("mc-cal")?.value || "");
    const goal = document.getElementById("mc-goal")?.value || "balanced";
    const weight = parseFloat(document.getElementById("mc-weight")?.value || "");
    const box = document.getElementById("mc-result");
    if (!box) return;
    if (!isFinite(calories) || calories <= 0) { box.classList.remove("show"); return; }

    let proteinPct, carbsPct, fatPct;
    if (goal === "balanced") { proteinPct = 30; carbsPct = 40; fatPct = 30; }
    else if (goal === "lowcarb") { proteinPct = 35; carbsPct = 25; fatPct = 40; }
    else if (goal === "highcarb") { proteinPct = 25; carbsPct = 55; fatPct = 20; }
    else if (goal === "muscle") { proteinPct = 35; carbsPct = 45; fatPct = 20; }
    else if (goal === "fatloss") { proteinPct = 40; carbsPct = 30; fatPct = 30; }

    const proteinG = (calories * proteinPct / 100) / 4;
    const carbsG = (calories * carbsPct / 100) / 4;
    const fatG = (calories * fatPct / 100) / 9;

    let weightNote = "";
    if (isFinite(weight) && weight > 0) {
      const pPerKg = proteinG / weight;
      weightNote = `<br><strong>Protein per kg:</strong> ${pPerKg.toFixed(2)} g/kg ` +
        `(${pPerKg < 1.4 ? "below" : pPerKg > 2.2 ? "above" : "within"} the 1.4–2.2 g/kg recommendation)`;
    }

    document.getElementById("mc-main").textContent = `${Math.round(proteinG)}g P / ${Math.round(carbsG)}g C / ${Math.round(fatG)}g F`;
    document.getElementById("mc-detail").innerHTML =
      `<strong>Goal:</strong> ${goal}<br>` +
      `<strong>Total calories:</strong> ${Math.round(calories)}<br>` +
      `<strong>Protein:</strong> ${Math.round(proteinG)}g (${proteinPct}% · ${Math.round(proteinG*4)} cal)<br>` +
      `<strong>Carbohydrates:</strong> ${Math.round(carbsG)}g (${carbsPct}% · ${Math.round(carbsG*4)} cal)<br>` +
      `<strong>Fat:</strong> ${Math.round(fatG)}g (${fatPct}% · ${Math.round(fatG*9)} cal)${weightNote}`;
    box.classList.add("show");
  }
  function reset() {
    ["mc-cal","mc-weight"].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = "";
    });
    document.getElementById("mc-result")?.classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    ["mc-cal","mc-weight","mc-goal"].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); }
    });
    document.getElementById("mc-calc")?.addEventListener("click", calc);
    document.getElementById("mc-reset")?.addEventListener("click", reset);
  });
})();
