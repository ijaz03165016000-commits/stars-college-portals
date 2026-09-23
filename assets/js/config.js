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
  phone: "0300-0000000",          // shown on the site
  whatsapp: "923000000000",       // international format, no + or dashes
  email: "info@starscollege.edu.pk",
  address: "Main Campus, Sector F-1, Mirpur, Azad Kashmir",
  timings: "Mon–Sat, 8:00 AM – 2:00 PM",
  mapQuery: "Mirpur, Azad Kashmir",
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/"
  }
};

export const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

/* Article and announcement categories (used by the site and the admin panel) */
export const ARTICLE_CATEGORIES = [
  "Education News", "Board Exams", "Study Tips", "Career Guidance", "Science & Tech", "College Events"
];
export const ANNOUNCEMENT_CATEGORIES = [
  "Admissions", "Exams", "Results", "Holidays", "Events", "Urgent"
];
