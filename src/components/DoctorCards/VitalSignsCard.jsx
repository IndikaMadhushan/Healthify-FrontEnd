//thathsara
export function VitalSignsCard({ formData, onChange }) {
  const cardBox = "border border-gray-300 rounded-xl bg-white shadow-sm p-4";
  const labelCss = "text-[15px] font-semibold text-gray-700 mb-1 block";
  const inputBase =
    "w-full h-10 px-3 rounded-md bg-gray-100 border border-gray-300 text-[15px] text-gray-700 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition";

  return (
    <div className={cardBox}>
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Vital Signs{" "}
        <span className="text-sm text-gray-500 font-normal">(Optional)</span>
      </h3>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelCss}>Blood Pressure</label>
          <input
            type="text"
            value={formData.bloodPressure}
            onChange={(e) => onChange("bloodPressure", e.target.value)}
            placeholder="e.g., 120/80"
            className={inputBase}
          />
        </div>
        <div>
          <label className={labelCss}>Pulse</label>
          <input
            type="text"
            value={formData.pulse}
            onChange={(e) => onChange("pulse", e.target.value)}
            placeholder="e.g., 72 bpm"
            className={inputBase}
          />
        </div>

        <div>
          <label className={labelCss}>Temperature</label>
          <input
            type="text"
            value={formData.temperature}
            onChange={(e) => onChange("temperature", e.target.value)}
            placeholder="e.g., 98.6°F"
            className={inputBase}
          />
        </div>
        <div>
          <label className={labelCss}>Weight</label>
          <input
            type="text"
            value={formData.weight}
            onChange={(e) => onChange("weight", e.target.value)}
            placeholder="e.g., 65 kg"
            className={inputBase}
          />
        </div>

        <div>
          <label className={labelCss}>Respiratory Rate</label>
          <input
            type="text"
            value={formData.respiratoryRate}
            onChange={(e) => onChange("respiratoryRate", e.target.value)}
            placeholder="e.g., 16/min"
            className={inputBase}
          />
        </div>
      </div>
    </div>
  );
}
