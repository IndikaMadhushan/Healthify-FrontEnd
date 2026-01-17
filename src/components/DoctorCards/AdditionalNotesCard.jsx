//thathsara
export function AdditionalNotesCard({ formData, onChange }) {
  const cardBox = "border border-gray-300 rounded-xl bg-white shadow-sm p-4";
  const labelCss = "text-[15px] font-semibold text-gray-700 mb-1 block";
  const textAreaBase =
    "w-full min-h-[80px] px-3 py-2 rounded-md bg-gray-100 border border-gray-300 text-[15px] text-gray-700 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none resize-y transition";
  const inputBase =
    "w-full h-10 px-3 rounded-md bg-gray-100 border border-gray-300 text-[15px] text-gray-700 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition";

  return (
    <div className={cardBox}>
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Additional Information
      </h3>

      <div className="space-y-4">
        <div>
          <label className={labelCss}>Suggested Tests</label>
          <textarea
            value={formData.suggestedTests}
            onChange={(e) => onChange("suggestedTests", e.target.value)}
            placeholder="List any tests you recommend (e.g., Blood test, X-ray, ECG)..."
            className={textAreaBase}
          />
        </div>
        <div>
          <label className={labelCss}>Doctor Note</label>
          <textarea
            value={formData.doctorNote}
            onChange={(e) => onChange("doctorNote", e.target.value)}
            placeholder="Any additional notes or instructions for the patient..."
            className={textAreaBase}
          />
        </div>

        <div>
          <label className={labelCss}>Next Consultation Date</label>
          <input
            type="date"
            value={formData.nextClinicDate}
            onChange={(e) => onChange("nextClinicDate", e.target.value)}
            className={inputBase}
          />
        </div>
      </div>
    </div>
  );
}
