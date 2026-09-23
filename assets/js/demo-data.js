/* Sample content shown in DEMO MODE (before Firebase is connected).
   Once Firebase is connected, the site reads from the database instead
   and this file is no longer used by the public pages. */

export const DEMO_ARTICLES = [
  {
    id: "board-exam-preparation-plan",
    title: "A 90-day plan for the Matric and Intermediate board exams",
    category: "Board Exams",
    author: "Prof. Sadia Kanwal",
    date: "2026-09-18",
    status: "published",
    cover: "assets/img/demo/article-1.svg",
    excerpt: "Three months is enough time to cover the syllabus twice if you split it well. Here is the week-by-week plan our senior teachers give their own students.",
    content: `
<p>Three months before the annual exams is the point where most students either settle into a rhythm or start to panic. The difference is almost always a plan. This is the schedule our senior faculty use with their own classes.</p>
<h2>Weeks 1–4: finish the syllabus once</h2>
<p>If any chapters are still untouched, close them now. Aim for one chapter per subject every three days and keep a single notebook of formulas, definitions and diagrams you will revise later.</p>
<ul>
<li>Science subjects: make a one-page summary for every chapter.</li>
<li>Mathematics: solve every exercise question at least once.</li>
<li>English and Urdu: practise one essay and one letter each week.</li>
</ul>
<h2>Weeks 5–9: past papers under exam conditions</h2>
<p>Sit one full past paper every two days with a timer. Mark it honestly against the board's marking scheme and write down every question you lost marks on.</p>
<blockquote>Past papers show you what the examiner actually asks, not what you hope they will ask.</blockquote>
<h2>Weeks 10–13: revise your weak list</h2>
<p>By now you have a list of topics that keep costing you marks. Spend the final month on that list, sleep eight hours, and do not start any new book.</p>
<p>Our weekly test series follows the same plan, so STARs students sit more than 20 full papers before the board exam.</p>`
  },
  {
    id: "choosing-the-right-group",
    title: "Pre-Medical, Pre-Engineering, ICS or I.Com: how to choose after Matric",
    category: "Career Guidance",
    author: "Mr. Usman Tariq",
    date: "2026-09-10",
    status: "published",
    cover: "assets/img/demo/article-2.svg",
    excerpt: "The group you choose in Class 11 decides which university degrees stay open to you. A short guide for students and parents making the choice.",
    content: `
<p>Every year, parents ask us the same question after the Matric result: which group should my child take? There is no single right answer, but there are good questions to ask.</p>
<h2>Start with the subjects, not the job title</h2>
<p>A student who enjoys Biology and has the patience for heavy memorisation will usually do well in Pre-Medical. A student who likes solving Mathematics problems for their own sake is often happier in Pre-Engineering or ICS.</p>
<h2>What each group opens up</h2>
<ul>
<li><strong>Pre-Medical:</strong> MBBS, BDS, Pharm-D, DPT, Nursing, BS Biology and allied health sciences.</li>
<li><strong>Pre-Engineering:</strong> engineering degrees, BS Physics, BS Mathematics, architecture.</li>
<li><strong>ICS:</strong> BS Computer Science, Software Engineering, Data Science, IT.</li>
<li><strong>I.Com:</strong> BBA, B.Com, Accounting and Finance, CA and ACCA.</li>
</ul>
<h2>Talk to us before you decide</h2>
<p>Our counselling desk meets every new admission with their parents for fifteen minutes before a group is confirmed. Book a session at the admissions office or on WhatsApp.</p>`
  },
  {
    id: "science-week-2026",
    title: "Science Week 2026: student projects on solar power and water testing",
    category: "College Events",
    author: "STARs College",
    date: "2026-08-29",
    status: "published",
    cover: "assets/img/demo/article-3.svg",
    excerpt: "Forty-two projects, three days and a visit from parents across Mirpur. Highlights from this year's Science Week.",
    content: `
<p>This year's Science Week brought together 42 student projects from Classes 8 to 12, and more than 300 parents visited over three days.</p>
<h2>The winning projects</h2>
<p>First place went to a Class 12 Pre-Engineering team who built a small solar tracker that turns a panel to follow the sun. Second place went to Class 11 Pre-Medical students who tested drinking water from six local sources for hardness and pH.</p>
<h2>ICS and I.Com join in</h2>
<p>ICS students ran a live coding corner where visitors could build a simple web page in ten minutes, and I.Com students managed a mock market with real accounts they balanced at the end of each day.</p>
<p>Thank you to every parent who came, and to our science faculty for months of preparation.</p>`
  }
];

export const DEMO_ANNOUNCEMENTS = [
  {
    id: "a1",
    title: "Admissions open for session 2026–27",
    category: "Admissions",
    date: "2026-09-20",
    description: "Admissions are open for Class 8, 9 and 11 in all groups. Seats are limited — apply online or visit the admissions office.",
    urgent: false,
    pinned: true,
    expires: "",
    attachment: ""
  },
  {
    id: "a2",
    title: "College closed on Wednesday due to weather warning",
    category: "Urgent",
    date: "2026-09-21",
    description: "Following the district administration's advisory, the college will remain closed on Wednesday. Classes resume Thursday as normal.",
    urgent: true,
    pinned: true,
    expires: "2026-12-31",
    attachment: ""
  },
  {
    id: "a3",
    title: "First monthly test schedule — Classes 9 to 12",
    category: "Exams",
    date: "2026-09-15",
    description: "The first monthly test series begins on 5 October. The full date sheet is attached.",
    urgent: false,
    pinned: false,
    expires: "",
    attachment: "assets/img/demo/datesheet.svg"
  },
  {
    id: "a4",
    title: "Class 12 annual result: 97% pass rate",
    category: "Results",
    date: "2026-09-05",
    description: "Congratulations to our Class 12 students and teachers. Eleven students scored above 1,000 marks.",
    urgent: false,
    pinned: false,
    expires: "",
    attachment: ""
  },
  {
    id: "a5",
    title: "Parent–teacher meeting on Saturday",
    category: "Events",
    date: "2026-09-02",
    description: "Parents of all classes are requested to attend between 9:00 AM and 12:00 PM to discuss first-term progress.",
    urgent: false,
    pinned: false,
    expires: "",
    attachment: ""
  }
];
