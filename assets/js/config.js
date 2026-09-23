/* ==========================================================
   STARs College — site settings
   1) Edit SITE with the college's real details. Phone numbers,
      email, address and social links across every page are
      filled in from here automatically.
   2) Paste your Firebase web config into FIREBASE_CONFIG
      (Firebase console → Project settings → Your apps → Web app).
      Until you do, the site runs in DEMO MODE with sample content.
   ========================================================== */

export const SITE = {
  name: "STARs College",
  tagline: "Shaping Stars of Tomorrow",
  city: "Mirpur, Azad Kashmir",
  board: "BISE Mirpur",
  phone: "0311-4857362",          // shown on the site
  whatsapp: "923114857362",       // international format, no + or dashes
  email: "info@starscollege.edu.pk",
  address: "Near BISE, Kotli Road, F-1, Mirpur AJK",
  timings: "Mon–Sat, 8:00 AM – 2:00 PM",
  mapQuery: "Mirpur, Azad Kashmir",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/"
  }
};

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA8JJGbCxIMQhtQMW0dJteqckNrI9fdzWs",
  authDomain: "stars-college-77fe9.firebaseapp.com",
  projectId: "stars-college-77fe9",
  storageBucket: "stars-college-77fe9.firebasestorage.app",
  messagingSenderId: "258893611281",
  appId: "1:258893611281:web:7a43b049e19cbd07828cb0"
};

/* Article and announcement categories (used by the site and the admin panel) */
export const ARTICLE_CATEGORIES = [
  "Education News", "Board Exams", "Study Tips", "Career Guidance", "Science & Tech", "College Events"
];
export const ANNOUNCEMENT_CATEGORIES = [
  "Admissions", "Exams", "Results", "Holidays", "Events", "Urgent"
];
