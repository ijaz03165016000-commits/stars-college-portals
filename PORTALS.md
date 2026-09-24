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
| Student — not subscribed yet (sees the payment screen) | `STR-9B-01` |
| Student — subscribed (renewal reminder) | `STR-12PM-02` |
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

## Student subscription (Rs. 200 / month, EasyPaisa)

Students must have an active subscription before their portal opens. Parents, staff, principal and admin are not affected.

1. The student signs in and sees the payment screen: Rs. 200 to EasyPaisa **0344-0807888 (Muhammad Ijaz)**.
2. They pay in the EasyPaisa app and enter the **Transaction ID (TID)** and the number they paid from. Each TID can be used only once.
3. Admin portal → **Portal subscriptions** lists payments waiting for verification (the menu shows a count). Check the TID in your EasyPaisa app, then **Approve** (30 days of access, added after any time left) or **Reject** with a reason the student sees.
4. Five days before expiry the student sees a renewal reminder; after expiry the payment screen comes back.
5. Cash or free (scholarship) access: **Record cash / manual payment**.

EasyPaisa does not offer automatic confirmation for personal accounts, so approval is manual. In live mode the Firestore rules also block an unpaid student's data, so the payment screen can't be bypassed.
Change the amount, days, account or switch the paywall off in `portal/js/school.js` → `SUBSCRIPTION`.

## ID cards (student card & employee card)

- **Student portal → ID card** / **Staff portal → Employee card** shows a checklist of the details the card needs, a live preview of the front and back, and an **Issue card** button that unlocks once everything is complete.
- Students add their photo, date of birth, blood group and address; staff add photo, mobile, blood group and address. Name, class, roll no. / designation come from the college record.
- The college office can fill in or correct any detail and issue cards from Admin (or Principal) → Students / Staff → **Card**. The tables show each card's status: Incomplete, Ready or Issued.
- After issue, **Print / save as PDF** prints front and back at real ID-card size (54 × 86 mm). Students can't change details after issue; the office can edit and **Re-issue**.
- Photos are cropped to passport shape and shrunk to about 20–40 KB, stored in the student/staff record (no extra storage setup needed).
- Card validity: `portal/js/school.js` → `ID_CARD` (student cards valid to the end of the session, staff cards 2 years).
- **No principal's signature — QR verification instead.** The back of every issued card carries a QR code. Anyone (a guard, a board exam centre, another school) scans it with a phone camera and `verify.html` on the college website shows **Valid / Expired / Cancelled / Not found** with the holder's photo, name, class or designation and validity. Each card gets a random 12-character code, so cards can't be looked up by guessing IDs.
- **Re-issue** gives the card a new QR code and marks the old one **Cancelled** — so a lost or replaced card stops verifying. Cards issued before this feature show "Re-issue to add QR code" on the back; re-issue them from Admin → Students / Staff → Card.
- Remember to re-publish `firestore.rules` after updating (it adds the public, read-one-only `cardVerify` collection).

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
