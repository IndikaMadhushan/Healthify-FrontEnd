import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ChronicIllnessesSection from "./ChronicIllnessesSection";
import VaccineSection from "./VaccineSection";
import SurgeryEntry from "./SurgeryEntry";

const initialChronic = {
  chronicIllnesses: [],
  otherChronic: "",
  cancerChronic: ""
};

const vaccineInitial = {
  takenVaccines: [],
  otherVaccine: ""
};

const emptySurgery = {
  surgeonName: "",
  surgeryDate: "",
  hospital: "",
  complications: ""
};

export default function PatientMedicalForm({
  showButton = false,
  onNext,
  initialData,
  onSubmit,
  isSaving = false,
}) {
  const [patientChronic, setPatientChronic] = useState(initialChronic);
  const [vaccineData, setVaccineData] = useState(vaccineInitial);
  const [surgeries, setSurgeries] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!initialData) return;

    // The form needs to rehydrate when page data is loaded or refreshed.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPatientChronic({
      chronicIllnesses: Array.isArray(initialData.chronic?.chronicIllnesses)
        ? initialData.chronic.chronicIllnesses
        : [],
      otherChronic: initialData.chronic?.otherChronic ?? "",
      cancerChronic: initialData.chronic?.cancerChronic ?? "",
    });
    setVaccineData({
      takenVaccines: Array.isArray(initialData.vaccines?.takenVaccines)
        ? initialData.vaccines.takenVaccines
        : [],
      otherVaccine: initialData.vaccines?.otherVaccine ?? "",
    });
    setSurgeries(
      Array.isArray(initialData.surgeries)
        ? initialData.surgeries.map((item) => ({
            ...item,
            surgeonName:
              item?.surgeonName ?? item?.reason ?? item?.description ?? "",
            surgeryDate: item?.surgeryDate ?? "",
            hospital: item?.hospital ?? "",
            complications: item?.complications ?? "",
          }))
        : []
    );
    setErrors({});
  }, [initialData]);

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

  const handleSubmit = async (e) => {
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

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        console.log("Patient medical full payload:", payload);
      }
      toast.success("Medical information submitted successfully");
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Failed to submit medical information";
      toast.error(message);
    }
  };

  const sectionHeading = "text-xl font-bold text-mainblack mb-4";
  const actionButtonClass =
    "px-5 py-2 bg-secondary/90 hover:bg-secondary text-white rounded-full text-[15px] font-semibold";

  return (
    <form onSubmit={handleSubmit} className="text-mainblack space-y-6">
      <h2 className={sectionHeading}>Medical Information</h2>

      <ChronicIllnessesSection
        value={patientChronic}
        onChange={setPatientChronic}
        errors={errors}
      />

      <VaccineSection
        value={vaccineData}
        onChange={setVaccineData}
        errors={errors}
      />

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
            No surgeries recorded. Click &quot;Add Surgery&quot; if the patient
            has had any surgery.
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

      {showButton ? (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            className={actionButtonClass}
            onClick={() => {
              onNext();
            }}
          >
            Next
          </button>
        </div>
      ) : (
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={actionButtonClass}
          >
            {isSaving ? "Saving..." : "Submit Medical Info"}
          </button>
        </div>
      )}
    </form>
  );
}
