import { FiArrowRight, FiHash, FiMail, FiUser } from "react-icons/fi";
import { getDisplayName, getInitial } from "../../utils/nameUtils";

export function PatientDetailsCard({
  patientInfo,
  onMoreAboutPatient,
  showMedicationPurpose = true,
}) {
  const patient = patientInfo || {
    patientId: "UR5678",
    fullName: "Parindya Hewage",
    age: 23,
    gender: "Female",
  };

  const patientDisplayName =
    getDisplayName(patient) || `Patient #${patient.patientId || patient.id}`;
  const patientDetails = [
    {
      label: "Patient ID",
      value: patient.patientId || patient.id || "Not added",
      icon: FiHash,
    },
    {
      label: "Age",
      value: patient.age || "Not added",
      icon: FiUser,
    },
    {
      label: "Gender",
      value: patient.gender || "Not added",
      icon: FiUser,
    },
    {
      label: "Email",
      value: patient.email || "Not added",
      icon: FiMail,
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-[#DCEFED] bg-white/95 p-6 shadow-[0_22px_58px_rgba(15,79,82,0.10)] backdrop-blur-sm sm:p-7">
      <div className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] bg-gradient-to-br from-secondary to-primary text-2xl font-bold text-white shadow-[0_16px_34px_rgba(24,170,176,0.24)]">
            {getInitial(patient)}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Patient Snapshot
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0F4F52]">
              {patientDisplayName}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5D7B7D]">
              Quick patient identifiers and demographics for the current
              consultation.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {patientDetails.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-[22px] border border-[#DCEFED] bg-[linear-gradient(135deg,#FFFFFF_0%,#F7FCFB_100%)] p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    <Icon className="text-base" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B8A8C]">
                      {item.label}
                    </p>
                    <p className="mt-2 break-words text-sm font-semibold text-[#0F4F52]">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showMedicationPurpose && patient.medicationPurpose && (
          <div className="mt-4 rounded-[22px] border border-[#DCEFED] bg-[#F7FCFB] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6B8A8C]">
              Medication Purpose
            </p>
            <p className="mt-2 text-sm font-semibold text-[#0F4F52]">
              {patient.medicationPurpose}
            </p>
          </div>
        )}

        {onMoreAboutPatient && (
          <button
            type="button"
            onClick={onMoreAboutPatient}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#F2FBFA_0%,#E6F7F5_100%)] px-4 py-3 text-sm font-semibold text-secondary transition hover:translate-y-[-1px] hover:shadow-sm"
          >
            More About Patient
            <FiArrowRight className="text-base" />
          </button>
        )}
      </div>
    </section>
  );
}
