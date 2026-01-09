import { useState } from "react";
import BasicInfoForm from "./basicInfoForm";
import EmergencyContactForm from "./Emergency";
import HabitsAndAllergiesForm from "./HabitsAndAllergiesForm";
import MedicalHistoryForm from "./MedicalHistoryForm";
import ParentMedicalForm from "./ParentMediInfo";

import { MdDataset } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import { GiLifeBar } from "react-icons/gi";
import { FaHouseChimneyMedical } from "react-icons/fa6";
import { PiPhoneCallFill } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { MdPlaylistPlay } from "react-icons/md";

export default function PatientFormMain() {
  const [active, setActive] = useState("Basic Info");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleNext = (nextSection) => {
  setActive(nextSection);
};

  const renderSection = () => {
    switch (active) {
      case "Basic Info":
        return <BasicInfoForm onNext={() => handleNext("Medical Info")} />;
      case "Medical Info":
        return <MedicalHistoryForm onNext={() => handleNext("Life Style and Allergies")} />;
      case "Life Style and Allergies":
        return <HabitsAndAllergiesForm onNext={() => handleNext("Parent Info")} />;
      case "Parent Info":
        return <ParentMedicalForm onNext={() => handleNext("Emergency Contact")} />;
      case "Emergency Contact":
        return <EmergencyContactForm />;
      default:
        return <BasicInfoForm />;
    }
  };

  const buttoncss = "p-2 text-start font-semibold px-3 py-4 w-full";

  // when select section, also close mobile sidebar (if open)
  const handleSelect = (section) => {
    setActive(section);
    setIsMobileSidebarOpen(false);
  };

  const sidebarContent = (
    <>
      <div className="px-3 md:text-md lg:text-lg font-bold mb-2">
        Sections
      </div>
      <div className="flex flex-col text-sm lg:text-md">
        <button
          className={`${buttoncss} ${
            active === "Basic Info"
              ? "bg-secondary text-white hover:bg-secondary"
              : "hover:bg-secondary/20"
          }`}
          onClick={() => handleSelect("Basic Info")}
        >
          <div className="flex flex-row items-center gap-2">
            <BiSolidUserDetail className="text-2xl" /> Basic Info
          </div>
        </button>

        <button
          className={`${buttoncss} ${
            active === "Medical Info"
              ? "bg-secondary text-white hover:bg-secondary"
              : "hover:bg-secondary/20"
          }`}
          onClick={() => handleSelect("Medical Info")}
        >
          <div className="flex flex-row items-center gap-2">
            <FaHouseChimneyMedical className="text-2xl" /> Medical Info
          </div>
        </button>

        <button
          className={`${buttoncss} ${
            active === "Life Style and Allergies"
              ? "bg-secondary text-white hover:bg-secondary"
              : "hover:bg-secondary/20"
          }`}
          onClick={() => handleSelect("Life Style and Allergies")}
        >
          <div className="flex flex-row items-center gap-2">
            <GiLifeBar className="text-2xl" /> Life Style and Allergies
          </div>
        </button>

        <button
          className={`${buttoncss} ${
            active === "Parent Info"
              ? "bg-secondary text-white hover:bg-secondary"
              : "hover:bg-secondary/20"
          }`}
          onClick={() => handleSelect("Parent Info")}
        >
          <div className="flex flex-row items-center gap-2">
            <MdDataset className="text-2xl" /> Parent Info
          </div>
        </button>

        <button
          className={`${buttoncss} ${
            active === "Emergency Contact"
              ? "bg-secondary text-white hover:bg-secondary"
              : "hover:bg-secondary/20"
          }`}
          onClick={() => handleSelect("Emergency Contact")}
        >
          <div className="flex flex-row items-center gap-2">
            <PiPhoneCallFill className="text-2xl" /> Emergency Contact
          </div>
        </button>
      </div>
    </>
  );

  return (
    <>
      
      {/* Floating icon for mobile (sidebar opener) */}
      {!isMobileSidebarOpen && (
        <button
          className="md:hidden fixed left-0 top-1/3 -translate-y-1/2 z-30 bg-secondary text-white rounded-r-full py-2 px-3 shadow-lg"
          onClick={() => setIsMobileSidebarOpen(true)}
        >
            <MdPlaylistPlay  className="text-3xl font-bold"/>
          
        </button>
      )}

      {/* Mobile sidebar overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-64 bg-secondary/40 border border-secondary shadow-md flex flex-col gap-4 py-4"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            <div className="flex items-center justify-between px-3 mb-1">
              <span className="font-bold text-mainblack">Sections</span>
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="text-mainblack"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      <div className="flex flex-row py-4">
        {/* Desktop / tablet sidebar */}
        <div className="hidden md:flex md:w-1/3 lg:w-1/4 h-screen flex-col gap-5 rounded-md py-5 mx-2 border border-secondary bg-secondary/40 shadow-md">
          {sidebarContent}
        </div>

        {/* Main content area */}
        <div className="w-full md:w-2/3 lg:w-3/4 mx-2 border2 border-gray-300 bg-white shadow-md p-4">
          {renderSection()}
        </div>
        
      </div>
    </>
  );
}