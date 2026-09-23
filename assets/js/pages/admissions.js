import { addInquiry, IS_LIVE } from "../data.js";
import { SITE } from "../config.js";
import { PHONE_RE } from "../utils.js";

const GROUPS = {
  matric: ["Science (Biology)", "Science (Computer)"],
  inter: ["Pre-Medical", "Pre-Engineering", "ICS", "I.Com"]
};

const form = document.getElementById("admission-form");
const cls = form.classApplying;
const groupField = document.getElementById("group-field");
const group = form.group;
const status = form.querySelector(".form-status");

if (!IS_LIVE) {
  document.getElementById("form-demo-note").innerHTML =
    `<p class="demo-note">Demo mode: inquiries are saved in this browser only. Connect Firebase (see README) to receive them in the admin panel.</p>`;
}

function updateGroups(keep) {
  const n = Number(cls.value);
  const list = n >= 11 ? GROUPS.inter : n >= 9 ? GROUPS.matric : null;
  groupField.hidden = !list;
  group.required = !!list;
  group.innerHTML = `<option value="">Select a group</option>` +
    (list || []).map((g) => `<option${g === keep ? " selected" : ""}>${g}</option>`).join("");
}
cls.addEventListener("change", () => updateGroups());

/* Prefill from links like admissions.html?class=11&group=ICS#apply */
const params = new URLSearchParams(location.search);
if (params.get("class")) { cls.value = params.get("class"); updateGroups(params.get("group")); }

const RULES = {
  studentName: (v) => v.trim().length >= 3,
  fatherName: (v) => v.trim().length >= 3,
  phone: (v) => PHONE_RE.test(v.replace(/\s/g, "")),
  classApplying: (v) => !!v,
  group: (v) => groupField.hidden || !!v
};

function check(name) {
  const el = form[name];
  const ok = RULES[name](el.value);
  el.closest(".field").classList.toggle("has-error", !ok);
  el.setAttribute("aria-invalid", String(!ok));
  return ok;
}
Object.keys(RULES).forEach((n) => form[n].addEventListener("blur", () => { if (form[n].value) check(n); }));

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.className = "form-status";
  const results = Object.keys(RULES).map(check);
  if (results.includes(false)) {
    form.querySelector(".has-error input, .has-error select")?.focus();
    return;
  }
  const btn = form.querySelector('[type="submit"]');
  btn.disabled = true; btn.textContent = "Sending…";
  const data = Object.fromEntries(new FormData(form));
  data.type = "admission";
  data.phone = data.phone.replace(/\s/g, "");
  try {
    await addInquiry(data);
    const text = `Assalam-o-Alaikum, I just sent an admission inquiry for ${data.studentName} (Class ${data.classApplying}${data.group ? ", " + data.group : ""}).`;
    status.innerHTML = `Inquiry sent. Our office will call ${data.phone} within one working day. For a faster reply, <a href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}" target="_blank" rel="noopener">message us on WhatsApp</a>.`;
    status.className = "form-status is-ok";
    form.reset(); updateGroups();
  } catch (err) {
    status.textContent = "The inquiry was not sent because of a connection problem. Check your internet and send it again, or call the office.";
    status.className = "form-status is-err";
  } finally {
    btn.disabled = false; btn.textContent = "Send inquiry";
  }
});
