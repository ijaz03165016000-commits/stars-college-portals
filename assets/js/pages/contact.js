import { addInquiry, IS_LIVE } from "../data.js";
import { SITE } from "../config.js";
import { PHONE_RE } from "../utils.js";

document.getElementById("map").src = `https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&z=14&output=embed`;

const form = document.getElementById("contact-form");
const status = form.querySelector(".form-status");
if (!IS_LIVE) {
  document.getElementById("form-demo-note").innerHTML =
    `<p class="demo-note">Demo mode: messages are saved in this browser only. Connect Firebase (see README) to receive them in the admin panel.</p>`;
}

const RULES = {
  name: (v) => v.trim().length >= 2,
  phone: (v) => PHONE_RE.test(v.replace(/\s/g, "")),
  email: (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  message: (v) => v.trim().length >= 10
};
function check(n) {
  const el = form[n]; const ok = RULES[n](el.value);
  el.closest(".field").classList.toggle("has-error", !ok);
  el.setAttribute("aria-invalid", String(!ok));
  return ok;
}
Object.keys(RULES).forEach((n) => form[n].addEventListener("blur", () => { if (form[n].value) check(n); }));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.className = "form-status";
  if (Object.keys(RULES).map(check).includes(false)) { form.querySelector(".has-error input, .has-error textarea")?.focus(); return; }
  const btn = form.querySelector('[type="submit"]');
  btn.disabled = true; btn.textContent = "Sending…";
  const d = Object.fromEntries(new FormData(form));
  try {
    await addInquiry({ type: "contact", studentName: d.name, phone: d.phone.replace(/\s/g, ""), email: d.email, subject: d.subject, message: d.message });
    status.textContent = "Message sent. The college office will reply within one working day.";
    status.className = "form-status is-ok";
    form.reset();
  } catch {
    status.textContent = "The message was not sent because of a connection problem. Check your internet and try again, or call the office.";
    status.className = "form-status is-err";
  } finally { btn.disabled = false; btn.textContent = "Send message"; }
});
