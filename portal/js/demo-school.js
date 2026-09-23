/* Sample school used in DEMO MODE only. Generated relative to today's date so
   attendance, fees and homework always look current. */
import { CLASSES, DAYS, PERIODS, MONTHLY_FEE, FEE_DUE_DAY } from "./school.js";

const PW = "demo123";

/* small deterministic random generator so the demo is the same every time */
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
const R = rng(20260923);
const pick = (a) => a[Math.floor(R() * a.length)];
const between = (lo, hi) => Math.round(lo + R() * (hi - lo));

export const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

const BOYS = ["Muhammad Ali", "Ahmed Raza", "Hamza Khan", "Usman Tariq", "Bilal Hussain", "Zain ul Abideen", "Abdullah Mir", "Hassan Javed", "Talha Mehmood", "Saad Rashid", "Umar Farooq", "Fahad Iqbal", "Arslan Shah", "Danish Akhtar", "Haris Nawaz", "Shayan Qureshi", "Rehan Aslam", "Waleed Anwar"];
const GIRLS = ["Ayesha Siddiqui", "Fatima Zahra", "Maryam Noor", "Zainab Bibi", "Hira Batool", "Iqra Shabbir", "Laiba Khan", "Mahnoor Ali", "Aleena Hussain", "Rimsha Javed", "Areeba Mir", "Kinza Rafique", "Noor ul Ain", "Eman Tariq", "Sidra Kausar", "Anum Riaz", "Hafsa Yousaf", "Mehwish Akram"];
const FATHERS = ["Muhammad Aslam", "Tariq Mehmood", "Javed Iqbal", "Raja Khalid", "Chaudhry Nadeem", "Sardar Imtiaz", "Abdul Rasheed", "Mirza Shahid", "Khurshid Ahmed", "Zafar Iqbal", "Raja Waheed", "Ghulam Mustafa", "Saeed Akhtar", "Nazir Hussain", "Mushtaq Ahmed", "Riaz Hussain"];
const AREAS = ["Sector F-1", "Sector F-2", "Sector C-4", "Sector D-1", "Allama Iqbal Road", "Chakswari Road", "Kotli Road", "New City", "Mian Muhammad Road", "Sector B-3", "Dadyal Road", "Sector A-2"];

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
  { id: "T13", name: "Ms. Amina Riaz", designation: "Teacher", subjects: ["Chemistry", "Physics"], levels: [9, 10], classTeacherOf: "10-CS", gender: "F" }
];

/* most specific teacher first (fewest class levels), so e.g. Matric Physics goes to the Matric teacher */
const BY_SPECIFIC = [...STAFF].sort((a, b) => a.levels.length - b.levels.length);
function teacherFor(subject, level) {
  return (BY_SPECIFIC.find((t) => t.subjects.includes(subject) && t.levels.includes(level))
    || STAFF.find((t) => t.subjects.includes(subject)))?.id || "";
}

function schoolDaysBack(from, n) {
  const out = []; let d = new Date(from);
  while (out.length < n) { if (d.getDay() !== 0) out.push(iso(d)); d = addDays(d, -1); }
  return out.reverse();
}

