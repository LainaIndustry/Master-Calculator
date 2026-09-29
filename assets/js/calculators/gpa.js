(function () {
  "use strict";
  // Grade → standard 4.0 scale mapping
  const GRADE_MAP = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "D-": 0.7,
    "F": 0.0
  };
  let rows = [];

  function render() {
    const tbody = document.getElementById("gpa-body");
    if (!tbody) return;
    tbody.innerHTML = rows.map((r, i) => `
      <tr>
        <td><input class="form-control" data-gpa-course="${i}" value="${escapeAttr(r.course)}" placeholder="Course name" /></td>
        <td>
          <select class="form-control" data-gpa-grade="${i}">
            ${Object.keys(GRADE_MAP).map(g => `<option value="${g}" ${r.grade === g ? "selected" : ""}>${g}</option>`).join("")}
          </select>
        </td>
        <td><input class="form-control" data-gpa-credits="${i}" type="number" min="0" step="0.5" value="${r.credits}" /></td>
        <td><button class="btn btn-secondary" data-gpa-remove="${i}" type="button" aria-label="Remove row">✕</button></td>
      </tr>`).join("");
    bindRowInputs();
  }
  function escapeAttr(s) {
    return String(s || "").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }
  function bindRowInputs() {
    document.querySelectorAll("[data-gpa-course]").forEach(el => {
      el.oninput = e => { rows[+e.target.dataset.gpaCourse].course = e.target.value; };
    });
    document.querySelectorAll("[data-gpa-grade]").forEach(el => {
      el.onchange = e => { rows[+e.target.dataset.gpaGrade].grade = e.target.value; };
    });
    document.querySelectorAll("[data-gpa-credits]").forEach(el => {
      el.oninput = e => { rows[+e.target.dataset.gpaCredits].credits = parseFloat(e.target.value) || 0; };
    });
    document.querySelectorAll("[data-gpa-remove]").forEach(el => {
      el.onclick = e => { rows.splice(+e.target.dataset.gpaRemove, 1); render(); };
    });
  }
  function calc() {
    if (!rows.length) {
      document.getElementById("gpa-main").textContent = "Add at least one course";
      document.getElementById("gpa-result").classList.add("show");
      return;
    }
    let totalPoints = 0, totalCredits = 0;
    rows.forEach(r => {
      const g = GRADE_MAP[r.grade] ?? 0;
      const c = r.credits || 0;
      totalPoints += g * c;
      totalCredits += c;
    });
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    document.getElementById("gpa-main").textContent = gpa.toFixed(2);
    document.getElementById("gpa-detail").innerHTML =
      `<strong>Total credits:</strong> ${totalCredits}<br>` +
      `<strong>Total quality points:</strong> ${totalPoints.toFixed(2)}<br>` +
      `<strong>Unweighted GPA:</strong> ${gpa.toFixed(2)} / 4.00`;
    document.getElementById("gpa-result").classList.add("show");
  }
  function reset() {
    rows = [];
    render();
    document.getElementById("gpa-result").classList.remove("show");
  }
  document.addEventListener("DOMContentLoaded", () => {
    // Seed with one row
    rows.push({ course: "", grade: "A", credits: 3 });
    render();
    const add = document.getElementById("gpa-add");
    if (add) add.addEventListener("click", () => { rows.push({ course: "", grade: "A", credits: 3 }); render(); });
    const b = document.getElementById("gpa-calc"); if (b) b.addEventListener("click", calc);
    const r = document.getElementById("gpa-reset"); if (r) r.addEventListener("click", reset);
  });
})();
