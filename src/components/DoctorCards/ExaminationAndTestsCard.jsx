//thathsara
export function ExaminationAndTestsCard({ formData, onChange }) {
  const cardBox = "border border-gray-300 rounded-xl bg-white shadow-sm p-4";
  const labelCss = "text-[15px] font-semibold text-gray-700 mb-1 block";
  const textAreaBase =
    "w-full min-h-[100px] px-3 py-2 rounded-md bg-gray-100 border border-gray-300 text-[15px] text-gray-700 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none resize-y transition";

  return (
    <div className={cardBox}>
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Examination & Tests
      </h2>

      <textarea
        value={formData.examinationNotes}
        onChange={(e) => onChange("examinationNotes", e.target.value)}
        placeholder="Enter examination findings and test results..."
        className={textAreaBase}
      />
    </div>
  );
}
