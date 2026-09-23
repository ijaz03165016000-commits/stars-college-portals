/* Runs on every public page: menu, contact details, ticker, counters */
import { SITE } from "./config.js";
import { listAnnouncements } from "./data.js";
import { esc } from "./utils.js";

/* ---- Mobile menu ---- */
const nav = document.getElementById("site-nav");
const toggle = document.querySelector(".nav-toggle");
const backdrop = document.querySelector(".nav-backdrop");
function setMenu(open) {
  if (!nav) return;
  nav.classList.toggle("is-open", open);
  backdrop?.classList.toggle("is-open", open);
  toggle?.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
  if (open) nav.querySelector("a")?.focus();
}
toggle?.addEventListener("click", () => setMenu(true));
document.querySelector(".nav-close")?.addEventListener("click", () => { setMenu(false); toggle?.focus(); });
backdrop?.addEventListener("click", () => setMenu(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav?.classList.contains("is-open")) { setMenu(false); toggle?.focus(); } });

/* ---- Fill contact details from config.js ---- */
const wa = `https://wa.me/${SITE.whatsapp}`;
document.querySelectorAll("[data-site]").forEach((el) => {
  const key = el.dataset.site;
  const val = SITE[key];
  if (val == null) return;
  el.textContent = val;
  if (el.tagName === "A") {
    if (key === "phone") el.href = "tel:" + SITE.phone.replace(/[^\d+]/g, "");
    if (key === "email") el.href = "mailto:" + SITE.email;
  }
});
document.querySelectorAll("[data-wa]").forEach((el) => {
  const msg = el.dataset.wa;
  el.href = msg ? `${wa}?text=${encodeURIComponent(msg)}` : wa;
});
document.querySelectorAll("[data-social]").forEach((el) => {
  const url = SITE.social[el.dataset.social];
  if (url) el.href = url; else el.remove();
});
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

/* ---- Announcement ticker ---- */
const track = document.querySelector(".ticker__track");
if (track) {
  listAnnouncements().then((list) => {
    const items = list.slice(0, 6);
    if (!items.length) { document.querySelector(".ticker")?.remove(); return; }
    track.innerHTML = items.map((a) => {
      const urgent = a.urgent || a.category === "Urgent";
      return `<a href="announcements.html#n-${esc(a.id)}"${urgent ? ' class="is-urgent"' : ""}>${urgent ? "Urgent: " : ""}${esc(a.title)}</a>`;
    }).join("");
  }).catch(() => document.querySelector(".ticker")?.remove());
}

/* ---- Count-up stats (runs once when visible) ---- */
const counters = document.querySelectorAll("[data-count]");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (counters.length && "IntersectionObserver" in window && !reduce) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target; io.unobserve(el);
      const end = Number(el.dataset.count); const suffix = el.dataset.suffix || "";
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / 1200);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => io.observe(c));
}
