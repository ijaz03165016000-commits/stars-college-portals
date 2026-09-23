/* ==========================================================
   Data layer — one place that talks to the database.
   • LIVE MODE: Firebase (Firestore + Storage + Auth) when
     FIREBASE_CONFIG in config.js is filled in.
   • DEMO MODE: sample content + this browser's localStorage,
     so the site and admin panel can be previewed without setup.
   ========================================================== */

import { FIREBASE_CONFIG } from "./config.js";
import { DEMO_ARTICLES, DEMO_ANNOUNCEMENTS } from "./demo-data.js";

export const IS_LIVE = !!FIREBASE_CONFIG.apiKey && !FIREBASE_CONFIG.apiKey.startsWith("YOUR_");

const FB_VER = "10.12.2";
const FB = (m) => `https://www.gstatic.com/firebasejs/${FB_VER}/firebase-${m}.js`;
let fbPromise = null;

function firebase() {
  if (!fbPromise) {
    fbPromise = (async () => {
      const [appMod, fs, st, au] = await Promise.all([
        import(FB("app")), import(FB("firestore")), import(FB("storage")), import(FB("auth"))
      ]);
      const app = appMod.getApps().length ? appMod.getApp() : appMod.initializeApp(FIREBASE_CONFIG);
      return { fs, st, au, db: fs.getFirestore(app), storage: st.getStorage(app), auth: au.getAuth(app) };
    })();
  }
  return fbPromise;
}

/* ---------- helpers ---------- */
const today = () => new Date().toISOString().slice(0, 10);
const byDateDesc = (a, b) => String(b.date).localeCompare(String(a.date));
export const slugify = (s) => String(s).toLowerCase().normalize("NFKD")
  .replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 70) || ("item-" + Date.now());

export function isExpired(a) { return !!a.expires && a.expires < today(); }

export function sortAnnouncements(list) {
  return [...list].sort((a, b) =>
    (Number(!!b.urgent) - Number(!!a.urgent)) ||
    (Number(!!b.pinned) - Number(!!a.pinned)) ||
    byDateDesc(a, b));
}

/* ---------- demo store (localStorage) ---------- */
const LS = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : structuredClone(fallback); }
    catch { return structuredClone(fallback); }
  },
  set(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); }
    catch { throw new Error("This browser's storage is full. Use smaller images in demo mode, or connect Firebase."); }
  }
};
const K = { art: "stars_demo_articles", ann: "stars_demo_announcements", inq: "stars_demo_inquiries", auth: "stars_demo_auth" };

/* ==========================================================
   ARTICLES
   ========================================================== */
export async function listArticles({ includeDrafts = false } = {}) {
  let list;
  if (IS_LIVE) {
    const { fs, db } = await firebase();
    const q = includeDrafts
      ? fs.collection(db, "articles")
      : fs.query(fs.collection(db, "articles"), fs.where("status", "==", "published"));
    const snap = await fs.getDocs(q);
    list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } else {
    list = LS.get(K.art, DEMO_ARTICLES);
    if (!includeDrafts) list = list.filter((a) => a.status === "published");
  }
  return list.sort(byDateDesc);
}

export async function getArticle(id) {
  if (!id) return null;
  if (IS_LIVE) {
    const { fs, db } = await firebase();
    const snap = await fs.getDoc(fs.doc(db, "articles", id));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  }
  return LS.get(K.art, DEMO_ARTICLES).find((a) => a.id === id) || null;
}

export async function saveArticle(article) {
  const data = { ...article, updatedAt: new Date().toISOString() };
  const id = data.id || slugify(data.title);
  delete data.id;
  if (IS_LIVE) {
    const { fs, db } = await firebase();
    await fs.setDoc(fs.doc(db, "articles", id), data);
  } else {
    const list = LS.get(K.art, DEMO_ARTICLES);
    const i = list.findIndex((a) => a.id === id);
    if (i >= 0) list[i] = { id, ...data }; else list.push({ id, ...data });
    LS.set(K.art, list);
  }
  return id;
}

export async function deleteArticle(id) {
  if (IS_LIVE) {
    const { fs, db } = await firebase();
    await fs.deleteDoc(fs.doc(db, "articles", id));
  } else {
    LS.set(K.art, LS.get(K.art, DEMO_ARTICLES).filter((a) => a.id !== id));
  }
}

/* ==========================================================
   ANNOUNCEMENTS
   ========================================================== */
export async function listAnnouncements({ includeExpired = false } = {}) {
  let list;
  if (IS_LIVE) {
    const { fs, db } = await firebase();
    const snap = await fs.getDocs(fs.collection(db, "announcements"));
    list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } else {
    list = LS.get(K.ann, DEMO_ANNOUNCEMENTS);
  }
  if (!includeExpired) list = list.filter((a) => !isExpired(a));
  return sortAnnouncements(list);
}

