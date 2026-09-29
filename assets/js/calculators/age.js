/* ============================================================
   AGE CALCULATOR
   Computes exact age in years, months, days, and totals.
   ============================================================ */
(function () {
  "use strict";

  function diffYMD(from, to) {
    let y = to.getFullYear() - from.getFullYear();
    let m = to.getMonth() - from.getMonth();
    let d = to.getDate() - from.getDate();

    if (d < 0) {
      m -= 1;
      const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
      d += prevMonth;
    }
    if (m < 0) {
      y -= 1;
      m += 12;
    }
    return { years: y, months: m, days: d };
  }

  function calc() {
    const dobVal = document.getElementById("age-dob")?.value;
    const asOfVal = document.getElementById("age-asof")?.value;
    const box = document.getElementById("age-result");
    const main = document.getElementById("age-main");
    const detail = document.getElementById("age-detail");
    if (!dobVal || !box || !main) return;

    const dob = new Date(dobVal + "T00:00:00");
    const asOf = asOfVal ? new Date(asOfVal + "T00:00:00") : new Date();

    if (isNaN(dob) || isNaN(asOf)) {
      main.textContent = "Invalid date";
      box.classList.add("show");
      return;
    }
    if (dob > asOf) {
      main.textContent = "Date of birth is in the future";
      if (detail) detail.innerHTML = "";
      box.classList.add("show");
      return;
    }

    const { years, months, days } = diffYMD(dob, asOf);

    const msPerDay = 86400000;
    const totalDays = Math.floor((asOf - dob) / msPerDay);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    main.textContent = `${years} years, ${months} months, ${days} days`;

    if (detail) {
      const nextBday = nextBirthday(dob, asOf);
      const daysToBday = Math.ceil((nextBday - asOf) / msPerDay);
      detail.innerHTML =
        `<strong>Total months:</strong> ${totalMonths.toLocaleString()}<br>` +
        `<strong>Total weeks:</strong> ${totalWeeks.toLocaleString()}<br>` +
        `<strong>Total days:</strong> ${totalDays.toLocaleString()}<br>` +
        `<strong>Total hours:</strong> ${totalHours.toLocaleString()}<br>` +
        `<strong>Total minutes:</strong> ${totalMinutes.toLocaleString()}<br>` +
        `<strong>Next birthday in:</strong> ${daysToBday} day${daysToBday === 1 ? "" : "s"}`;
    }
    box.classList.add("show");
  }

  function nextBirthday(dob, asOf) {
    const y = asOf.getFullYear();
    let nb = new Date(y, dob.getMonth(), dob.getDate());
    if (nb < asOf) nb = new Date(y + 1, dob.getMonth(), dob.getDate());
    return nb;
  }

  function reset() {
    const d = document.getElementById("age-dob");
    const a = document.getElementById("age-asof");
    if (d) { d.value = ""; d.classList.remove("error"); }
    if (a) a.value = "";
    const box = document.getElementById("age-result");
    if (box) box.classList.remove("show");
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Pre-fill "as of" with today
    const asOf = document.getElementById("age-asof");
    if (asOf && !asOf.value) {
      const t = new Date();
      asOf.value = t.toISOString().slice(0, 10);
    }
    ["age-dob", "age-asof"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", calc);
    });
    const btn = document.getElementById("age-calc");
    if (btn) btn.addEventListener("click", calc);
    const rst = document.getElementById("age-reset");
    if (rst) rst.addEventListener("click", reset);
  });
})();
