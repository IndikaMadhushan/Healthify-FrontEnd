//thathsara
export function VitalSignsCard({ formData, onChange }) {
  const cardBox = "border border-gray-300 rounded-xl bg-white shadow-sm p-4";
  const labelCss = "text-[15px] font-semibold text-gray-700 mb-1 block";
  const inputBase =
    "w-full h-8 px-3 rounded-md bg-gray-100 border border-gray-300 text-[15px] text-gray-700 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition";

  return (
    <div className={cardBox}>
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Vital Signs{" "}
        <span className="text-sm text-gray-500 font-normal">(Optional)</span>
      </h3>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelCss}>Blood Pressure(mmHg)</label>
         <input
          type="text"
          value={formData.mediMessure?.BP || ""}
          onChange={(e) => {
            const value = e.target.value;

            // Allow only numbers and one slash
            if (/^\d*\/?\d*$/.test(value)) {
              onChange("BP", value);
            }
          }}
          placeholder="e.g., 120/80"
          className={inputBase}
        />
        </div>
        <div>
          <label className={labelCss}>Heart Rate(bpm)</label>
          {/* Heart Rate */}
          <input
            type="text"
            value={formData.mediMessure?.pulse || ""}
            onChange={(e) => onChange("pulse", e.target.value)}
            className={inputBase}
          />

        </div>

        <div>
          <label className={labelCss}>Temperature(°F)</label>
          <input
            type="text"
            value={formData.mediMessure?.temperature || ""}
            onChange={(e) => onChange("temperature", e.target.value)}
            className={inputBase}
          />
        </div>
        <div>
          <label className={labelCss}>Weight(kg)</label>
          <input
            type="text"
            value={formData.mediMessure?.weight || ""}
            onChange={(e) => onChange("weight", e.target.value)}
            className={inputBase}
          />
        </div>

        <div>
          <label className={labelCss}>Blood Sugar(mg/dL)</label>
          <input
            type="text"
            value={formData.mediMessure?.bloodSugar || ""}
            onChange={(e) => onChange("bloodSugar", e.target.value)}
            className={inputBase}
          />
        </div>
        <div>
          <label className={labelCss}>Cholesterol(mg/dL)</label>
          <input
            type="text"
            value={formData.mediMessure?.cholesterol || ""}
            onChange={(e) => onChange("cholesterol", e.target.value)}
            placeholder="e.g., 90 mg/dL"
            className={inputBase}
          />
        </div>
      </div>
    </div>
  );
}
