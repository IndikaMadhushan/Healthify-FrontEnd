import { FiCalendar, FiFileText } from "react-icons/fi";

export function AdditionalNotesCard({ formData, onChange }) {
  const cardBox =
    "rounded-[30px] border border-[#DCEFED] bg-white/95 p-6 shadow-[0_22px_58px_rgba(15,79,82,0.10)] backdrop-blur-sm sm:p-7";
  const labelCss = "mb-2 block text-sm font-semibold text-[#0F4F52]";
  const textAreaBase =
    "w-full min-h-[160px] rounded-[24px] border border-[#D6ECEA] bg-[#F7FCFB] px-4 py-4 text-[15px] leading-7 text-[#0F4F52] outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/10";
  const inputBase =
    "w-full rounded-2xl border border-[#D6ECEA] bg-[#F7FCFB] px-4 py-3 text-[15px] text-[#0F4F52] outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/10";

  return (
    <section className={cardBox}>
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
          <FiFileText className="text-xl" />
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-[#0F4F52]">
            Additional Information
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#5D7B7D]">
            Add recommended tests, doctor instructions, and the next
            consultation date.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <div className="rounded-[24px] border border-[#DCEFED] bg-[linear-gradient(135deg,#FFFFFF_0%,#F7FCFB_100%)] p-4">
          <label className={labelCss}>Suggested Tests</label>
          <textarea
            value={formData.clinicSuggestTest || ""}
            onChange={(e) => onChange("clinicSuggestTest", e.target.value)}
            placeholder="List any recommended investigations such as blood tests, imaging, or ECG."
            className={textAreaBase}
          />
        </div>

        <div className="rounded-[24px] border border-[#DCEFED] bg-[linear-gradient(135deg,#FFFFFF_0%,#F7FCFB_100%)] p-4">
          <label className={labelCss}>Doctor Note</label>
          <textarea
            value={formData.clinicDoctorNote || ""}
            onChange={(e) => onChange("clinicDoctorNote", e.target.value)}
            placeholder="Add instructions, warnings, follow-up advice, or other clinical notes."
            className={textAreaBase}
          />
        </div>
      </div>

      <div className="mt-4 rounded-[24px] border border-[#DCEFED] bg-[linear-gradient(135deg,#F9FCFB_0%,#F1F9F7_100%)] p-4">
        <label className={labelCss}>
          <span className="inline-flex items-center gap-2">
            <FiCalendar className="text-base text-secondary" />
            Next Consultation Date
          </span>
        </label>
        <input
          type="date"
          value={formData.nextClinic || ""}
          onChange={(e) => onChange("nextClinic", e.target.value)}
          className={inputBase}
        />
      </div>
    </section>
  );
}
