/* Accessible tabs; each tab can be opened by URL hash, e.g. programs.html#ics */
const tabs = [...document.querySelectorAll('[role="tab"]')];
const ALIASES = { intermediate: "pre-medical" };

function select(tab, focus = false) {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
  });
  if (focus) tab.focus();
}

tabs.forEach((t, i) => {
  t.addEventListener("click", () => {
    select(t);
    history.replaceState(null, "", "#" + t.getAttribute("aria-controls"));
  });
  t.addEventListener("keydown", (e) => {
    const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (dir) { e.preventDefault(); select(tabs[(i + dir + tabs.length) % tabs.length], true); }
    if (e.key === "Home") { e.preventDefault(); select(tabs[0], true); }
    if (e.key === "End") { e.preventDefault(); select(tabs[tabs.length - 1], true); }
  });
});

function fromHash() {
  const h = location.hash.slice(1);
  const id = ALIASES[h] || h;
  const tab = tabs.find((t) => t.getAttribute("aria-controls") === id);
  if (tab) {
    select(tab);
    document.querySelector(".tabs").scrollIntoView({ block: "start" });
  }
}
window.addEventListener("hashchange", fromHash);
fromHash();
