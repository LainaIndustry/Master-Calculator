/* ============================================================
   MAIN SITE SCRIPT
   Header, mobile nav, search, FAQ accordion, brand injection.
   ============================================================ */
(function () {
  "use strict";

  const cfg = window.SITE_CONFIG || {};

  /* ---------- Inject Brand into header/footer ---------- */
  function injectBrand() {
    document.querySelectorAll("[data-site-name]").forEach((el) => {
      el.textContent = cfg.SITE_NAME || "CalcVerse";
    });
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = cfg.COPYRIGHT_YEAR || new Date().getFullYear();
    });
    document.querySelectorAll("[data-site-desc]").forEach((el) => {
      el.textContent = cfg.SITE_DESCRIPTION || "";
    });
    document.querySelectorAll("[data-contact-email]").forEach((el) => {
      el.textContent = cfg.CONTACT_EMAIL || "";
      if (el.tagName === "A") el.href = "mailto:" + (cfg.CONTACT_EMAIL || "");
    });
    // Update document title suffix
    const t = document.title;
    if (t && !t.includes(cfg.SITE_NAME || "")) {
      document.title = `${t} | ${cfg.SITE_NAME || "CalcVerse"}`;
    }
  }

  /* ---------- Mobile Nav Toggle ---------- */
  function initNavToggle() {
    const btn = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav");
    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !btn.contains(e.target)) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Site Search ---------- */
  function initSearch() {
    const input = document.getElementById("site-search");
    const results = document.getElementById("search-results");
    if (!input || !results || !window.TOOLS_DATA) return;

    const tools = window.TOOLS_DATA;
    let timer = null;

    function render(query) {
      const q = query.trim().toLowerCase();
      if (!q) {
        results.classList.remove("open");
        results.innerHTML = "";
        return;
      }
      const matches = tools
        .filter(
          (t) =>
            t.name.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q)
        )
        .slice(0, 12);

      if (matches.length === 0) {
        results.innerHTML = `<div class="search-empty">No tools found for “${escapeHtml(query)}”.</div>`;
      } else {
        results.innerHTML = matches
          .map(
            (t) => `
          <a class="search-result-item" href="/tools/${t.slug}/">
            <div class="sr-cat">${escapeHtml(t.category)}</div>
            <div class="sr-name">${escapeHtml(t.name)}</div>
            <div class="sr-desc">${escapeHtml(t.description)}</div>
          </a>`
          )
          .join("");
      }
      results.classList.add("open");
    }

    input.addEventListener("input", (e) => {
      clearTimeout(timer);
      const val = e.target.value;
      timer = setTimeout(() => render(val), 120);
    });

    input.addEventListener("focus", () => {
      if (input.value.trim()) render(input.value);
    });

    document.addEventListener("click", (e) => {
      if (!results.contains(e.target) && e.target !== input) {
        results.classList.remove("open");
      }
    });

    // Search form submit → go to tools index with query
    const form = input.closest("form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const q = input.value.trim();
        if (q) window.location.href = `/tools/?q=${encodeURIComponent(q)}`;
      });
    }
  }

  /* ---------- FAQ Accordion ---------- */
  function initFAQ() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const btn = item.querySelector(".faq-q");
      if (!btn) return;
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        // Close others in same group
        const parent = item.parentElement;
        if (parent) {
          parent.querySelectorAll(".faq-item.open").forEach((i) => {
            if (i !== item) i.classList.remove("open");
          });
        }
        item.classList.toggle("open", !isOpen);
        btn.setAttribute("aria-expanded", String(!isOpen));
      });
    });
  }

  /* ---------- Active Nav Highlight ---------- */
  function initActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll(".nav a").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;
      if (href !== "/" && path.startsWith(href)) {
        a.setAttribute("aria-current", "page");
      } else if (href === "/" && path === "/") {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- Render Tools by Category (for category pages) ---------- */
  function renderToolGrids() {
    document.querySelectorAll("[data-tools-category]").forEach((el) => {
      const cat = el.getAttribute("data-tools-category");
      if (!window.getToolsByCategory) return;
      const tools = window.getToolsByCategory(cat);
      if (!tools.length) return;
      el.innerHTML = tools
        .map(
          (t) => `
        <a class="card tool-card" href="/tools/${t.slug}/">
          <div class="icon" aria-hidden="true">${categoryIcon(t.category)}</div>
          <h3>${escapeHtml(t.name)}</h3>
          <p>${escapeHtml(t.description)}</p>
        </a>`
        )
        .join("");
    });

    // Popular tools (first 8 of a curated list)
    document.querySelectorAll("[data-popular-tools]").forEach((el) => {
      const popular = [
        "percentage-calculator",
        "loan-calculator",
        "bmi-calculator",
        "age-calculator",
        "compound-interest-calculator",
        "password-generator",
        "scientific-calculator",
        "date-calculator",
      ];
      el.innerHTML = popular
        .map((slug) => window.getToolBySlug(slug))
        .filter(Boolean)
        .map(
          (t) => `
        <a class="card tool-card" href="/tools/${t.slug}/">
          <div class="icon" aria-hidden="true">${categoryIcon(t.category)}</div>
          <h3>${escapeHtml(t.name)}</h3>
          <p>${escapeHtml(t.description)}</p>
        </a>`
        )
        .join("");
    });

    // Related tools on tool pages
    document.querySelectorAll("[data-related-tools]").forEach((el) => {
      const current = el.getAttribute("data-related-tools");
      const tool = window.getToolBySlug ? window.getToolBySlug(current) : null;
      if (!tool || !tool.related) return;
      const related = tool.related.map((s) => window.getToolBySlug(s)).filter(Boolean);
      el.innerHTML = related
        .map(
          (t) => `
        <a class="card tool-card" href="/tools/${t.slug}/">
          <h3>${escapeHtml(t.name)}</h3>
          <p>${escapeHtml(t.description)}</p>
        </a>`
        )
        .join("");
    });
  }

  function categoryIcon(cat) {
    const map = {
      Financial: "💰",
      Math: "📐",
      Health: "❤️",
      "Date & Time": "📅",
      Conversion: "🔄",
      Engineering: "⚙️",
      Developer: "👨‍💻",
    };
    return map[cat] || "🧮";
  }

  /* ---------- Utility: escape HTML ---------- */
  function escapeHtml(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  window.escapeHtml = escapeHtml;

  /* ---------- Number formatting helpers ---------- */
  window.formatNumber = function (n, decimals = 2) {
    if (n == null || !isFinite(n)) return "—";
    return Number(n).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };
  window.formatCurrency = function (n, currency = "USD") {
    if (n == null || !isFinite(n)) return "—";
    try {
      return Number(n).toLocaleString(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      });
    } catch {
      return "$" + Number(n).toFixed(2);
    }
  };

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    injectBrand();
    initNavToggle();
    initSearch();
    initFAQ();
    initActiveNav();
    renderToolGrids();
  });
})();
