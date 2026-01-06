import { useState } from "react";

import BasicInfoForm from "./basicInfoForm";
import MedicalHistoryForm from "./MedicalHistoryForm";
import HabitsAndAllergiesForm from "./HabitsAndAllergiesForm";
import ParentMedicalForm from "./ParentMediInfo";
import EmergencyContactForm from "./Emergency";

export default function AfterRegisterPatient() {
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
          <BasicInfoForm
            onNext={() => handleNext("Medical Info")}
          />
        );

      case "Medical Info":
        return (
          <MedicalHistoryForm
            onNext={() => handleNext("Life Style and Allergies")}
          />
        );

      case "Life Style and Allergies":
        return (
          <HabitsAndAllergiesForm
            onNext={() => handleNext("Parent Info")}
          />
        );

      case "Parent Info":
        return (
          <ParentMedicalForm
            onNext={() => handleNext("Emergency Contact")}
          />
        );

      case "Emergency Contact":
        return <EmergencyContactForm />;

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