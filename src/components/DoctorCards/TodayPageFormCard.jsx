//thathsara
export function TodayPageFormCard({ formData, onChange, errors = {} }) {
  const cardBox = "border border-gray-300 rounded-xl bg-white shadow-sm p-4";
  const labelCss = "text-[15px] font-semibold text-gray-700 mb-1 block";
  const inputBase =
    "w-full h-8 px-3 rounded-md bg-gray-100 border text-[15px] text-gray-700 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition";
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className={cardBox}>
      <h2 className="text-lg font-bold text-gray-800 mb-4">Today Page</h2>

      <div className="mb-4">
        <label className={labelCss}>Date</label>
        <input
          type="date"
          value={formData.date || today}
          className={inputBase + " bg-gray-200 cursor-not-allowed"}
          disabled
        />
      </div>
      <div className="mb-4">
        <label className={labelCss}>
          Reason for Visit <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.subReason}
onChange={(e) => onChange("subReason", e.target.value)}
          placeholder="Why is the patient visiting today?"
          className={
            inputBase +
            (errors.subReason ? " border-red-500" : " border-gray-300")
          }
        />
        {errors.subReason && (
          <p className="text-xs text-red-500 mt-1">{errors.subReason}</p>
        )}
      </div>
    </div>
  );
}
