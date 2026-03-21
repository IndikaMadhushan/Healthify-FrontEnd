import { FiActivity } from "react-icons/fi";

export function ExaminationAndTestsCard({ formData, onChange }) {
  const cardBox =
    "rounded-[30px] border border-[#DCEFED] bg-white/95 p-6 shadow-[0_22px_58px_rgba(15,79,82,0.10)] backdrop-blur-sm sm:p-7";
  const textAreaBase =
    "w-full min-h-[220px] rounded-[24px] border border-[#D6ECEA] bg-[#F7FCFB] px-4 py-4 text-[15px] leading-7 text-[#0F4F52] outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/10";

  return (
    <section className={cardBox}>
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
          <FiActivity className="text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0F4F52]">
            Examination and Tests
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#5D7B7D]">
            Record examination findings, observations, and any immediate
            diagnostic considerations.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-[26px] border border-[#DCEFED] bg-[linear-gradient(135deg,#FFFFFF_0%,#F7FCFB_100%)] p-4">
        <textarea
          value={formData.clinicExaming || ""}
          onChange={(e) => onChange("clinicExaming", e.target.value)}
          placeholder="Document physical examination findings, relevant observations, and important clinical notes..."
          className={textAreaBase}
        />
      </div>
    </section>
  );
}
