import { useState } from "react";
import {FaHome,FaUser,FaNotesMedical,FaFileUpload,FaBell} from "react-icons/fa";
import { PatinetNavBar } from "../../components/PatientNavBar";
import PatientFormDoctorView from "../PatientFormPage/patientFormDoctorView";
import RemindersPage from "../Reminders/RemindersPage";
import MyProfile from "./PatientProfilePage";
import PatientMediInfomation from "../PatientFormPage/PatientMediInfomation";
import SummaryPage from "./SummaryPage";



export default function Dashboard() {
  const [active, setActive] = useState("Summary");

  return (
    <div className="h-screen bg-[#F2FBFA] flex flex-col">

      {/* TOP NAVBAR */}
      <PatinetNavBar />

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR (DESKTOP ONLY) */}
        <div className="hidden sm:block lg:w-[260px] bg-[#EAF7F6] p-4 border-r border-[#D3F0ED]">
          <SidebarButton text="Summary" icon={<FaHome />} active={active} setActive={setActive} />
          <SidebarButton text="My Profile" icon={<FaUser />} active={active} setActive={setActive} />
          <SidebarButton text="Medical Info" icon={<FaNotesMedical />} active={active} setActive={setActive} />
          <SidebarButton text="Upload Report" icon={<FaFileUpload />} active={active} setActive={setActive} />
          <SidebarButton text="Reminders" icon={<FaBell />} active={active} setActive={setActive} />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-2 lg:p-10 bg-white overflow-y-auto">
          {renderContent(active)}
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-white border-t border-[#D3F0ED] flex justify-around py-2 z-50">
        <MobileNavButton icon={<FaHome />} text="Summary" active={active} setActive={setActive} />
        <MobileNavButton icon={<FaUser />} text="My Profile" active={active} setActive={setActive} />
        <MobileNavButton icon={<FaNotesMedical />} text="Medical Info" active={active} setActive={setActive} />
        <MobileNavButton icon={<FaFileUpload />} text="Upload Report" active={active} setActive={setActive} />
        <MobileNavButton icon={<FaBell />} text="Reminders" active={active} setActive={setActive} />
      </div>
    </div>
  );
}

/* ---------------- SIDEBAR BUTTON ---------------- */

function SidebarButton({ text, icon, active, setActive }) {
  const isActive = active === text;

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

function renderContent(active) {
  switch (active) {
    case "Summary":
      return <SummaryPage />;
    case "My Profile":
      return <MyProfile />;

    case "Reminders":
      return <RemindersPage />;
    case "Medical Info":
      return <PatientMediInfomation />
    case "Upload Report":
      return <PatientFormDoctorView />;
    default:
      return null;
  }
}

/* ---------------- PLACEHOLDER ---------------- */

function UnderConstruction({ active }) {
  return (
    <div className="bg-white p-6 sm:p-10">
      <h1 className="text-[28px] font-semibold text-[#18AAB0]">
        {active}
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        This section is under development
      </p>

      <div className="border-2 border-dashed border-[#86C443] rounded-xl h-[260px] flex items-center justify-center">
        <span className="text-[#86C443] text-[18px]">
          🚧 Waiting for implementation
        </span>
      </div>
    </div>
  );
}