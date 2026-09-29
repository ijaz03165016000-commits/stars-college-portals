import * as store from "./store.js";
import { SITE } from "../../assets/js/config.js";
import { $, $$ } from "./ui.js";

const LABELS = {
  student: ["Student ID", "e.g. STR-9B-01"],
  parent: ["Parent ID", "e.g. P-9B-02"],
  staff: ["Staff ID", "e.g. T01"],
  principal: ["Principal ID", "principal"],
  admin: ["Admin ID", "admin"]
};
/* demo logins, each showing off a different feature (password is always demo123) */
const DEMO = {
  student: [
    ["STR-9B-01", "Hamza Aslam, 9 Bio — not subscribed yet (payment screen), ID card incomplete"],
    ["STR-12PM-02", "Ayesha Aslam, 12 Pre-Med — top student, renewal reminder"],
    ["STR-11PM-01", "Class 11 Pre-Med — ID card issued (print + QR)"],
    ["STR-10B-04", "10 Bio — subscription expired, fee unpaid"]
  ],
  parent: [
    ["P-ASLAM", "Muhammad Aslam — two children, messages with teachers"],
    ["P-RAZA", "Raja Khalid Raza — three children in 8, 10 and 12"],
    ["P-8-02", "Parent of one Class 8 student"]
  ],
  staff: [
    ["T01", "Prof. Tariq Mehmood — Physics, class teacher 12 Pre-Eng"],
    ["T08", "Mr. Adeel Raza — Computer Science, 12 ICS (attendance to mark)"],
    ["T16", "Ms. Uzma Parveen — English, Class 8 (subject teacher)"]
  ],
  principal: [["principal", "Prof. Dr. Khalid Mahmood — approvals, results, fee collection"]],
  admin: [["admin", "College office — students, staff, fees, subscriptions, ID cards"]]
};

const form = $("#login");
const role = () => form.role.value;

$$("[data-site]").forEach((el) => {
  const v = SITE[el.dataset.site]; if (!v) return;
  el.textContent = v; if (el.dataset.site === "phone") el.href = "tel:" + v.replace(/[^\d+]/g, "");
});

function syncRole() {
  const [label, ph] = LABELS[role()];
  $("#uid-label").textContent = label; $("#uid").placeholder = ph;
  try { localStorage.setItem("stars_portal_lastrole", role()); } catch {}
  if (!store.IS_LIVE) {
    const list = DEMO[role()];
    $("#demo").innerHTML = `<div class="demo-box"><strong>Demo school${store.DEMO_FORCED ? "" : " mode"}.</strong> 124 students, their parents and 20 staff. Password for every demo login: <strong>${store.DEMO_PASSWORD}</strong>.
      <ul class="demo-list">${list.map(([id, who]) => `<li><button type="button" class="linkbtn" data-demo="${id}">${id}</button> <span>${who}</span></li>`).join("")}</ul>
      ${store.DEMO_FORCED ? `<button type="button" class="linkbtn" id="exit-demo">Exit demo — back to the real portal</button>` : ""}</div>`;
    $$("[data-demo]").forEach((b) => (b.onclick = () => { $("#uid").value = b.dataset.demo; $("#pw").value = store.DEMO_PASSWORD; form.requestSubmit(); }));
    if ($("#exit-demo")) $("#exit-demo").onclick = () => { store.exitDemo(); location.replace("index.html"); };
  }
}
try { const r = localStorage.getItem("stars_portal_lastrole"); if (r && LABELS[r]) form.querySelector(`[value="${r}"]`).checked = true; } catch {}
const pre = new URLSearchParams(location.search).get("role");
if (pre && LABELS[pre]) form.querySelector(`[value="${pre}"]`).checked = true;
$$("[name=role]").forEach((r) => r.addEventListener("change", syncRole));
syncRole();

$("#pw-toggle").addEventListener("click", (e) => {
  const on = $("#pw").type === "password";
  $("#pw").type = on ? "text" : "password"; e.currentTarget.textContent = on ? "Hide" : "Show"; e.currentTarget.setAttribute("aria-pressed", on);
});

/* already signed in? go straight to the dashboard */
store.currentUser().then((u) => { if (u) location.replace("app.html"); }).catch(() => {});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const st = $(".form-status", form), btn = $("[type=submit]", form);
  st.className = "form-status";
  if (!form.uid.value.trim() || !form.pw.value) { st.textContent = "Enter your ID and password."; st.className = "form-status is-err"; return; }
  btn.disabled = true; btn.textContent = "Signing in…";
  try {
    const u = await store.signIn(form.uid.value, form.pw.value);
    if (u.role !== role()) {
      await store.signOut();
      throw new Error(`That is a ${u.role} account. Choose “${u.role[0].toUpperCase() + u.role.slice(1)}” above and sign in again.`);
    }
    location.replace("app.html");
  } catch (err) {
    const code = String(err.code || "");
    st.textContent = /invalid|wrong-password|user-not-found/.test(code) ? "ID or password is incorrect." : (err.message || "Could not sign in.");
    st.className = "form-status is-err";
    btn.disabled = false; btn.textContent = "Sign in";
  }
});
