import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaHome,
  FaNotesMedical,
  FaFileUpload,
  FaBell,
  FaUser
} from "react-icons/fa";


import { PatinetNavBar } from "../../components/PatientNavBar";
import RemindersPage from "../Reminders/RemindersPage";
import MyProfile from "./PatientProfilePage";
import PatientMediInfomation from "../PatientFormPage/PatientMediInfomation";
import MedicalReportsPage from "../MedicalReportsPage/MedicalReportsPage";
import SummaryPage from "./SummaryPage";

const PATIENT_DASHBOARD_ACTIVE_KEY = "patient_dashboard_active_section";

const getRouteActiveSection = (pathname) => {
  const pathSegments = pathname.split("/").filter(Boolean);
  const medicalReportsIndex = pathSegments.lastIndexOf("medical-reports");

  if (
    medicalReportsIndex !== -1 &&
    medicalReportsIndex < pathSegments.length - 1
  ) {
    return "Upload Report";
  }

  return null;
};
export default function Dashboard() {
  const location = useLocation();
  const contentRef = useRef(null);
  const [storedActive, setStoredActive] = useState(() => {
    return localStorage.getItem(PATIENT_DASHBOARD_ACTIVE_KEY) || "Summary";
  });

  const active = getRouteActiveSection(location.pathname) || storedActive;

  useEffect(() => {
    localStorage.setItem(PATIENT_DASHBOARD_ACTIVE_KEY, active);
  }, [active]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      contentRef.current?.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [active, location.pathname]);

  return (
    <div className="h-[calc(100dvh-5rem)] bg-[#F2FBFA] flex flex-col overflow-hidden">

      {/* TOP NAVBAR */}
      <PatinetNavBar />

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* LEFT SIDEBAR (DESKTOP ONLY) */} 
        <div className="hidden sm:flex lg:w-[260px] shrink-0 self-start sticky top-0 bg-[#EAF7F6] p-4 border-r border-[#D3F0ED] flex-col h-full overflow-y-auto">
          <SidebarButton
            text="Summary"
            icon={<FaHome />}
            active={active}
            setActive={setStoredActive}
          />
          <SidebarButton
            text="My Profile"
            icon={<FaUser />}
            active={active}
            setActive={setStoredActive}
          />
          <SidebarButton
            text="Medical Info"
            icon={<FaNotesMedical />}
            active={active}
            setActive={setStoredActive}
          />
          <SidebarButton
            text="Upload Report"
            icon={<FaFileUpload />}
            active={active}
            setActive={setStoredActive}
          />
          <SidebarButton
            text="Reminders"
            icon={<FaBell />}
            active={active}
            setActive={setStoredActive}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div
          ref={contentRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-gray-50 py-6 pb-24 sm:pb-6"
        >
          {renderContent(active)}
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t border-[#D3F0ED] flex justify-around py-2 z-50">
        <MobileNavButton
          icon={<FaHome />}
          text="Summary"
          active={active}
          setActive={setStoredActive}
        />
        <MobileNavButton
          icon={<FaUser />}
          text="My Profile"
          active={active}
          setActive={setStoredActive}
        />
        <MobileNavButton
          icon={<FaNotesMedical />}
          text="Medical Info"
          active={active}
          setActive={setStoredActive}
        />
        <MobileNavButton
          icon={<FaFileUpload />}
          text="Reports"
          active={active === "Medical Reports" || active === "Upload Report"}
          setActive={() => setStoredActive("Upload Report")}
        />
        <MobileNavButton
          icon={<FaBell />}
          text="Reminders"
          active={active}
          setActive={setStoredActive}
        />
      </div>
    </div>
  );
}

/* ---------------- SIDEBAR BUTTON ---------------- */

function SidebarButton({ text, icon, active, setActive }) {
  const isActive =
    active === text ||
    (text === "Medical Reports" && active === "Upload Report");

  return (
    <button
      onClick={() => setActive(text)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 text-[15px] transition
        ${isActive
          ? "bg-[#18AAB0] text-white shadow"
          : "text-[#0F4F52] hover:bg-[#86C443]/20"
        }
      `}
    >
      <span className={`${isActive ? "text-white" : "text-[#18AAB0]"}`}>
        {icon}
      </span>
      {text}
    </button>
  );
}

/* ---------------- MOBILE NAV BUTTON ---------------- */

function MobileNavButton({ icon, text, active, setActive }) {
  const isActive = active === text;

  return (
    <button
      onClick={() => setActive(text)}
      className={`flex flex-col items-center text-[11px]
        ${isActive ? "text-[#18AAB0]" : "text-gray-500"}
      `}
    >
      <div className="text-[20px]">{icon}</div>
      {text}
    </button>
  );
}

/* ---------------- CONTENT RENDER ---------------- */

function renderContent(
  active,
) {
  switch (active) {
    case "Summary":
      return <SummaryPage />;
    case "My Profile":
      return <MyProfile />;
    case "Medical Reports":
     case "Upload Report":
       return <MedicalReportsPage />;

    case "Reminders":
      return <RemindersPage />;
    case "Medical Info":
       return <PatientMediInfomation />;
      
//     case "Upload Report":
//       return <PatientFormDoctorView />;
    default:
      return null;
  }
}


