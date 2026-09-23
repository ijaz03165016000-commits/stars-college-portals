/* Student portal */
import * as store from "../store.js";
import { className } from "../school.js";
import { fmtDate } from "../ui.js";
import { studentViews, noticesView, profileView } from "./shared.js";

let sid;
export function init(user) { sid = user.linkId || user.id; }

export const nav = [
  { id: "home", label: "Dashboard", icon: "home" },
  { id: "attendance", label: "Attendance", icon: "checklist" },
  { id: "results", label: "Results", icon: "chart" },
  { id: "timetable", label: "Timetable", icon: "calendar" },
  { id: "homework", label: "Homework", icon: "book" },
  { id: "fees", label: "Fees", icon: "money" },
  { id: "leave", label: "Leave", icon: "leave" },
  { id: "notices", label: "Notices", icon: "bell" }
];

const sv = studentViews(() => sid);
export const views = {
  ...sv,
  notices: noticesView("students"),
  profile: profileView(async () => {
    const s = await store.get("students", sid);
    return [["Student ID", sid], ["Class", className(s.classId)], ["Roll no.", s.rollNo], ["Father's name", s.fatherName], ["Date of birth", fmtDate(s.dob)], ["Phone", s.phone], ["Address", s.address], ["Admitted", fmtDate(s.admissionDate)]];
  })
};
