/* ==========================================================
   STARs College portals — school structure
   Edit classes, subjects, periods and fees here.
   ========================================================== */

export const SESSION = "2026–27";

const MATRIC_BIO = ["English", "Urdu", "Islamiat / Pak Studies", "Mathematics", "Physics", "Chemistry", "Biology"];
const MATRIC_CS = ["English", "Urdu", "Islamiat / Pak Studies", "Mathematics", "Physics", "Chemistry", "Computer Science"];
const INTER_COMP = ["English", "Urdu", "Islamiat / Pak Studies"];

/* id is used everywhere in the database — don't change an id once students are enrolled */
export const CLASSES = [
  { id: "8",       level: 8,  group: "General",          name: "Class 8",                       subjects: ["English", "Urdu", "Mathematics", "General Science", "Islamiat", "Social Studies", "Computer"] },
  { id: "9-BIO",   level: 9,  group: "Science (Biology)", name: "Class 9 · Science (Biology)",   subjects: MATRIC_BIO },
  { id: "9-CS",    level: 9,  group: "Science (Computer)",name: "Class 9 · Science (Computer)",  subjects: MATRIC_CS },
  { id: "10-BIO",  level: 10, group: "Science (Biology)", name: "Class 10 · Science (Biology)",  subjects: MATRIC_BIO },
  { id: "10-CS",   level: 10, group: "Science (Computer)",name: "Class 10 · Science (Computer)", subjects: MATRIC_CS },
  { id: "11-PM",   level: 11, group: "Pre-Medical",       name: "Class 11 · Pre-Medical",        subjects: [...INTER_COMP, "Biology", "Chemistry", "Physics"] },
  { id: "11-PE",   level: 11, group: "Pre-Engineering",   name: "Class 11 · Pre-Engineering",    subjects: [...INTER_COMP, "Mathematics", "Physics", "Chemistry"] },
  { id: "11-ICS",  level: 11, group: "ICS",               name: "Class 11 · ICS",                subjects: [...INTER_COMP, "Computer Science", "Mathematics", "Physics"] },
  { id: "11-ICOM", level: 11, group: "I.Com",             name: "Class 11 · I.Com",              subjects: [...INTER_COMP, "Accounting", "Economics", "Commerce", "Business Maths"] },
  { id: "12-PM",   level: 12, group: "Pre-Medical",       name: "Class 12 · Pre-Medical",        subjects: [...INTER_COMP, "Biology", "Chemistry", "Physics"] },
  { id: "12-PE",   level: 12, group: "Pre-Engineering",   name: "Class 12 · Pre-Engineering",    subjects: [...INTER_COMP, "Mathematics", "Physics", "Chemistry"] },
  { id: "12-ICS",  level: 12, group: "ICS",               name: "Class 12 · ICS",                subjects: [...INTER_COMP, "Computer Science", "Mathematics", "Physics"] },
  { id: "12-ICOM", level: 12, group: "I.Com",             name: "Class 12 · I.Com",              subjects: [...INTER_COMP, "Accounting", "Banking", "Business Statistics", "Commercial Geography"] }
];
export const classById = (id) => CLASSES.find((c) => c.id === id);
export const className = (id) => classById(id)?.name || id || "—";
/* compact label for charts and tight spaces, e.g. "9 Bio", "11 Pre-Med" */
const SHORT = { "Science (Biology)": "Bio", "Science (Computer)": "Comp", "Pre-Medical": "Pre-Med", "Pre-Engineering": "Pre-Eng", "General": "" };
export const shortName = (id) => { const c = classById(id); if (!c) return id || "—"; const g = SHORT[c.group] ?? c.group; return `${c.level}${g ? " " + g : ""}`; };

/* Monthly tuition fee (PKR) by class level */
export const MONTHLY_FEE = { 8: 3500, 9: 4500, 10: 4500, 11: 6000, 12: 6000 };
export const FEE_DUE_DAY = 10;
export const LATE_FEE = 300;

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const PERIODS = [
  "8:00 – 8:45", "8:45 – 9:30", "9:30 – 10:15", "10:15 – 11:00",
  "11:30 – 12:15", "12:15 – 1:00", "1:00 – 1:45"
];
export const BREAK_AFTER = 3;   // break (11:00 – 11:30) after the 4th period

export const EXAM_TYPES = ["Weekly Test", "Monthly Test", "Mid-Term", "Send-up", "Final Term"];

export function grade(pct) {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  if (pct >= 40) return "E";
  return "F";
}

export const ROLES = {
  student:   { label: "Student",   home: "Student portal" },
  parent:    { label: "Parent",    home: "Parent portal" },
  staff:     { label: "Staff",     home: "Staff portal" },
  principal: { label: "Principal", home: "Principal's office" },
  admin:     { label: "Admin",     home: "Admin portal" }
};

/* ==========================================================
   Student portal subscription (paid access)
   Students must have an approved payment before the portal opens.
   Set enabled: false to switch the paywall off.
   ========================================================== */
export const SUBSCRIPTION = {
  enabled: true,
  amount: 200,               // Rs. per period
  days: 30,                  // access given per approved payment
  method: "EasyPaisa",
  account: "0344-0807888",
  title: "Muhammad Ijaz",
  remindDays: 5              // show a renewal reminder this many days before expiry
};
