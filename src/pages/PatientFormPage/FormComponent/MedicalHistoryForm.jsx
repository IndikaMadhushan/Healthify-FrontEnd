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
  readOnly = false,
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

  const handleChronicChange = (nextValue) => {
    setPatientChronic(nextValue);
    setErrors((prev) => {
      const nextErrors = { ...prev };

      if (
        !nextValue.chronicIllnesses.includes("Cancer") ||
        nextValue.cancerChronic.trim()
      ) {
        delete nextErrors.cancerChronic;
      }

      if (
        !nextValue.chronicIllnesses.includes("Other") ||
        nextValue.otherChronic.trim()
      ) {
        delete nextErrors.otherChronic;
      }

      return nextErrors;
    });
  };

  const handleVaccineChange = (nextValue) => {
    setVaccineData(nextValue);
    setErrors((prev) => {
      if (
        prev.otherVaccine &&
        (!nextValue.takenVaccines.includes("Other") ||
          nextValue.otherVaccine.trim())
      ) {
        const nextErrors = { ...prev };
        delete nextErrors.otherVaccine;
        return nextErrors;
      }

      return prev;
    });
  };

  const handleChangeSurgery = (index, updated) => {
    setErrors((prev) => {
      if (!prev.surgeries?.[index]) return prev;
      const nextSurgeries = [...prev.surgeries];
      nextSurgeries[index] = {};
      return { ...prev, surgeries: nextSurgeries };
    });
    setSurgeries((prev) =>
      prev.map((item, i) => (i === index ? updated : item))
    );
  };

  const handleRemoveSurgery = (index) => {
    setErrors((prev) => {
      if (!prev.surgeries) return prev;
      const nextSurgeries = prev.surgeries.filter((_, i) => i !== index);
      return { ...prev, surgeries: nextSurgeries };
    });
    setSurgeries((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    const normalizedSurgeries = surgeries.map((item) => ({
      surgeonName: item.surgeonName.trim(),
      surgeryDate: item.surgeryDate,
      hospital: item.hospital.trim(),
      complications: item.complications.trim(),
    }));

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

    const surgeryErrors = normalizedSurgeries.map((item) => {
      const hasAnyValue = Object.values(item).some(Boolean);
      if (!hasAnyValue) return {};

      const rowErrors = {};
      const surgeryDate = item.surgeryDate
        ? new Date(`${item.surgeryDate}T00:00:00`)
        : null;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (!item.surgeryDate) {
        rowErrors.surgeryDate = "Date of surgery is required";
      } else if (Number.isNaN(surgeryDate.getTime()) || surgeryDate > today) {
        rowErrors.surgeryDate = "Please enter a valid past surgery date";
      }

      return rowErrors;
    });

    if (surgeryErrors.some((item) => Object.keys(item).length > 0)) {
      newErrors.surgeries = surgeryErrors;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return null;
    }

    return {
      chronic: {
        ...patientChronic,
        otherChronic: patientChronic.otherChronic.trim(),
        cancerChronic: patientChronic.cancerChronic.trim(),
      },
      vaccines: {
        ...vaccineData,
        otherVaccine: vaccineData.otherVaccine.trim(),
      },
      surgeries: normalizedSurgeries.filter((item) =>
        Object.values(item).some(Boolean)
      ),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (readOnly) return;

    const payload = validateForm();
    if (!payload) return;

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

  const handleNextClick = () => {
    if (readOnly) return;
    const payload = validateForm();
    if (!payload) return;
    onNext();
  };

  const sectionHeading = "text-xl font-bold text-mainblack mb-4";
  const actionButtonClass =
    "px-5 py-2 bg-secondary/90 hover:bg-secondary text-white rounded-full text-[15px] font-semibold";

  return (
    <form onSubmit={handleSubmit} className="text-mainblack space-y-6">
      <h2 className={sectionHeading}>Medical Information</h2>

      <fieldset disabled={readOnly} className="space-y-6">

      <ChronicIllnessesSection
        value={patientChronic}
        onChange={handleChronicChange}
        errors={errors}
      />

      <VaccineSection
        value={vaccineData}
        onChange={handleVaccineChange}
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
              errors={errors.surgeries?.[index] || {}}
            />
          ))}
        </div>
      </div>
      </fieldset>

      {readOnly ? null : showButton ? (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            className={actionButtonClass}
            onClick={handleNextClick}
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
