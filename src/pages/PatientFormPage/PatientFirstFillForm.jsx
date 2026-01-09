import { useState } from "react";

import BasicInfoForm from "./FormComponent/basicInfoForm";
import MedicalHistoryForm from "./FormComponent/MedicalHistoryForm";
import HabitsAndAllergiesForm from "./FormComponent/HabitsAndAllergiesForm";
import ParentMedicalForm from "./FormComponent/ParentMediInfo";
import EmergencyContactForm from "./FormComponent/Emergency";

export default function PatientFirstFillForm() {
  const [active, setActive] = useState("Basic Info");

  // 🔹 controls page switching
  const handleNext = (nextSection) => {
    setActive(nextSection);
  };

  // 🔹 decides which form to show
  const renderSection = () => {
    switch (active) {
      case "Basic Info":
        return (
          <BasicInfoForm showButton={true}
            onNext={() => handleNext("Medical Info")}
          />
        );

      case "Medical Info":
        return (
          <MedicalHistoryForm showButton={true}
            onNext={() => handleNext("Life Style and Allergies")}
          />
        );

      case "Life Style and Allergies":
        return (
          <HabitsAndAllergiesForm showButton={true}
            onNext={() => handleNext("Parent Info")}
          />
        );

      case "Parent Info":
        return (
          <ParentMedicalForm showButton={true}
            onNext={() => handleNext("Emergency Contact")}
          />
        );

      case "Emergency Contact":
        return <EmergencyContactForm showButton={true} />;

      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center py-6">
      <div className="w-full max-w-5xl bg-white shadow-md rounded-md p-4">
        {renderSection()}
      </div>
    </div>
  );
}