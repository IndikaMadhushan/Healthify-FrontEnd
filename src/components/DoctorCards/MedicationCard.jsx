import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiPlus, FiPackage } from "react-icons/fi";
import toast from "react-hot-toast";

export function MedicationCard({
  formData,
  onChange,
  isViewMode = false,
  canEdit = true,
}) {
  const cardBox =
    "rounded-[30px] border border-[#DCEFED] bg-white/95 p-6 shadow-[0_22px_58px_rgba(15,79,82,0.10)] backdrop-blur-sm sm:p-7";

  const getInitialMedications = () => {
    if (
      formData.medication &&
      Array.isArray(formData.medication) &&
      formData.medication.length > 0
    ) {
      return formData.medication;
    }

    return [
      { medicine: "", dose: "", frequency: "", duration: "", timing: "" },
      { medicine: "", dose: "", frequency: "", duration: "", timing: "" },
    ];
  };

  const [medications, setMedications] = useState(getInitialMedications());

  useEffect(() => {
    if (
      formData.medication &&
      JSON.stringify(formData.medication) !== JSON.stringify(medications)
    ) {
      setMedications(formData.medication);
    }
  }, [formData.medication]);

  const updateParent = (newMedications) => {
    setMedications(newMedications);

    const nonEmptyMedications = newMedications.filter((med) => {
      return (
        (med.medicine || "").trim() !== "" ||
        (med.dose || "").trim() !== "" ||
        (med.frequency || "").trim() !== "" ||
        (med.timing || "").trim() !== "" ||
        (med.duration || "").trim() !== ""
      );
    });

    onChange("medication", nonEmptyMedications);
  };

  const frequencyOptions = [
    { value: "", label: "Select..." },
    { value: "1-0-0", label: "1-0-0 (Morning-Afternoon-Night)" },
    { value: "1-1-0", label: "1-1-0 (Morning-Afternoon-Night)" },
    { value: "1-0-1", label: "1-0-1 (Morning-Afternoon-Night)" },
    { value: "1-1-1", label: "1-1-1 (Morning-Afternoon-Night)" },
    { value: "2-0-0", label: "2-0-0 (Morning-Afternoon-Night)" },
    { value: "2-2-0", label: "2-2-0 (Morning-Afternoon-Night)" },
    { value: "2-0-2", label: "2-0-2 (Morning-Afternoon-Night)" },
    { value: "2-2-2", label: "2-2-2 (Morning-Afternoon-Night)" },
    { value: "Once daily", label: "Once daily" },
    { value: "Twice daily", label: "Twice daily" },
    { value: "Three times daily", label: "Three times daily" },
    { value: "Every 4 hours", label: "Every 4 hours" },
    { value: "Every 6 hours", label: "Every 6 hours" },
    { value: "Every 8 hours", label: "Every 8 hours" },
    { value: "As needed", label: "As needed" },
    { value: "OTHER", label: "Other (type manually)" },
  ];

  const timingOptions = [
    { value: "", label: "Select..." },
    { value: "Before meals", label: "Before meals" },
    { value: "After meals", label: "After meals" },
    { value: "At bedtime", label: "At bedtime" },
  ];

  const handleInputChange = (index, field, value) => {
    const updatedMedications = [...medications];
    updatedMedications[index][field] = value;
    updateParent(updatedMedications);
  };

  const handleAddRow = () => {
    if (!canEdit && isViewMode) {
      toast.error("Edit window expired. Click 'Request Update' to make changes.");
      return;
    }

    setMedications((prev) => [
      ...prev,
      {
        medicine: "",
        dose: "",
        frequency: "",
        duration: "",
        timing: "",
        customFrequency: "",
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    if (!canEdit && isViewMode) {
      toast.error("Edit window expired. Click 'Request Update' to make changes.");
      return;
    }

    if (medications.length === 1) {
      toast.error("At least one row must remain");
      return;
    }

    const updatedMedications = medications.filter((_, i) => i !== index);
    updateParent(updatedMedications);
  };

  const tableHeaderCss =
    "bg-[#F4FBFA] px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#6B8A8C] border-b border-[#DCEFED]";
  const tableCellCss = "border-b border-[#E8F3F1] px-4 py-3 align-top";
  const inputCss =
    "w-full rounded-xl border border-[#D6ECEA] bg-[#F7FCFB] px-3 py-2.5 text-sm text-[#0F4F52] outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/10";

  return (
    <section className={cardBox}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
            <FiPackage className="text-xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-[#0F4F52]">
              Medication Plan
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#5D7B7D]">
              Add prescribed medicines with dosage, timing, and duration for
              the patient.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddRow}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-secondary to-primary px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(24,170,176,0.20)] transition hover:translate-y-[-1px] hover:opacity-95"
        >
          <FiPlus className="text-base" />
          Add Medicine
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[26px] border border-[#DCEFED]">
        <table className="min-w-[920px] w-full border-collapse bg-white">
          <thead>
            <tr>
              <th className={`${tableHeaderCss} rounded-tl-[26px]`}>
                Medicine
              </th>
              <th className={tableHeaderCss}>Dose</th>
              <th className={tableHeaderCss}>Frequency</th>
              <th className={tableHeaderCss}>Duration</th>
              <th className={tableHeaderCss}>Timing</th>
              <th className={`${tableHeaderCss} rounded-tr-[26px] w-20`}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {medications.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-8 text-center text-sm text-[#6B8A8C]"
                >
                  No medications added yet.
                </td>
              </tr>
            ) : (
              medications.map((med, index) => (
                <tr key={index} className="transition hover:bg-[#F8FCFB]">
                  <td className={tableCellCss}>
                    <input
                      type="text"
                      value={med.medicine}
                      onChange={(e) =>
                        handleInputChange(index, "medicine", e.target.value)
                      }
                      placeholder="e.g., Paracetamol"
                      className={inputCss}
                    />
                  </td>
                  <td className={tableCellCss}>
                    <input
                      type="text"
                      value={med.dose}
                      onChange={(e) =>
                        handleInputChange(index, "dose", e.target.value)
                      }
                      placeholder="e.g., 500mg"
                      className={inputCss}
                    />
                  </td>
                  <td className={tableCellCss}>
                    {med.frequency === "OTHER" ? (
                      <input
                        type="text"
                        value={med.customFrequency || ""}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "customFrequency",
                            e.target.value,
                          )
                        }
                        onBlur={() => {
                          if (!med.customFrequency) {
                            handleInputChange(index, "frequency", "");
                          }
                        }}
                        placeholder="Type frequency..."
                        className={inputCss}
                      />
                    ) : (
                      <select
                        value={med.frequency}
                        onChange={(e) =>
                          handleInputChange(index, "frequency", e.target.value)
                        }
                        className={inputCss}
                      >
                        {frequencyOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className={tableCellCss}>
                    <input
                      type="text"
                      value={med.duration}
                      onChange={(e) =>
                        handleInputChange(index, "duration", e.target.value)
                      }
                      placeholder="e.g., 5 days"
                      className={inputCss}
                    />
                  </td>
                  <td className={tableCellCss}>
                    <select
                      value={med.timing}
                      onChange={(e) =>
                        handleInputChange(index, "timing", e.target.value)
                      }
                      className={inputCss}
                    >
                      {timingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={`${tableCellCss} text-center`}>
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(index)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-red-600 transition hover:bg-red-50"
                      title="Remove medication"
                    >
                      <FaTrash size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs leading-5 text-[#6B8A8C]">
        Only non-empty medication rows will be included when the consultation
        is saved.
      </p>
    </section>
  );
}