export async function saveAnnouncement(item) {
  const data = { ...item, updatedAt: new Date().toISOString() };
  let id = data.id;
  delete data.id;
  if (IS_LIVE) {
    const { fs, db } = await firebase();
    if (id) await fs.setDoc(fs.doc(db, "announcements", id), data);
    else id = (await fs.addDoc(fs.collection(db, "announcements"), data)).id;
  } else {
    const list = LS.get(K.ann, DEMO_ANNOUNCEMENTS);
    id = id || "a" + Date.now();
    const i = list.findIndex((a) => a.id === id);
    if (i >= 0) list[i] = { id, ...data }; else list.push({ id, ...data });
    LS.set(K.ann, list);
  }
  return id;
}

export async function deleteAnnouncement(id) {
  if (IS_LIVE) {
    const { fs, db } = await firebase();
    await fs.deleteDoc(fs.doc(db, "announcements", id));
  } else {
    LS.set(K.ann, LS.get(K.ann, DEMO_ANNOUNCEMENTS).filter((a) => a.id !== id));
  }
}

/* ==========================================================
   ADMISSION & CONTACT INQUIRIES
   ========================================================== */
export async function addInquiry(inq) {
  const data = { ...inq, contacted: false, createdAt: new Date().toISOString() };
  if (IS_LIVE) {
    const { fs, db } = await firebase();
    await fs.addDoc(fs.collection(db, "inquiries"), data);
  } else {
    const list = LS.get(K.inq, []);
    list.push({ id: "q" + Date.now(), ...data });
    LS.set(K.inq, list);
  }
}

export async function listInquiries() {
  let list;
  if (IS_LIVE) {
    const { fs, db } = await firebase();
    const snap = await fs.getDocs(fs.collection(db, "inquiries"));
    list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } else {
    list = LS.get(K.inq, []);
  }
  return list.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

export async function setInquiryContacted(id, contacted) {
  if (IS_LIVE) {
    const { fs, db } = await firebase();
    await fs.updateDoc(fs.doc(db, "inquiries", id), { contacted });
  } else {
    const list = LS.get(K.inq, []);
    const it = list.find((q) => q.id === id);
    if (it) it.contacted = contacted;
    LS.set(K.inq, list);
  }
}

export async function deleteInquiry(id) {
  if (IS_LIVE) {
    const { fs, db } = await firebase();
    await fs.deleteDoc(fs.doc(db, "inquiries", id));
  } else {
    LS.set(K.inq, LS.get(K.inq, []).filter((q) => q.id !== id));
  }
}

/* ==========================================================
   FILE UPLOADS (cover images, PDFs)
   ========================================================== */
const MAX_MB = 5;
export async function uploadFile(file, folder = "uploads") {
  if (file.size > MAX_MB * 1024 * 1024) throw new Error(`File is larger than ${MAX_MB} MB. Compress it and try again.`);
  if (IS_LIVE) {
    const { st, storage } = await firebase();
    const safe = file.name.replace(/[^\w.-]+/g, "_");
    const r = st.ref(storage, `${folder}/${Date.now()}_${safe}`);
    await st.uploadBytes(r, file, { contentType: file.type });
    return st.getDownloadURL(r);
  }
  // Demo mode: keep small files inside the browser as data URLs
  if (file.size > 700 * 1024) throw new Error("In demo mode, files must be under 700 KB. Connect Firebase to upload larger files.");
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => rej(new Error("Could not read that file."));
    fr.readAsDataURL(file);
  });
}

/* ==========================================================
   ADMIN AUTH
   ========================================================== */
export async function signIn(email, password) {
  if (IS_LIVE) {
    const { au, auth } = await firebase();
    await au.signInWithEmailAndPassword(auth, email, password);
    return;
  }
  if (email === "demo@stars" && password === "demo123") {
    sessionStorage.setItem(K.auth, "1");
    return;
  }
  throw new Error("Demo mode: sign in with demo@stars / demo123");
}

export async function signOutAdmin() {
  if (IS_LIVE) { const { au, auth } = await firebase(); await au.signOut(auth); }
  sessionStorage.removeItem(K.auth);
}

export async function onAdminAuth(cb) {
  if (IS_LIVE) {
    const { au, auth } = await firebase();
    // Portal users (students, parents, staff) also have logins — only admin/principal may use the website admin
    au.onAuthStateChanged(auth, async (u) => {
      if (!u) return cb(null);
      try {
        const { fs, db } = await firebase();
        const p = await fs.getDoc(fs.doc(db, "users", u.uid));
        const role = p.exists() ? p.data().role : "";
        if (role === "admin" || role === "principal") return cb({ email: u.email });
      } catch {}
      await au.signOut(auth);
      alert("This login can't manage the website. Sign in with the college admin account.");
      cb(null);
    });
  } else {
    cb(sessionStorage.getItem(K.auth) ? { email: "demo@stars" } : null);
  }
}

export function resetDemo() {
  Object.values(K).forEach((k) => { try { localStorage.removeItem(k); } catch {} });
}
