import { FiArrowRight, FiClock, FiFolder } from "react-icons/fi";
import { getDisplayName } from "../../utils/nameUtils";

function formatRecentAccess(value) {
  if (!value) {
    return "Opened recently";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Opened recently";
  }

  return `Opened ${date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })}`;
}

export default function LatestPatientsCard({ recentPatients, onViewProfile }) {
  return (
    <section className="rounded-[32px] border border-[#DCEFED] bg-white/95 p-6 shadow-[0_18px_44px_rgba(15,79,82,0.08)] sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
            <FiClock className="text-xl" />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0F4F52]">
            Recent Patients
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5D7B7D]">
            Jump back into patient records you opened recently and continue
            their review without searching again.
          </p>
        </div>

        <div className="inline-flex w-fit items-center rounded-full border border-[#DCEFED] bg-[#F7FCFB] px-4 py-2 text-sm font-semibold text-[#0F4F52]">
          {recentPatients.length} shortcut
          {recentPatients.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="mt-6 space-y-4 max-h-[32rem] overflow-y-auto pr-1">
        {recentPatients.length === 0 && (
          <div className="rounded-[28px] border border-dashed border-[#CFE8E5] bg-[linear-gradient(135deg,#F8FCFB_0%,#F1F9F7_100%)] p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary/10 text-secondary">
              <FiFolder className="text-2xl" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-[#0F4F52]">
              No recent patients yet
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#5D7B7D]">
              Search for a patient to open their records. The most recent
              patients will appear here for faster access.
            </p>
          </div>
        )}

        {recentPatients.map((patient) => {
          const patientName =
            getDisplayName(patient) || `Patient #${patient.id}`;
          const patientInitial = patientName.charAt(0).toUpperCase();

          return (
            <div
              key={patient.id}
              className="rounded-[28px] border border-[#DCEFED] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FCFB_100%)] p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  {patient.photoUrl ? (
                    <img
                      src={patient.photoUrl}
                      alt={patientName}
                      className="h-14 w-14 rounded-2xl object-cover ring-4 ring-secondary/10"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-primary text-lg font-bold text-white shadow-sm">
                      {patientInitial}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="text-lg font-semibold text-[#0F4F52]">
                      {patientName}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-[#5D7B7D]">
                      <MetaPill
                        label="ID"
                        value={patient.patientId || patient.id}
                      />
                      <MetaPill label="NIC" value={patient.nic || "-"} />
                      <MetaPill label="Gender" value={patient.gender || "-"} />
                    </div>
                    <p className="mt-3 text-sm text-[#6B8A8C]">
                      {formatRecentAccess(
                        patient.accessedAt || patient.lastVisit,
                      )}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onViewProfile(patient)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-secondary to-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(24,170,176,0.22)] transition hover:translate-y-[-1px] hover:opacity-95"
                >
                  Open Patient
                  <FiArrowRight className="text-base" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MetaPill({ label, value }) {
  return (
    <span className="rounded-full border border-[#DCEFED] bg-white px-3 py-1 font-medium">
      <span className="font-semibold text-secondary">{label}:</span> {value}
    </span>
  );
}
