import { FiActivity, FiHeart } from "react-icons/fi";

const vitalFields = [
  {
    key: "BP",
    label: "Blood Pressure",
    unit: "mmHg",
    placeholder: "120/80",
  },
  {
    key: "pulse",
    label: "Heart Rate",
    unit: "bpm",
    placeholder: "72",
  },
  {
    key: "temperature",
    label: "Temperature",
    unit: "deg F",
    placeholder: "98.6",
  },
  {
    key: "weight",
    label: "Weight",
    unit: "kg",
    placeholder: "65",
  },
  {
    key: "bloodSugar",
    label: "Blood Sugar",
    unit: "mg/dL",
    placeholder: "95",
  },
  {
    key: "cholesterol",
    label: "Cholesterol",
    unit: "mg/dL",
    placeholder: "180",
  },
];

export function VitalSignsCard({ formData, onChange }) {
  const cardBox =
    "rounded-[30px] border border-[#DCEFED] bg-white/95 p-6 shadow-[0_22px_58px_rgba(15,79,82,0.10)] backdrop-blur-sm sm:p-7";
  const labelCss = "mb-2 block text-sm font-semibold text-[#0F4F52]";
  const inputBase =
    "w-full rounded-2xl border border-[#D6ECEA] bg-[#F7FCFB] px-4 py-3 text-[15px] text-[#0F4F52] outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/10";

  return (
    <section className={cardBox}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
            <FiHeart className="text-xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-[#0F4F52]">
              Vital Signs
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#5D7B7D]">
              Capture the latest vitals to support diagnosis and follow-up
              decisions.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEFED] bg-[#F7FCFB] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B8A8C]">
          <FiActivity className="text-sm text-secondary" />
          Optional
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {vitalFields.map((field) => (
          <div
            key={field.key}
            className="rounded-[24px] border border-[#DCEFED] bg-[linear-gradient(135deg,#FFFFFF_0%,#F7FCFB_100%)] p-4"
          >
            <label className={labelCss}>
              {field.label} ({field.unit})
            </label>
            <input
              type="text"
              value={formData.mediMessure?.[field.key] || ""}
              onChange={(e) => {
                const value = e.target.value;

                if (field.key === "BP") {
                  if (/^\d*\/?\d*$/.test(value)) {
                    onChange(field.key, value);
                  }
                  return;
                }

                onChange(field.key, value);
              }}
              placeholder={field.placeholder}
              className={inputBase}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
