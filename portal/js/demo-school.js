/* Sample school used in DEMO MODE only (and on a live site via /portal/?demo=1).
   124 students with their parents, 20 teachers, principal and admin.
   Generated relative to today's date so attendance, fees and homework always look current.
   Every demo login uses the password demo123. See PORTALS.md → "Demo school" for a
   feature-by-feature list of logins to show. */
import { CLASSES, DAYS, PERIODS, MONTHLY_FEE, FEE_DUE_DAY, ID_CARD } from "./school.js";

const PW = "demo123";

/* small deterministic random generator so the demo is the same every time */
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
const R = rng(20260929);
const pick = (a) => a[Math.floor(R() * a.length)];
const between = (lo, hi) => Math.round(lo + R() * (hi - lo));

export const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

const BOYS = ["Muhammad Ali", "Ahmed", "Hamza", "Usman", "Bilal", "Zain", "Abdullah", "Hassan", "Talha", "Saad", "Umar", "Fahad", "Arslan", "Danish", "Haris", "Shayan", "Rehan", "Waleed", "Ali Raza", "Moiz", "Huzaifa", "Ibrahim", "Muneeb", "Faizan", "Taimoor", "Owais", "Sufyan", "Anas", "Aqib", "Junaid", "Kamran", "Adnan", "Shahzaib", "Zohaib", "Hammad", "Uzair", "Mustafa", "Yasir", "Salman", "Awais"];
const GIRLS = ["Ayesha", "Fatima", "Maryam", "Zainab", "Hira", "Iqra", "Laiba", "Mahnoor", "Aleena", "Rimsha", "Areeba", "Kinza", "Noor ul Ain", "Eman", "Sidra", "Anum", "Hafsa", "Mehwish", "Alishba", "Javeria", "Sana", "Momina", "Amna", "Khadija", "Rabia", "Saba", "Tayyaba", "Ifra", "Muqaddas", "Arooj", "Bushra", "Nimra", "Aiman", "Hadia", "Minahil", "Zoya", "Fiza", "Mahrukh", "Esha", "Urooj"];
const FATHER_FIRST = ["Muhammad Aslam", "Tariq", "Javed", "Raja Khalid", "Chaudhry Nadeem", "Sardar Imtiaz", "Abdul Rasheed", "Mirza Shahid", "Khurshid", "Zafar", "Raja Waheed", "Ghulam Mustafa", "Saeed", "Nazir", "Mushtaq", "Riaz", "Pervaiz", "Arshad", "Shafiq", "Liaquat", "Maqsood", "Azhar", "Sajjad", "Amjad", "Naveed", "Rizwan", "Asghar", "Bashir", "Manzoor", "Iftikhar", "Khalil", "Shaukat"];
const SURNAMES = ["Khan", "Mir", "Butt", "Qureshi", "Awan", "Abbasi", "Kiani", "Shah", "Mughal", "Malik", "Siddiqui", "Hashmi", "Bukhari", "Hussain", "Ahmed", "Iqbal", "Akhtar", "Javed", "Anwar", "Rafique", "Nawaz", "Mehmood", "Bhatti", "Chughtai", "Zaman", "Rehman", "Latif", "Sadiq", "Younas", "Farooq"];
const AREAS = ["Sector F-1", "Sector F-2", "Sector F-3", "Sector C-4", "Sector D-1", "Sector D-4", "Allama Iqbal Road", "Chakswari Road", "Kotli Road", "New City", "Mian Muhammad Road", "Sector B-3", "Dadyal Road", "Sector A-2", "Pull Manda", "Nangi", "Khaliqabad", "Chitterpari"];

/* levels = class levels this teacher takes; the most specific teacher gets a subject
   (e.g. Class 8 English goes to the Class 8 English teacher, not the Matric one) */
