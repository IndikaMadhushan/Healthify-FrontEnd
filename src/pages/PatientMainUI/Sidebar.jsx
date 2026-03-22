import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaNotesMedical,
  FaFileUpload,
  FaBell,
  FaUser
} from "react-icons/fa";

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
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [storedActive, setStoredActive] = useState(() => {
    return localStorage.getItem(PATIENT_DASHBOARD_ACTIVE_KEY) || "Summary";
  });

  const active = getRouteActiveSection(location.pathname) || storedActive;
  const isRootDashboardRoute = location.pathname === "/patient/medical-reports";

  const handleSectionSelect = (section) => {
    setStoredActive(section);

    if (!isRootDashboardRoute) {
      navigate("/patient/medical-reports");
    }
  };

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

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* LEFT SIDEBAR (DESKTOP ONLY) */} 
        <div className="hidden sm:flex lg:w-[260px] shrink-0 self-start sticky top-0 bg-[#EAF7F6] p-4 border-r border-[#D3F0ED] flex-col h-full overflow-y-auto">
          <SidebarButton
            text="Summary"
            icon={<FaHome />}
            isActive={active === "Summary"}
            onClick={() => handleSectionSelect("Summary")}
          />
          <SidebarButton
            text="My Profile"
            icon={<FaUser />}
            isActive={active === "My Profile"}
            onClick={() => handleSectionSelect("My Profile")}
          />
          <SidebarButton
            text="Medical Info"
            icon={<FaNotesMedical />}
            isActive={active === "Medical Info"}
            onClick={() => handleSectionSelect("Medical Info")}
          />
          <SidebarButton
            text="Upload Report"
            icon={<FaFileUpload />}
            isActive={active === "Upload Report"}
            onClick={() => handleSectionSelect("Upload Report")}
          />
          <SidebarButton
            text="Reminders"
            icon={<FaBell />}
            isActive={active === "Reminders"}
            onClick={() => handleSectionSelect("Reminders")}
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
          isActive={active === "Summary"}
          onClick={() => handleSectionSelect("Summary")}
        />
        <MobileNavButton
          icon={<FaUser />}
          text="My Profile"
          isActive={active === "My Profile"}
          onClick={() => handleSectionSelect("My Profile")}
        />
        <MobileNavButton
          icon={<FaNotesMedical />}
          text="Medical Info"
          isActive={active === "Medical Info"}
          onClick={() => handleSectionSelect("Medical Info")}
        />
        <MobileNavButton
          icon={<FaFileUpload />}
          text="Reports"
          isActive={active === "Upload Report"}
          onClick={() => handleSectionSelect("Upload Report")}
        />
        <MobileNavButton
          icon={<FaBell />}
          text="Reminders"
          isActive={active === "Reminders"}
          onClick={() => handleSectionSelect("Reminders")}
        />
      </div>
    </div>
  );
}

/* ---------------- SIDEBAR BUTTON ---------------- */

function SidebarButton({ text, icon, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
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

function MobileNavButton({ icon, text, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
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


