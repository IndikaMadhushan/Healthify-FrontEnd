//thathsara
export function MedicationCard({ formData, onChange }) {
  const cardBox = "border border-gray-300 rounded-xl bg-white shadow-sm p-4";
  const labelCss = "text-[15px] font-semibold text-gray-700 mb-1 block";
  const textAreaBase =
    "w-full min-h-[150px] px-3 py-2 rounded-md bg-gray-100 border border-gray-300 text-[15px] text-gray-700 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none resize-y transition";

  return (
    <div className={cardBox}>
      <h3 className="text-lg font-bold text-gray-800 mb-4">Medication</h3>

      <textarea
        value={formData.medication}
        onChange={(e) => onChange("medication", e.target.value)}
        placeholder="List medications with dosage and instructions...

Example:
- Omeprazole 20mg - Take 1 tablet before breakfast for 2 weeks
- Ranitidine 150mg - Take 1 tablet at night for 1 month"
        className={textAreaBase}
      />
    </div>
  );
}
