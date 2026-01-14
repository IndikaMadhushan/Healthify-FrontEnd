import { useState } from "react";

import MedicalHistoryForm from "./FormComponent/MedicalHistoryForm";
import HabitsAndAllergiesForm from "./FormComponent/HabitsAndAllergiesForm";
import ParentMedicalForm from "./FormComponent/ParentMediInfo";

import { FaHouseChimneyMedical } from "react-icons/fa6";
import { GiLifeBar } from "react-icons/gi";
import { MdDataset } from "react-icons/md";

export default function PatientMediInfomation() {
  const [active, setActive] = useState("Medical Info");

  const tabs = [
    {
      key: "Medical Info",
      label: "Medical Info",
      icon: <FaHouseChimneyMedical />
    },
    {
      key: "Life Style and Allergies",
      label: "Life Style & Allergies",
      icon: <GiLifeBar />
    },
    {
      key: "Parent Info",
      label: "Parent Medical Info",
      icon: <MdDataset />
    }
  ];

  const renderSection = () => {
    switch (active) {
      case "Medical Info":
        return <MedicalHistoryForm />;
      case "Life Style and Allergies":
        return <HabitsAndAllergiesForm />;
      case "Parent Info":
        return <ParentMedicalForm />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4">

      {/* ===== TOP TAB NAVIGATION ===== */}
      <div className="flex flex-wrap gap-2 border-b pb-3 mb-6">

        {tabs.map((tab) => {
          const isActive = active === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-semibold transition
                ${
                  isActive
                    ? "bg-secondary text-white shadow"
                    : "text-gray-600 hover:bg-secondary/10"
                }
              `}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ===== FORM CONTENT ===== */}
      <div className="min-h-[300px]">
        {renderSection()}
      </div>

    </div>
  );
}