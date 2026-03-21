import { FiCalendar, FiClipboard } from "react-icons/fi";

export function TodayPageFormCard({ formData, onChange, errors = {} }) {
  const cardBox =
    "rounded-[30px] border border-[#DCEFED] bg-white/95 p-6 shadow-[0_22px_58px_rgba(15,79,82,0.10)] backdrop-blur-sm sm:p-7";
  const labelCss = "mb-2 block text-sm font-semibold text-[#0F4F52]";
  const inputBase =
    "w-full rounded-2xl border border-[#D6ECEA] bg-[#F7FCFB] px-4 py-3 text-[15px] text-[#0F4F52] outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/10";
  const today = new Date().toISOString().slice(0, 10);
  const usesReasonForVisit = Object.prototype.hasOwnProperty.call(
    formData,
    "reasonForVisit",
  );
  const reasonField = usesReasonForVisit ? "reasonForVisit" : "subReason";
  const reasonValue = formData[reasonField] || "";
  const reasonError = errors.reasonForVisit || errors.subReason;

  return (
    <section className={cardBox}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
            <FiClipboard className="text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0F4F52]">
              Visit Summary
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5D7B7D]">
              Capture the visit date and the main reason for today&apos;s
              consultation.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEFED] bg-[#F7FCFB] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B8A8C]">
          <FiCalendar className="text-sm text-secondary" />
          Today
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="rounded-[24px] border border-[#DCEFED] bg-[linear-gradient(135deg,#F9FCFB_0%,#F1F9F7_100%)] p-4">
          <label className={labelCss}>Consultation Date</label>
          <input
            type="date"
            value={formData.date || today}
            className={`${inputBase} cursor-not-allowed bg-[#EEF5F4] text-[#5D7B7D]`}
            disabled
          />
        </div>

        <div className="rounded-[24px] border border-[#DCEFED] bg-[linear-gradient(135deg,#FFFFFF_0%,#F7FCFB_100%)] p-4">
          <label className={labelCss}>
            Reason for Visit <span className="text-red-500">*</span>
          </label>
          <textarea
            value={reasonValue}
            onChange={(e) => onChange(reasonField, e.target.value)}
            placeholder="Describe the patient's current complaint, symptoms, or consultation reason."
            className={`${inputBase} min-h-[152px] resize-y ${
              reasonError ? "border-red-400 focus:ring-red-100" : ""
            }`}
          />
          {reasonError && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {reasonError}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
