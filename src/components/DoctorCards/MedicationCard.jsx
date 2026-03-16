//thathsara
import { useState, useEffect  } from "react";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";


export function MedicationCard({
  formData,
  onChange,
  isViewMode = false,
  canEdit = true,
}) {
  const cardBox = "border border-gray-300 rounded-xl bg-white shadow-sm p-4";
  const _labelCss = "text-[15px] font-semibold text-gray-700 mb-1 block";

  // Initialize medications from formData or create default empty rows
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
  { medicine: "", dose: "", frequency: "", duration: "", timing: "" }
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

  // Update parent formData whenever medications change
  const updateParent = (newMedications) => {
    setMedications(newMedications);
    // Filter out completely empty rows before saving
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
    { value: "1-0-0", label: "1-0-0(Morning-Afternoon-Night)" },
    { value: "1-1-0", label: "1-1-0(Morning-Afternoon-Night)" },
    { value: "1-0-1", label: "1-0-1(Morning-Afternoon-Night)" },
    { value: "1-1-1", label: "1-1-1(Morning-Afternoon-Night)" },
    { value: "2-0-0", label: "2-0-0(Morning-Afternoon-Night)" },
    { value: "2-2-0", label: "2-2-0(Morning-Afternoon-Night)" },
    { value: "2-0-2", label: "2-0-2(Morning-Afternoon-Night)" },
    { value: "2-2-2", label: "2-2-2(Morning-Afternoon-Night)" },
    { value: "Once daily", label: "Once daily" },
    { value: "Twice daily", label: "Twice daily" },
    { value: "Three times daily", label: "Three times daily" },
    { value: "Every 4 hours", label: "Every 4 hours" },
    { value: "Every 6 hours", label: "Every 6 hours" },
    { value: "Every 8 hours", label: "Every 8 hours" },
    { value: "As needed", label: "As needed" },
    { value: "OTHER", label: "Other (type manually)" }
  ];

  const timingOptions= [
    { value: "", label: "Select..." },
    { value: "Before meals", label: "Before meals" },
    { value: "After meals", label: "After meals" },
    { value: "At bedtime", label: "At bedtime" },
  ];
    
  // Handle input change for a specific row and field
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

  const newMedications = [
    ...medications,
    { medicine: "", dose: "", frequency: "", duration: "", timing: "", customFrequency: "" },
  ];

  setMedications(newMedications);
};

  // Remove medication row
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

  // Table styles
  const tableHeaderCss =
    "px-3 py-2 text-left text-sm font-semibold text-gray-700 bg-gray-100 border-b border-gray-300";
  const tableCellCss = "px-3 py-2 border-b border-gray-200";
  const inputCss =
    "w-full px-2 py-1.5 text-sm rounded border border-gray-300 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition";
  const selectCss =
    "w-full px-2 py-1.5 text-sm rounded border border-gray-300 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition";

  return (
    <div className={cardBox}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Medication</h3>
        <button
          onClick={handleAddRow}
          className="px-4 py-1.5 text-sm bg-secondary text-white rounded-md hover:bg-secondary/90 transition font-semibold"
        >
          + Add Medicine
        </button>
      </div>

      {/* Medication Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr>
              <th className={tableHeaderCss + " rounded-tl-lg"}>Medicine</th>
              <th className={tableHeaderCss}>Dose</th>
              <th className={tableHeaderCss}>Frequency</th>
              <th className={tableHeaderCss}>Duration</th>
               <th className={tableHeaderCss}>Timing</th>
              <th className={tableHeaderCss + " rounded-tr-lg w-20"}></th>
            </tr>
          </thead>
          <tbody>
            {medications.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-3 py-4 text-center text-gray-500 text-sm"
                >
                  No medications added yet
                </td>
              </tr>
            ) : (
              medications.map((med, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {/* Medicine Name */}
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

                  {/* Dose */}
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

                  {/* Frequency */}
                  <td className={tableCellCss}>
  {med.frequency === "OTHER" ? (
    <input
      type="text"
      value={med.customFrequency || ""}
      onChange={(e) =>
        handleInputChange(index, "customFrequency", e.target.value)
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
      className={selectCss}
    >
      {frequencyOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )}
</td>


                  {/* Duration */}
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
                      className={selectCss}
                    >
                      {timingOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Remove Button */}
                  <td className={tableCellCss + " text-center"}>
                    <button
                      onClick={() => handleRemoveRow(index)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition"
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

      {/* Helper Text */}
      <p className="text-xs text-gray-500 mt-3">
        💡 Add medications with dosage, frequency, and duration for the patient
      </p>
    </div>
  );
}
