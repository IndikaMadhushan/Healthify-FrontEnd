import { useState } from "react";

const emptySurgery = {
  surgeonName: "",
  surgeryDate: "",
  hospital: "",
  complications: ""
};

export default function SurgeryEntry({ index, value, onChange, onRemove }) {
  const handleFieldChange = (field) => (e) => {
    onChange(index, { ...value, [field]: e.target.value });
  };

  const labelCss = "text-[15px] font-semibold text-gray-700";
  const inputBase =
    "mt-1 w-full h-10 px-3 rounded-md bg-gray-100 border text-[15px] text-gray-700 " +
    "focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition";
  const textAreaBase =
    "mt-1 w-full min-h-[80px] px-3 py-2 rounded-md bg-gray-100 border text-[15px] text-gray-700 " +
    "focus:ring-2 focus:ring-secondary focus:border-secondary outline-none resize-y transition";

  return (
    <div className="mt-3 border border-gray-300 rounded-xl bg-white shadow-sm p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-[17px] text-mainblack">
          Surgery {index + 1}
        </h3>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-sm text-red-600 hover:underline"
        >
          Remove
        </button>
      </div>

      {/* Reason for Surgery */}
      <div>
        <label className={labelCss}>Reason for Surgery</label>
        <input
          type="text"
          value={value.surgeonName}
          onChange={handleFieldChange("surgeonName")}
          className={inputBase}
          placeholder="Why was the surgery done?"
        />
      </div>

      {/* Date of Surgery */}
      <div>
        <label className={labelCss}>Date of Surgery</label>
        <input
          type="date"
          value={value.surgeryDate}
          onChange={handleFieldChange("surgeryDate")}
          className={inputBase}
        />
      </div>

      {/* Hospital / Surgeon */}
      <div>
        <label className={labelCss}>Hospital / Surgeon</label>
        <input
          type="text"
          value={value.hospital}
          onChange={handleFieldChange("hospital")}
          className={inputBase}
          placeholder="Enter hospital or surgeon name"
        />
      </div>

      {/* Complications */}
      <div>
        <label className={labelCss}>Surgery Complications (if any)</label>
        <textarea
          value={value.complications}
          onChange={handleFieldChange("complications")}
          className={textAreaBase}
          placeholder="Describe any complications or write 'None'"
        />
      </div>
    </div>
  );
}