import { useState } from "react";
import ChronicIllnessesSection from "./ChronicIllnessesSection";
import VaccineSection from "./VaccineSection";
import SurgeryEntry from "./SurgeryEntry";

const initialChronic = {
  chronicIllnesses: [],
  otherChronic: "",
  cancerChronic: ""
};

export const vaccineInitial = {
  takenVaccines: [],
  otherVaccine: ""
};

const emptySurgery = {
  surgeonName: "",
  surgeryDate: "",
  hospital: "",
  complications: ""
};

export default function PatientMedicalForm({showButton=false, onNext }) {
  const [patientChronic, setPatientChronic] = useState(initialChronic);
  const [vaccineData, setVaccineData] = useState(vaccineInitial);
  const [surgeries, setSurgeries] = useState([]);
  const [errors, setErrors] = useState({});

  const handleAddSurgery = () => {
    setSurgeries((prev) => [...prev, { ...emptySurgery }]);
  };

  const handleChangeSurgery = (index, updated) => {
    setSurgeries((prev) =>
      prev.map((item, i) => (i === index ? updated : item))
    );
  };

  const handleRemoveSurgery = (index) => {
    setSurgeries((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (
      patientChronic.chronicIllnesses.includes("Cancer") &&
      !patientChronic.cancerChronic.trim()
    ) {
      newErrors.cancerChronic = "Please specify cancer type";
    }

    if (
      patientChronic.chronicIllnesses.includes("Other") &&
      !patientChronic.otherChronic.trim()
    ) {
      newErrors.otherChronic = "Please specify other chronic illness";
    }

    if (
      vaccineData.takenVaccines.includes("Other") &&
      !vaccineData.otherVaccine.trim()
    ) {
      newErrors.otherVaccine = "Please specify other vaccine";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const payload = {
      chronic: patientChronic,
      vaccines: vaccineData,
      surgeries
    };

    console.log("Patient medical full payload:", payload);
    alert("Patient medical history saved (check console)");
  };

  const sectionHeading = "text-xl font-bold text-mainblack mb-4";

  return (
    <form onSubmit={handleSubmit} className="text-mainblack space-y-6">
      <h2 className={sectionHeading}>Medical Information</h2>

      {/* Chronic illnesses */}
      <ChronicIllnessesSection
        value={patientChronic}
        onChange={setPatientChronic}
        errors={errors}
      />

      {/* Vaccines */}
      <VaccineSection
        value={vaccineData}
        onChange={setVaccineData}
        errors={errors}
      />

      {/* Surgical history */}
      <div className="mt-6 border border-gray-300 rounded-xl bg-white shadow-sm p-4">
        <div className="py-2 flex items-center justify-between">
          <h2 className="font-semibold text-[18px] text-mainblack">
            Surgical History
          </h2>
          <button
            type="button"
            onClick={handleAddSurgery}
            className="px-3 py-1.5 rounded-md bg-secondary text-white text-sm hover:opacity-90"
          >
            + Add Surgery
          </button>
        </div>

        {surgeries.length === 0 && (
          <p className="text-sm text-gray-500 px-1">
            No surgeries recorded. Click &quot;Add Surgery&quot; if the patient has had any surgery.
          </p>
        )}

        <div className="space-y-4 mt-2">
          {surgeries.map((surgery, index) => (
            <SurgeryEntry
              key={index}
              index={index}
              value={surgery}
              onChange={handleChangeSurgery}
              onRemove={handleRemoveSurgery}
            />
          ))}
        </div>
      </div>

      {/* Main save button */}
      {/* <button
        type="submit"
        className="mt-2 px-5 py-2 bg-secondary/90 hover:bg-secondary text-white rounded-md text-[15px] font-semibold"
      >
        Next
      </button> */}
    {showButton && (
      <div className="mt-2 flex justify-end">
        <button
        type="button"
        className="px-8 py-3 bg-secondary/90 hover:bg-secondary text-white rounded-full text-[17px] font-semibold"
        onClick={() => {
          // if you want validation later, put it here
          onNext(); // ✅ GO TO NEXT PAGE
        }}
      >
        Next
      </button>
      </div>
    )}
      
    </form>
  );
}