const STAFF = [
  { id: "T01", name: "Prof. Tariq Mehmood", designation: "Senior Lecturer", subjects: ["Physics"], levels: [9, 10, 11, 12], classTeacherOf: "12-PE", gender: "M" },
  { id: "T02", name: "Dr. Saima Bashir", designation: "Senior Lecturer", subjects: ["Biology"], levels: [9, 10, 11, 12], classTeacherOf: "12-PM", gender: "F" },
  { id: "T03", name: "Mr. Imran Qureshi", designation: "Lecturer", subjects: ["Chemistry"], levels: [9, 10, 11, 12], classTeacherOf: "11-PM", gender: "M" },
  { id: "T04", name: "Ms. Nadia Aslam", designation: "Lecturer", subjects: ["English"], levels: [8, 9, 10], classTeacherOf: "10-BIO", gender: "F" },
  { id: "T05", name: "Mr. Waqas Ahmed", designation: "Lecturer", subjects: ["Mathematics", "Business Maths"], levels: [9, 10, 11, 12], classTeacherOf: "11-PE", gender: "M" },
  { id: "T06", name: "Ms. Rabia Noor", designation: "Teacher", subjects: ["Urdu"], levels: [8, 9, 10, 11, 12], classTeacherOf: "9-BIO", gender: "F" },
  { id: "T07", name: "Hafiz Muhammad Usman", designation: "Teacher", subjects: ["Islamiat", "Islamiat / Pak Studies", "Social Studies"], levels: [8, 9, 10, 11, 12], classTeacherOf: "8", gender: "M" },
  { id: "T08", name: "Mr. Adeel Raza", designation: "Lecturer", subjects: ["Computer Science", "Computer"], levels: [8, 9, 10, 11, 12], classTeacherOf: "12-ICS", gender: "M" },
  { id: "T09", name: "Ms. Sana Javed", designation: "Lecturer", subjects: ["Accounting", "Banking", "Business Statistics"], levels: [11, 12], classTeacherOf: "12-ICOM", gender: "F" },
  { id: "T10", name: "Mr. Kashif Mir", designation: "Lecturer", subjects: ["Economics", "Commerce", "Commercial Geography"], levels: [11, 12], classTeacherOf: "11-ICOM", gender: "M" },
  { id: "T11", name: "Ms. Hina Latif", designation: "Teacher", subjects: ["General Science", "Mathematics"], levels: [8], classTeacherOf: "9-CS", gender: "F" },
  { id: "T12", name: "Mr. Zubair Khan", designation: "Lecturer", subjects: ["English"], levels: [11, 12], classTeacherOf: "11-ICS", gender: "M" },
  { id: "T13", name: "Ms. Amina Riaz", designation: "Teacher", subjects: ["Chemistry", "Physics"], levels: [9, 10], classTeacherOf: "10-CS", gender: "F" },
  { id: "T14", name: "Ms. Farah Naz", designation: "Teacher", subjects: ["Biology"], levels: [9, 10], classTeacherOf: "", gender: "F" },
  { id: "T15", name: "Mr. Shahzad Akram", designation: "Lecturer", subjects: ["Mathematics"], levels: [11, 12], classTeacherOf: "", gender: "M" },
  { id: "T16", name: "Ms. Uzma Parveen", designation: "Teacher", subjects: ["English"], levels: [8], classTeacherOf: "", gender: "F" },
  { id: "T17", name: "Mr. Naveed Anjum", designation: "Lecturer", subjects: ["Urdu"], levels: [11, 12], classTeacherOf: "", gender: "M" },
  { id: "T18", name: "Ms. Shazia Kanwal", designation: "Teacher", subjects: ["Computer Science", "Computer"], levels: [8, 9, 10], classTeacherOf: "", gender: "F" },
  { id: "T19", name: "Mr. Abdul Qayyum", designation: "Lecturer", subjects: ["Islamiat / Pak Studies"], levels: [11, 12], classTeacherOf: "", gender: "M" },
  { id: "T20", name: "Ms. Saba Kiran", designation: "Lecturer", subjects: ["Business Maths", "Business Statistics"], levels: [11, 12], classTeacherOf: "", gender: "F" }
];

const BY_SPECIFIC = [...STAFF].sort((a, b) => a.levels.length - b.levels.length);
function teacherFor(subject, level) {
  return (BY_SPECIFIC.find((t) => t.subjects.includes(subject) && t.levels.includes(level))
    || STAFF.find((t) => t.subjects.includes(subject)))?.id || "";
}
const staffName = (id) => STAFF.find((t) => t.id === id)?.name || "";

function schoolDaysBack(from, n) {
  const out = []; let d = new Date(from);
  while (out.length < n) { if (d.getDay() !== 0) out.push(iso(d)); d = addDays(d, -1); }
  return out.reverse();
}

