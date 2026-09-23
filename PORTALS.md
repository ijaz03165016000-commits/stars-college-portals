# STARs College portals

Five portals share one sign-in page at **`/portal/`**:

| Portal | Who | What they can do |
|---|---|---|
| **Student** | each student (ID like `STR-9B-01`) | Dashboard, attendance calendar, result cards (print), timetable, homework, fee challans, apply for leave, notices |
| **Parent** | one login per family (ID like `P-9B-01`) | Everything the student sees, for each child (switch between children), apply leave, message teachers |
| **Staff** | each teacher (ID like `T01`) | Mark daily attendance, create tests and enter marks, give homework, weekly timetable, class list, approve student leave, reply to parents |
| **Principal** | principal | College overview, attendance by class, staff attendance, publish results, fee collection, staff leave approvals, notices |
| **Admin** | college office | Add/edit students & staff (creates their logins), reset passwords, generate challans & record fees, edit timetables, notices, link to the website CMS |

Built by Ijaz Software House · www.ijazs.online

## Try it now (demo mode)

Until Firebase is connected, the portals run on a sample school (112 students, 13 teachers) saved in the visitor's browser. Every portal's sign-in box shows a demo login; the password is always `demo123`.

| Role | Demo ID |
|---|---|
| Student | `STR-9B-01` |
| Parent (two children) | `P-ASLAM` |
| Staff | `T01` |
| Principal | `principal` |
| Admin | `admin` |

"Reset demo data" (top of every portal) restores the sample school.

## Going live with Firebase

1. **Config** — paste the Firebase web config into `assets/js/config.js` (same as for the website).
2. **Enable** Authentication → *Email/Password*, and Firestore Database.
3. **Rules** — Firestore → Rules → paste `firestore.rules` → Publish. These rules stop students seeing other students' data and stop anyone but the principal/admin editing the website.
4. **First admin login** (one time, in the Firebase console):
   - Authentication → Add user → email `admin@portal.starscollege.edu.pk`, a strong password. Copy the **User UID**.
   - Firestore → start collection `users` → document ID = that UID → fields:
     `role` = `admin`, `name` = `College Office`, `loginId` = `admin`.
   - Sign in at `/portal/` as **Admin** with ID `admin`.
   - To use the same account for the website CMS (`/admin/`), sign in there with `admin@portal.starscollege.edu.pk`.
5. **Add everyone from the Admin portal**: Staff → *Add staff member*; Students → *Add student* (creates the student login and, if you choose, the parent login). Write down the passwords shown — they're not shown again.
6. Add a principal login: Admin → *Logins & passwords* → *Principal / admin login*.
7. Timetables: Admin → *Timetables* → *Edit timetable* for each class.
8. Fees: Admin → *Fees* → *Generate challans* each month.

Password resets in live mode are done in Firebase console → Authentication (the portal explains the steps).

## Changing the school setup

`portal/js/school.js` holds classes and subjects, monthly fees (Class 8 Rs 3,500 · Matric Rs 4,500 · Inter Rs 6,000), fee due day, late fee, period timings and the grading scale. Don't change a class `id` once students are enrolled.

## Files

```
portal/
  index.html        sign-in page (role picker)
  app.html          portal shell (menu + pages)
  portal.css        portal styles
  js/store.js       database layer (Firebase or demo)
  js/school.js      classes, subjects, fees, timings
  js/demo-school.js sample data for demo mode
  js/views/         student, parent, staff, principal, admin (+ shared, manage)
firestore.rules     security rules for website + portals
```
