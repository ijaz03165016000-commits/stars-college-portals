const figs = [...document.querySelectorAll("#gallery figure")];
const filter = document.getElementById("gal-filter");
const lb = document.getElementById("lightbox");
const lbImg = lb.querySelector("img");
const lbCap = lb.querySelector(".lightbox__cap");
let visible = figs, idx = 0, lastFocus = null;

filter.addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  filter.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  const cat = b.dataset.cat;
  figs.forEach((f) => (f.hidden = cat !== "All" && f.dataset.cat !== cat));
  visible = figs.filter((f) => !f.hidden);
});

function show(i) {
  idx = (i + visible.length) % visible.length;
  const img = visible[idx].querySelector("img");
  lbImg.src = img.src; lbImg.alt = img.alt;
  lbCap.textContent = visible[idx].querySelector("figcaption").textContent;
}
function open(i) { lastFocus = document.activeElement; show(i); lb.classList.add("is-open"); document.body.style.overflow = "hidden"; lb.querySelector(".lightbox__close").focus(); }
function close() { lb.classList.remove("is-open"); document.body.style.overflow = ""; lastFocus?.focus(); }

figs.forEach((f) => f.querySelector("button").addEventListener("click", () => open(visible.indexOf(f))));
lb.querySelector(".lightbox__close").addEventListener("click", close);
lb.querySelector(".lightbox__nav--prev").addEventListener("click", () => show(idx - 1));
lb.querySelector(".lightbox__nav--next").addEventListener("click", () => show(idx + 1));
lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("is-open")) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") show(idx - 1);
  if (e.key === "ArrowRight") show(idx + 1);
});