/* passport-style illustrated photo (SVG data URL), so ID cards can be shown issued */
const SKIN = ["#F1C9A5", "#E4B48F", "#D6A07A", "#C68B65", "#EBC09C"];
const HAIR = ["#1E1813", "#2B2019", "#3A2A1F", "#241C17"];
const SCARF = ["#FFFFFF", "#1F3A68", "#6B2D5C", "#2F5D50", "#8A6A2B", "#3C3C4A"];
function photo(gender, kind) {
  const skin = pick(SKIN), hair = pick(HAIR);
  const cloth = kind === "staff" ? pick(["#2E3440", "#4A4E57", "#1F2A44", "#5A4636"]) : "#1B2F5E";
  const girl = gender === "F";
  const scarf = pick(SCARF);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150"><rect width="120" height="150" fill="#DCE7F2"/>`
    + (girl ? `<path d="M26 70c0-28 15-46 34-46s34 18 34 46v34H26z" fill="${scarf}"/>` : "")
    + `<path d="M12 150c3-32 22-48 48-48s45 16 48 48z" fill="${cloth}"/>`
    + (kind !== "staff" ? `<path d="M52 102l8 14 8-14z" fill="#FFFFFF"/>` : `<path d="M50 102l10 16 10-16z" fill="#F2F2F2"/>`)
    + (girl ? `<path d="M26 96c8 10 20 14 34 14s26-4 34-14l4 12c-10 8-22 12-38 12s-28-4-38-12z" fill="${scarf}"/>` : "")
    + `<rect x="52" y="80" width="16" height="20" rx="6" fill="${skin}"/>`
    + `<ellipse cx="60" cy="62" rx="22" ry="26" fill="${skin}"/>`
    + (girl ? `<path d="M36 58c2-18 12-28 24-28s22 10 24 28c-6-9-14-14-24-14s-18 5-24 14z" fill="${scarf}"/>`
            : `<path d="M37 56c0-18 10-28 23-28s23 10 23 28c-4-7-12-12-23-12s-19 5-23 12z" fill="${hair}"/>`)
    + `<circle cx="51" cy="63" r="2.4" fill="#2A211B"/><circle cx="69" cy="63" r="2.4" fill="#2A211B"/>`
    + `<path d="M53 75c4 3 10 3 14 0" stroke="#8A4E3A" stroke-width="2" fill="none" stroke-linecap="round"/>`
    + (!girl && kind === "staff" && R() < 0.5 ? `<path d="M40 70c2 16 10 24 20 24s18-8 20-24c-4 8-10 11-20 11s-16-3-20-11z" fill="${hair}"/>` : "")
    + `</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const verifyCode = () => Array.from({ length: 12 }, () => CODE_CHARS[Math.floor(R() * 32)]).join("");
const addYears = (isoDate, n) => { const [y, m, d] = isoDate.split("-"); return `${+y + n}-${m}-${d}`; };

export function buildDemoSchool() {
  const now = new Date();
  const today = iso(now);
  const users = {}, students = {}, staff = {}, timetable = {}, attendance = {}, staffAttendance = {};
  const exams = {}, homework = {}, fees = {}, leaves = {}, notices = {}, messages = {}, cardVerify = {};

  /* ---- Leadership & office ---- */
  users.principal = { role: "principal", name: "Prof. Dr. Khalid Mahmood", loginId: "principal", password: PW };
  users.admin = { role: "admin", name: "College Office (Admin)", loginId: "admin", password: PW };

  /* ---- Staff ---- */
  STAFF.forEach((t, i) => {
    const classIds = CLASSES.filter((c) => c.subjects.some((s) => teacherFor(s, c.level) === t.id)).map((c) => c.id);
    staff[t.id] = {
      name: t.name, designation: t.designation, subjects: t.subjects, classIds, classTeacherOf: t.classTeacherOf,
      phone: `03${between(0, 4)}${between(0, 9)}-${between(1000000, 9999999)}`, email: `${t.id.toLowerCase()}@starscollege.edu.pk`,
      joinDate: `20${String(12 + (i % 13)).padStart(2, "0")}-${String(1 + (i % 9)).padStart(2, "0")}-01`,
      qualification: t.designation.includes("Senior") ? "M.Phil" : t.designation === "Lecturer" ? "M.Sc / M.A" : "B.Ed, M.A",
      gender: t.gender, bloodGroup: ["B+", "O+", "A+", "AB+", "O-", "A-"][i % 6], address: `${AREAS[i % AREAS.length]}, Mirpur AJK`
    };
    users[t.id] = { role: "staff", name: t.name, loginId: t.id, linkId: t.id, password: PW };
  });

  /* subscription: positive = days of access left, negative = expired that many days ago */
  const subUntil = (daysLeft) => { const d = addDays(now, daysLeft); return { subscribedUntil: iso(d), subscribedUntilMs: new Date(iso(d) + "T23:59:59").getTime() }; };

  /* ---- Students (124): Class 8 → 12, Matric 10 per class, Inter 9 per class ---- */
  const takenNames = new Set();
  const newName = (girl, surname) => {
    for (let k = 0; k < 200; k++) {
      const n = `${pick(girl ? GIRLS : BOYS)} ${surname}`;
      if (!takenNames.has(n)) { takenNames.add(n); return n; }
      surname = pick(SURNAMES);
    }
    return `${pick(girl ? GIRLS : BOYS)} ${surname}`;
  };
  const codeOf = (cid) => cid.replace("-", "").replace("BIO", "B").replace(/^(\d+)CS$/, "$1C").replace("ICS", "CS").replace("ICOM", "CM");
  CLASSES.forEach((c) => {
    const count = c.level === 8 ? 12 : c.level <= 10 ? 10 : 9;
    for (let n = 1; n <= count; n++) {
      const girl = R() < 0.45;
      const surname = pick(SURNAMES);
      const id = `STR-${codeOf(c.id)}-${String(n).padStart(2, "0")}`;
      const yearBorn = 2026 - (c.level + 5) - (R() < 0.3 ? 1 : 0);
      students[id] = {
        name: newName(girl, surname), gender: girl ? "F" : "M",
        classId: c.id, rollNo: n, fatherName: `${pick(FATHER_FIRST)} ${surname}`, phone: `03${between(0, 4)}${between(0, 9)}-${between(1000000, 9999999)}`,
        dob: `${yearBorn}-${String(between(1, 12)).padStart(2, "0")}-${String(between(1, 28)).padStart(2, "0")}`,
        address: `House ${between(1, 420)}, ${pick(AREAS)}, Mirpur AJK`, admissionDate: [8, 9, 11].includes(c.level) ? "2026-04-01" : "2025-04-01",
        status: "active", bloodGroup: pick(["A+", "B+", "O+", "AB+", "A-", "B+", "O+", "O-"])
      };
      users[id] = { role: "student", name: students[id].name, loginId: id, linkId: id, classId: c.id, password: PW, ...subUntil(R() < 0.85 ? between(3, 28) : -between(1, 20)) };
    }
  });

  /* ---- Families: one parent login per family; a few families have 2–3 children ---- */
  const kidA = "STR-9B-01", kidB = "STR-12PM-02";
  const setFamily = (kids, father, surname, names) => {
    const phone = students[kids[0]].phone, addr = students[kids[0]].address;
    kids.forEach((k, i) => {
      const s = students[k];
      if (names?.[i]) { s.name = names[i][0]; s.gender = names[i][1]; }
      else s.name = s.name.split(" ").slice(0, -1).join(" ") + " " + surname;
      s.fatherName = father; s.phone = phone; s.address = addr; users[k].name = s.name;
    });
  };
  setFamily([kidA, kidB], "Muhammad Aslam", "Aslam", [["Hamza Aslam", "M"], ["Ayesha Aslam", "F"]]);
  setFamily(["STR-8-05", "STR-10B-03", "STR-12PE-02"], "Raja Khalid Raza", "Raza", [["Ali Raza", "M"], ["Maryam Raza", "F"], ["Usman Raza", "M"]]);
  const siblingSets = [["STR-8-07", "STR-11CS-03"], ["STR-9C-02", "STR-11PE-04"], ["STR-10C-06", "STR-12CM-05"], ["STR-9B-06", "STR-11CM-02"], ["STR-10B-08", "STR-12CS-03"]];
  siblingSets.forEach((set) => { const sur = students[set[0]].name.split(" ").at(-1); setFamily(set, students[set[0]].fatherName, sur); });

  delete students[kidA].bloodGroup;   // demo: this student still has details to fill in for the ID card
  delete users[kidA].subscribedUntil; delete users[kidA].subscribedUntilMs;   // demo student sees the payment screen
  Object.assign(users[kidB], subUntil(3));                                     // …and this one gets a renewal reminder
  Object.assign(users["STR-10B-04"], subUntil(-6));                            // expired subscription

  /* two students who left the college (login switched off) */
  ["STR-10C-10", "STR-11CM-09"].forEach((sid) => { students[sid].status = "left"; users[sid].disabled = true; });

  const families = {};
  const familyKey = (sid) => {
    if (sid === kidA || sid === kidB) return "P-ASLAM";
    if (["STR-8-05", "STR-10B-03", "STR-12PE-02"].includes(sid)) return "P-RAZA";
    const set = siblingSets.find((x) => x.includes(sid));
    return "P-" + (set ? set[0] : sid).slice(4);
  };
  Object.entries(students).forEach(([sid, s]) => (families[familyKey(sid)] ||= { name: s.fatherName, kids: [] }).kids.push(sid));
  Object.entries(families).forEach(([pid, f]) => {
    users[pid] = { role: "parent", name: f.name, loginId: pid, children: f.kids, childClassIds: f.kids.map((k) => students[k].classId), password: PW };
    f.kids.forEach((k) => (students[k].parentId = pid));
  });

  const active = Object.entries(students).filter(([, s]) => s.status !== "left");
  const byClass = {};
  active.forEach(([sid, s]) => (byClass[s.classId] ||= []).push(sid));

  /* ---- ID cards: whole of 11 & 12 Pre-Medical issued, plus about a third of the rest;
         some others have a photo but are not issued yet ("Ready"), the rest "Incomplete" ---- */
  const issueCard = (kind, id, rec, daysAgo) => {
    const issued = iso(addDays(now, -daysAgo));
    const code = verifyCode();
    Object.assign(rec, { cardNo: kind === "student" ? id : "EMP-" + id, cardIssuedAt: issued, cardValidUntil: kind === "student" ? ID_CARD.studentValidUntil : addYears(issued, ID_CARD.staffValidYears), verifyCode: code });
    cardVerify[code] = {
      kind, ref: id, cardNo: rec.cardNo, name: rec.name, photo: rec.photo,
      ...(kind === "student" ? { fatherName: rec.fatherName, classId: rec.classId, rollNo: rec.rollNo } : { designation: rec.designation }),
      issuedAt: issued, validUntil: rec.cardValidUntil, status: "valid"
    };
    return code;
  };
  active.forEach(([sid, s]) => {
    if (sid === kidA) return;
    const r = R();
    const issue = s.classId === "11-PM" || s.classId === "12-PM" || r < 0.33;
    if (issue || r < 0.5) s.photo = photo(s.gender, "student");
    if (issue) issueCard("student", sid, s, between(2, 40));
  });
  /* STR-11PM-01's card was re-issued: the old QR code now shows "Cancelled" */
  const old = verifyCode();
  const s1 = students["STR-11PM-01"];
  cardVerify[old] = { kind: "student", ref: "STR-11PM-01", cardNo: "STR-11PM-01", name: s1.name, photo: s1.photo, fatherName: s1.fatherName, classId: s1.classId, rollNo: s1.rollNo, issuedAt: iso(addDays(now, -60)), validUntil: ID_CARD.studentValidUntil, status: "revoked" };
  STAFF.forEach((t, i) => {
    if (i < 17) staff[t.id].photo = photo(t.gender, "staff");
    if (i < 14) issueCard("staff", t.id, staff[t.id], between(10, 200));
  });

  /* ---- Timetables ---- */
  CLASSES.forEach((c) => {
    const days = {};
    DAYS.forEach((day, di) => {
      days[day] = PERIODS.map((_, p) => {
        const subject = c.subjects[(p + di * 2) % c.subjects.length];
        return { subject, teacherId: teacherFor(subject, c.level) };
      });
      if (day === "Sat") days[day] = days[day].slice(0, 5);
    });
    timetable[c.id] = { classId: c.id, days };
  });

  /* ---- Attendance (last 30 school days, not future) ---- */
  const lastDay = now.getDay() === 0 ? addDays(now, -1) : now;
  const days = schoolDaysBack(lastDay, 30);
  const weak = new Set(["STR-10B-04", "STR-11PE-06", "STR-9C-07"]);   // low attendance, shows up in reports
  days.forEach((d) => {
    CLASSES.forEach((c) => {
      if (d === today && ["11-ICOM", "12-ICOM", "10-CS", "12-ICS"].includes(c.id)) return;  // a few classes still to be marked today
      const records = {};
      byClass[c.id].forEach((sid) => {
        const r = R();
        const a = weak.has(sid) ? 0.25 : 0.06;
        records[sid] = r < a ? "A" : r < a + 0.03 ? "L" : "P";
      });
      attendance[`${c.id}_${d}`] = { classId: c.id, date: d, records, markedBy: STAFF.find((t) => t.classTeacherOf === c.id)?.id || "" };
    });
    const recs = {};
    STAFF.forEach((t) => { const r = R(); recs[t.id] = r < 0.04 ? "A" : r < 0.07 ? "L" : "P"; });
    staffAttendance[d] = { date: d, records: recs };
  });

  /* ---- Exams & marks ---- */
  const m = now.getMonth();
  const monthName = (k) => new Date(now.getFullYear(), k, 1).toLocaleString("en", { month: "long" });
  const examDefs = [
    { key: "MT-" + (m - 2), name: `Monthly Test — ${monthName(m - 2)}`, type: "Monthly Test", date: iso(new Date(now.getFullYear(), m - 2, 26)), total: 25, published: true },
    { key: "MT-" + (m - 1), name: `Monthly Test — ${monthName(m - 1)}`, type: "Monthly Test", date: iso(new Date(now.getFullYear(), m - 1, 26)), total: 25, published: true },
    { key: "MID-" + m, name: "Mid-Term Examination", type: "Mid-Term", date: iso(addDays(now, -9)), total: 75, published: false }
  ];
  const ability = {};
  active.forEach(([sid]) => (ability[sid] = 0.45 + R() * 0.5));
  ability[kidA] = 0.83; ability[kidB] = 0.93; ability["STR-10B-04"] = 0.38;
  CLASSES.forEach((c) => {
    examDefs.forEach((e) => {
      const subjects = {};
      c.subjects.forEach((s, si) => {
        const marks = {};
        const pending = !e.published && si >= c.subjects.length - 2;   // mid-term: last two subjects not entered yet
        if (!pending) byClass[c.id].forEach((sid) => {
          const r = R();
          marks[sid] = r < 0.02 ? "AB" : Math.max(0, Math.min(e.total, Math.round(e.total * (ability[sid] + (R() - 0.5) * 0.25))));
        });
        subjects[s] = { total: e.total, marks, teacherId: teacherFor(s, c.level) };
      });
      exams[`${e.key}_${c.id}`] = { examKey: e.key, name: e.name, type: e.type, date: e.date, classId: c.id, published: e.published, subjects };
    });
  });

  /* ---- Fees: last 3 months ---- */
  const months = [-2, -1, 0].map((k) => { const d = new Date(now.getFullYear(), m + k, 1); return iso(d).slice(0, 7); });
  let receipt = 4100;
  Object.entries(students).forEach(([sid, s]) => {
    const level = CLASSES.find((c) => c.id === s.classId).level;
    months.forEach((mo, k) => {
      if (s.status === "left" && k === 2) return;
      const amount = MONTHLY_FEE[level];
      const r = R();
      let paid = k < 2 ? r > 0.05 : r > 0.45;
      if (sid === "STR-10B-04" && k > 0) paid = false;          // defaulter: two months unpaid
      if (sid === kidA && k === 2) paid = false;
      const due = `${mo}-${String(FEE_DUE_DAY).padStart(2, "0")}`;
      fees[`${sid}_${mo}`] = {
        studentId: sid, classId: s.classId, month: mo, amount, due,
        items: [{ label: "Tuition fee", amount }], status: paid ? "paid" : "unpaid",
        paidOn: paid ? `${mo}-${String(between(2, FEE_DUE_DAY)).padStart(2, "0")}` : "", receiptNo: paid ? "RC-" + receipt++ : "",
        challanNo: `CH-${mo.replace("-", "")}-${sid.slice(4)}`
      };
    });
  });

  /* ---- Homework ---- */
  const HW = {
    Physics: ["Numericals 3.1 – 3.8", "Draw and label a ray diagram for a convex lens"], Chemistry: ["Balance the equations on page 42", "Learn the first 20 elements with valencies"],
    Biology: ["Diagram of the human heart with labels", "Short questions, Chapter 4"], Mathematics: ["Exercise 5.2, Q1 – Q12", "Revise quadratic formula; 10 practice questions"],
    English: ["Essay: 'My Aim in Life' (250 words)", "Learn the idioms list 3"], Urdu: ["خلاصہ: سبق نمبر 5", "Mazmoon: 'Waqt ki Pabandi'"],
    "Computer Science": ["Write a C++ program to find the largest of three numbers", "Short notes on the OSI model"], Computer: ["Type a one-page letter in MS Word", "Label the parts of a computer"],
    "General Science": ["Draw the water cycle", "Short questions, Chapter 3"], Accounting: ["Prepare the trial balance of Q7", "Journal entries Exercise 3"],
    Economics: ["Define demand and draw its curve", "Short questions, Chapter 2"], "Business Maths": ["Exercise 2.4 — percentages", "Simple interest, Q1 – Q10"]
  };
  let hi = 0;
  CLASSES.forEach((c) => {
    c.subjects.filter((s) => HW[s]).slice(0, 4).forEach((s, k) => {
      const t = teacherFor(s, c.level);
      homework["hw" + hi++] = {
        classId: c.id, subject: s, title: HW[s][k % 2], details: "Complete in your notebook and show it in the next class.",
        date: iso(addDays(now, -k * 2)), due: iso(addDays(now, k === 3 ? -1 : 2 + k)), teacherId: t, teacherName: staffName(t)
      };
    });
  });

  /* ---- Leave requests ---- */
  const L = (kind, personId, from, to, reason, status, appliedBy, appliedOff, decidedBy) => ({
    kind, personId, name: kind === "student" ? students[personId].name : staffName(personId), ...(kind === "student" ? { classId: students[personId].classId } : {}),
    from: iso(addDays(now, from)), to: iso(addDays(now, to)), reason, status, appliedBy, appliedAt: iso(addDays(now, appliedOff)), ...(decidedBy ? { decidedBy } : {})
  });
  Object.assign(leaves, {
    lv1: L("student", kidA, 2, 3, "Family wedding in Kotli.", "pending", "P-ASLAM", 0),
    lv2: L("student", "STR-12PE-04", -5, -4, "Fever — doctor advised two days' rest.", "approved", "STR-12PE-04", -6, "Prof. Tariq Mehmood"),
    lv3: L("student", "STR-12PE-07", 1, 1, "Appearing in NTS test at Muzaffarabad.", "pending", "STR-12PE-07", 0),
    lv4: L("staff", "T06", 4, 6, "Sister's wedding.", "pending", "T06", -1),
    lv5: L("staff", "T01", -20, -20, "BISE paper-setting meeting.", "approved", "T01", -23, "Prof. Dr. Khalid Mahmood"),
    lv6: L("student", "STR-8-05", 1, 2, "Going to Islamabad for a medical check-up.", "pending", "P-RAZA", 0),
    lv7: L("student", "STR-11PM-03", -3, -3, "Cousin's birthday.", "rejected", "STR-11PM-03", -4, "Mr. Imran Qureshi"),
    lv8: L("student", "STR-12CS-05", 3, 3, "Passport office appointment.", "pending", "STR-12CS-05", -1),
    lv9: L("staff", "T15", 7, 8, "Attending a workshop at MUST.", "pending", "T15", 0),
    lv10: L("staff", "T18", -12, -11, "Child unwell.", "approved", "T18", -13, "Prof. Dr. Khalid Mahmood"),
    lv11: L("student", "STR-9C-07", -8, -6, "Flu.", "approved", "P-9C-07", -9, "Ms. Hina Latif")
  });

  /* ---- Notices ---- */
  const N = [
    ["Mid-Term result date", "Mid-Term results will be shared on the portal once all subjects are checked. Parents can view report cards from their portal.", ["students", "parents"], 0, true],
    ["Fee reminder", `Fee for this month is due by the ${FEE_DUE_DAY}th. A late fee of Rs. 300 applies after the due date. Pay at the college office or by bank challan.`, ["students", "parents"], -2, false],
    ["Staff meeting on Saturday", "All teaching staff: meeting in the conference room after the last period on Saturday. Bring mid-term paper-checking status.", ["staff"], -1, true],
    ["Science exhibition", "Students of Class 9 to 12 can register projects for the inter-college science exhibition with their class teacher by Friday.", ["students", "parents", "staff"], -4, false],
    ["ID cards", "Upload your photo and complete your details in the portal (ID card page). Cards are printed once all details are complete.", ["students", "parents"], -5, false],
    ["Winter uniform", "Winter uniform (navy blazer and grey sweater) is compulsory from 1 November.", ["students", "parents"], -8, false],
    ["Parent–teacher meeting", "Parent–teacher meeting for Classes 8 to 10 will be held on the last Saturday of this month, 9:00 AM – 12:00 PM.", ["parents", "staff"], -10, false],
    ["Mark attendance before 9:00 AM", "Class teachers must mark daily attendance on the portal before 9:00 AM so parents get it on time.", ["staff"], -12, false]
  ];
  N.forEach(([title, body, audience, off, pinned], i) => (notices["nt" + i] = { title, body, audience, date: iso(addDays(now, off)), by: title.startsWith("Staff") || title.startsWith("Mark") ? "Principal" : "College Office", pinned }));

  /* ---- Messages (parent ↔ teacher) ---- */
  const at = (off, h) => { const d = addDays(now, off); d.setHours(h, 15, 0, 0); return d.toISOString(); };
  const MSG = [
    ["P-ASLAM", "T06", kidA, "parent", "Assalam o Alaikum. Hamza says he finds Urdu grammar difficult. Could you suggest some extra practice?", -3, 19, true],
    ["P-ASLAM", "T06", kidA, "staff", "Wa Alaikum Assalam. Yes — I'll give him a weekly worksheet on Mondays. Please check he completes it at home.", -2, 10, true],
    ["P-ASLAM", "T01", kidB, "parent", "Ayesha missed the Physics practical on Tuesday due to illness. Can she do it next week?", -1, 20, false],
    ["P-RAZA", "T16", "STR-8-05", "parent", "Ali's English handwriting needs improvement. What should we practise at home?", -4, 18, true],
    ["P-RAZA", "T16", "STR-8-05", "staff", "Please have him copy one page daily in a four-line notebook. I will check it every Friday.", -3, 11, true],
    ["P-RAZA", "T15", "STR-12PE-02", "parent", "Usman wants extra help with Calculus before the send-up exams. Is there a revision class?", -1, 21, false],
    ["P-" + "10B-04", "T04", "STR-10B-04", "parent", "Sorry for the absences — he was not well. We will make sure he attends regularly now.", -2, 17, false]
  ];
  MSG.forEach(([parentId, staffId, studentId, from, text, off, h, read], i) => (messages["m" + (i + 1)] = { parentId, staffId, studentId, from, text, at: at(off, h), read }));

  /* ---- Subscription payments (Rs. 200 via EasyPaisa) ---- */
  const subscriptions = {};
  let tid = 41823900417;
  Object.entries(users).filter(([, u]) => u.role === "student").forEach(([uid, u]) => {
    if (u.subscribedUntil) {
      const approved = addDays(new Date(u.subscribedUntil + "T12:00"), -30);
      tid += 7919;
      subscriptions["TID-" + tid] = { userId: uid, studentId: uid, name: u.name, classId: u.classId, amount: 200, method: "EasyPaisa", tid: String(tid), sender: `03${between(0, 4)}${between(0, 9)}${between(1000000, 9999999)}`, submittedAt: iso(approved), status: "approved", decidedAt: iso(approved), validFrom: iso(approved), validUntil: u.subscribedUntil };
    }
  });
  ["STR-10C-03", "STR-11PM-05", "STR-12CS-06", "STR-8-09", "STR-9B-04", "STR-11CM-07"].forEach((sid, k) => {
    const u = users[sid]; if (!u) return;
    tid += 104729;
    subscriptions["TID-" + tid] = { userId: sid, studentId: sid, name: u.name, classId: u.classId, amount: 200, method: "EasyPaisa", tid: String(tid), sender: `034${k}${between(1000000, 9999999)}`, submittedAt: iso(addDays(now, -Math.floor(k / 2))), status: "pending" };
  });
  tid += 3571;
  subscriptions["TID-" + tid] = { userId: "STR-10B-04", studentId: "STR-10B-04", name: users["STR-10B-04"].name, classId: "10-BIO", amount: 200, method: "EasyPaisa", tid: String(tid), sender: "03311234567", submittedAt: iso(addDays(now, -2)), status: "rejected", reason: "TID not found in EasyPaisa", decidedAt: iso(addDays(now, -1)), decidedBy: "College Office (Admin)" };

  return { users, students, staff, timetable, attendance, staffAttendance, exams, homework, fees, leaves, notices, messages, subscriptions, cardVerify };
}