export function buildDemoSchool() {
  const now = new Date();
  const today = iso(now);
  const users = {}, students = {}, staff = {}, timetable = {}, attendance = {}, staffAttendance = {};
  const exams = {}, homework = {}, fees = {}, leaves = {}, notices = {}, messages = {};

  /* ---- Leadership & office ---- */
  users.principal = { role: "principal", name: "Prof. Dr. Khalid Mahmood", loginId: "principal", password: PW };
  users.admin = { role: "admin", name: "College Office (Admin)", loginId: "admin", password: PW };

  /* ---- Staff ---- */
  STAFF.forEach((t, i) => {
    const classIds = CLASSES.filter((c) => c.subjects.some((s) => teacherFor(s, c.level) === t.id)).map((c) => c.id);
    staff[t.id] = {
      name: t.name, designation: t.designation, subjects: t.subjects, classIds, classTeacherOf: t.classTeacherOf,
      phone: `0345-${String(5100000 + i * 13791).slice(0, 7)}`, email: `${t.id.toLowerCase()}@starscollege.edu.pk`,
      joinDate: `20${String(12 + (i % 11)).padStart(2, "0")}-0${1 + (i % 8)}-01`, qualification: t.designation.includes("Senior") ? "M.Phil" : "M.Sc / M.A", gender: t.gender
    };
    users[t.id] = { role: "staff", name: t.name, loginId: t.id, linkId: t.id, password: PW };
  });

  /* subscription: positive = days of access left, negative = expired that many days ago */
  const subUntil = (daysLeft) => { const d = addDays(now, daysLeft); return { subscribedUntil: iso(d), subscribedUntilMs: new Date(iso(d) + "T23:59:59").getTime() }; };

  /* ---- Students & parents ---- */
  let fi = 0;
  const used = {};
  const uniqueName = (girl, cid) => {
    const pool = girl ? GIRLS : BOYS; const taken = (used[cid] ||= new Set());
    let k = Math.floor(R() * pool.length); while (taken.has(pool[k])) k = (k + 1) % pool.length;
    taken.add(pool[k]); return pool[k];
  };
  CLASSES.forEach((c) => {
    const code = c.id.replace("-", "").replace("BIO", "B").replace(/^(\d+)CS$/, "$1C").replace("ICS", "CS").replace("ICOM", "CM");
    const count = c.level >= 11 ? 9 : 8;
    for (let n = 1; n <= count; n++) {
      const girl = R() < 0.45;
      const id = `STR-${code}-${String(n).padStart(2, "0")}`;
      const father = FATHERS[fi++ % FATHERS.length];
      const yearBorn = 2026 - (c.level + 5) - (R() < 0.3 ? 1 : 0);
      students[id] = {
        name: uniqueName(girl, c.id), gender: girl ? "F" : "M",
        classId: c.id, rollNo: n, fatherName: father, phone: `03${between(0, 4)}${between(0, 9)}-${between(1000000, 9999999)}`,
        dob: `${yearBorn}-${String(between(1, 12)).padStart(2, "0")}-${String(between(1, 28)).padStart(2, "0")}`,
        address: `${pick(AREAS)}, Mirpur AJK`, admissionDate: c.level === 8 || c.level === 9 || c.level === 11 ? "2026-04-01" : "2025-04-01",
        status: "active"
      };
      users[id] = { role: "student", name: students[id].name, loginId: id, linkId: id, classId: c.id, password: PW, ...subUntil(R() < 0.85 ? between(3, 28) : -between(1, 20)) };
    }
  });

  /* The demo family: two children, one parent account */
  const kidA = "STR-9B-01", kidB = "STR-12PM-02";
  students[kidA].name = "Hamza Aslam"; students[kidA].gender = "M"; students[kidA].fatherName = "Muhammad Aslam";
  students[kidB].name = "Ayesha Aslam"; students[kidB].gender = "F"; students[kidB].fatherName = "Muhammad Aslam";
  students[kidA].phone = students[kidB].phone = "0300-1234567";
  users[kidA].name = students[kidA].name; users[kidB].name = students[kidB].name;
  delete users[kidA].subscribedUntil; delete users[kidA].subscribedUntilMs;   // demo student sees the payment screen
  Object.assign(users[kidB], subUntil(3));                                     // …and this one gets a renewal reminder

  const families = {};
  Object.entries(students).forEach(([sid, s]) => {
    const key = sid === kidA || sid === kidB ? "P-ASLAM" : "P-" + sid.slice(4);
    (families[key] ||= { name: s.fatherName, kids: [] }).kids.push(sid);
  });
  Object.entries(families).forEach(([pid, f]) => {
    users[pid] = { role: "parent", name: f.name, loginId: pid, children: f.kids, childClassIds: f.kids.map((k) => students[k].classId), password: PW };
    f.kids.forEach((k) => (students[k].parentId = pid));
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
  const byClass = {};
  Object.entries(students).forEach(([sid, s]) => (byClass[s.classId] ||= []).push(sid));
  days.forEach((d) => {
    CLASSES.forEach((c) => {
      if (d === today && ["11-ICOM", "12-ICOM", "10-CS"].includes(c.id)) return;  // a few classes still to be marked today
      const records = {};
      byClass[c.id].forEach((sid) => {
        const r = R();
        records[sid] = r < 0.06 ? "A" : r < 0.09 ? "L" : "P";
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
  Object.keys(students).forEach((sid) => (ability[sid] = 0.5 + R() * 0.45));
  ability[kidA] = 0.83; ability[kidB] = 0.9;
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
      const amount = MONTHLY_FEE[level];
      const r = R();
      const paid = k < 2 ? r > 0.05 : r > 0.45;
      const due = `${mo}-${String(FEE_DUE_DAY).padStart(2, "0")}`;
      fees[`${sid}_${mo}`] = {
        studentId: sid, classId: s.classId, month: mo, amount, due,
        items: [{ label: "Tuition fee", amount }], status: paid ? "paid" : "unpaid",
        paidOn: paid ? `${mo}-${String(between(2, FEE_DUE_DAY)).padStart(2, "0")}` : "", receiptNo: paid ? "RC-" + receipt++ : "",
        challanNo: `CH-${mo.replace("-", "")}-${sid.slice(4)}`
      };
    });
  });
  fees[`${kidA}_${months[2]}`].status = "unpaid"; fees[`${kidA}_${months[2]}`].paidOn = ""; fees[`${kidA}_${months[2]}`].receiptNo = "";

  /* ---- Homework ---- */
  const HW = {
    Physics: ["Numericals 3.1 – 3.8", "Draw and label a ray diagram for a convex lens"], Chemistry: ["Balance the equations on page 42", "Learn the first 20 elements with valencies"],
    Biology: ["Diagram of the human heart with labels", "Short questions, Chapter 4"], Mathematics: ["Exercise 5.2, Q1 – Q12", "Revise quadratic formula; 10 practice questions"],
    English: ["Essay: 'My Aim in Life' (250 words)", "Learn the idioms list 3"], Urdu: ["خلاصہ: سبق نمبر 5", "Mazmoon: 'Waqt ki Pabandi'"],
    "Computer Science": ["Write a C++ program to find the largest of three numbers", "Short notes on the OSI model"],
    Accounting: ["Prepare the trial balance of Q7", "Journal entries Exercise 3"], Economics: ["Define demand and draw its curve", "Short questions, Chapter 2"]
  };
  let hi = 0;
  CLASSES.forEach((c) => {
    c.subjects.filter((s) => HW[s]).slice(0, 3).forEach((s, k) => {
      const t = teacherFor(s, c.level);
      homework["hw" + hi++] = {
        classId: c.id, subject: s, title: HW[s][k % 2], details: "Complete in your notebook and show it in the next class.",
        date: iso(addDays(now, -k * 2)), due: iso(addDays(now, 2 + k)), teacherId: t, teacherName: STAFF.find((x) => x.id === t)?.name || ""
      };
    });
  });

  /* ---- Leave requests ---- */
  leaves.lv1 = { kind: "student", personId: kidA, name: students[kidA].name, classId: "9-BIO", from: iso(addDays(now, 2)), to: iso(addDays(now, 3)), reason: "Family wedding in Kotli.", status: "pending", appliedBy: "P-ASLAM", appliedAt: iso(now) };
  leaves.lv2 = { kind: "student", personId: "STR-12PE-04", name: students["STR-12PE-04"].name, classId: "12-PE", from: iso(addDays(now, -5)), to: iso(addDays(now, -4)), reason: "Fever — doctor advised two days' rest.", status: "approved", appliedBy: "STR-12PE-04", appliedAt: iso(addDays(now, -6)), decidedBy: "Prof. Tariq Mehmood" };
  leaves.lv3 = { kind: "student", personId: "STR-12PE-07", name: students["STR-12PE-07"].name, classId: "12-PE", from: iso(addDays(now, 1)), to: iso(addDays(now, 1)), reason: "Appearing in NTS test at Muzaffarabad.", status: "pending", appliedBy: "STR-12PE-07", appliedAt: iso(now) };
  leaves.lv4 = { kind: "staff", personId: "T06", name: "Ms. Rabia Noor", from: iso(addDays(now, 4)), to: iso(addDays(now, 6)), reason: "Sister's wedding.", status: "pending", appliedBy: "T06", appliedAt: iso(addDays(now, -1)) };
  leaves.lv5 = { kind: "staff", personId: "T01", name: "Prof. Tariq Mehmood", from: iso(addDays(now, -20)), to: iso(addDays(now, -20)), reason: "BISE paper-setting meeting.", status: "approved", appliedBy: "T01", appliedAt: iso(addDays(now, -23)), decidedBy: "Prof. Dr. Khalid Mahmood" };

  /* ---- Notices ---- */
  const N = [
    ["Mid-Term result date", "Mid-Term results will be shared on the portal once all subjects are checked. Parents can view report cards from their portal.", ["students", "parents"], 0, true],
    ["Fee reminder", `Fee for this month is due by the ${FEE_DUE_DAY}th. A late fee of Rs. 300 applies after the due date. Pay at the college office or by bank challan.`, ["students", "parents"], -2, false],
    ["Staff meeting on Saturday", "All teaching staff: meeting in the conference room after the last period on Saturday. Bring mid-term paper-checking status.", ["staff"], -1, true],
    ["Science exhibition", "Students of Class 9 to 12 can register projects for the inter-college science exhibition with their class teacher by Friday.", ["students", "parents", "staff"], -4, false],
    ["Winter uniform", "Winter uniform (navy blazer and grey sweater) is compulsory from 1 November.", ["students", "parents"], -8, false],
    ["Mark attendance before 9:00 AM", "Class teachers must mark daily attendance on the portal before 9:00 AM so parents get it on time.", ["staff"], -12, false]
  ];
  N.forEach(([title, body, audience, off, pinned], i) => (notices["nt" + i] = { title, body, audience, date: iso(addDays(now, off)), by: i === 2 || i === 5 ? "Principal" : "College Office", pinned }));

  /* ---- Messages (parent ↔ teacher) ---- */
  const at = (off, h) => { const d = addDays(now, off); d.setHours(h, 15, 0, 0); return d.toISOString(); };
  messages.m1 = { parentId: "P-ASLAM", staffId: "T06", studentId: kidA, from: "parent", text: "Assalam o Alaikum. Hamza says he finds Urdu grammar difficult. Could you suggest some extra practice?", at: at(-3, 19), read: true };
  messages.m2 = { parentId: "P-ASLAM", staffId: "T06", studentId: kidA, from: "staff", text: "Wa Alaikum Assalam. Yes — I'll give him a weekly worksheet on Mondays. Please check he completes it at home.", at: at(-2, 10), read: true };
  messages.m3 = { parentId: "P-ASLAM", staffId: "T01", studentId: kidB, from: "parent", text: "Ayesha missed the Physics practical on Tuesday due to illness. Can she do it next week?", at: at(-1, 20), read: false };

  /* ---- Subscription payments ---- */
  const subscriptions = {};
  let tid = 41823900417;
  Object.entries(users).filter(([, u]) => u.role === "student").forEach(([uid, u]) => {
    if (u.subscribedUntil) {
      const approved = addDays(new Date(u.subscribedUntil + "T12:00"), -29);
      tid += 7919;
      subscriptions["TID-" + tid] = { userId: uid, studentId: uid, name: u.name, classId: u.classId, amount: 200, method: "EasyPaisa", tid: String(tid), sender: `03${between(0, 4)}${between(0, 9)}${between(1000000, 9999999)}`, submittedAt: iso(approved), status: "approved", decidedAt: iso(approved), validFrom: iso(approved), validUntil: u.subscribedUntil };
    }
  });
  ["STR-10C-03", "STR-11PM-05", "STR-12CS-06"].forEach((sid, k) => {
    const u = users[sid]; if (!u) return;
    tid += 104729;
    subscriptions["TID-" + tid] = { userId: sid, studentId: sid, name: u.name, classId: u.classId, amount: 200, method: "EasyPaisa", tid: String(tid), sender: `034${k}${between(1000000, 9999999)}`, submittedAt: iso(addDays(now, -k)), status: "pending" };
  });

  return { users, students, staff, timetable, attendance, staffAttendance, exams, homework, fees, leaves, notices, messages, subscriptions };
}
