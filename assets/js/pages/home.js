import { listArticles, listAnnouncements } from "../data.js";
import { articleCard, noticeItem } from "../utils.js";

const artBox = document.getElementById("home-articles");
listArticles().then((list) => {
  artBox.innerHTML = list.length
    ? list.slice(0, 3).map(articleCard).join("")
    : `<p class="empty" style="grid-column:1/-1">New articles will appear here soon.</p>`;
}).catch(() => { artBox.innerHTML = `<p class="empty" style="grid-column:1/-1">Articles could not be loaded. Refresh the page to try again.</p>`; });

const nBox = document.getElementById("home-notices");
listAnnouncements().then((list) => {
  nBox.innerHTML = list.length
    ? list.slice(0, 5).map(noticeItem).join("")
    : `<li class="empty">No announcements right now.</li>`;
}).catch(() => { nBox.innerHTML = `<li class="empty">Announcements could not be loaded. Refresh the page to try again.</li>`; });

/* Testimonials slider */
const slider = document.getElementById("quotes");
if (slider) {
  const quotes = [...slider.querySelectorAll(".quote")];
  let i = 0, timer;
  const show = (n) => {
    quotes[i].classList.remove("is-active");
    i = (n + quotes.length) % quotes.length;
    quotes[i].classList.add("is-active");
  };
  slider.querySelectorAll("[data-dir]").forEach((b) =>
    b.addEventListener("click", () => { show(i + Number(b.dataset.dir)); clearInterval(timer); }));
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => show(i + 1), 8000);
}
