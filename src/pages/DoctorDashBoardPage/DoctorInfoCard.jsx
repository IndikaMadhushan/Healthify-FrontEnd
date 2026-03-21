import { FiAward, FiBriefcase, FiHash, FiUsers } from "react-icons/fi";
import { getDisplayName } from "../../utils/nameUtils";

function InfoTile({ icon, label, value }) {
  const IconComponent = icon;

  return (
    <div className="rounded-2xl border border-[#DCEFED] bg-[#F7FCFB] p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-secondary shadow-sm">
          <IconComponent className="text-lg" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6B8A8C]">
            {label}
          </p>
          <p className="mt-2 break-words text-base font-semibold text-[#0F4F52]">
            {value || "Not added"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DoctorInfoCard({ doctor, recentPatientsCount = 0 }) {
  if (!doctor) {
    return (
      <div className="rounded-[32px] border border-[#DCEFED] bg-white/90 p-6 shadow-[0_18px_44px_rgba(15,79,82,0.08)] sm:p-8">
        <div className="animate-pulse space-y-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="h-28 w-28 rounded-[28px] bg-[#E7F6F4]" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-28 rounded-full bg-[#E7F6F4]" />
              <div className="h-8 w-56 rounded-full bg-[#E7F6F4]" />
              <div className="h-4 w-72 max-w-full rounded-full bg-[#E7F6F4]" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-28 rounded-2xl bg-[#F3FBFA]" />
            <div className="h-28 rounded-2xl bg-[#F3FBFA]" />
            <div className="h-28 rounded-2xl bg-[#F3FBFA]" />
            <div className="h-28 rounded-2xl bg-[#F3FBFA]" />
          </div>
        </div>
      </div>
    );
  }

  const doctorDisplayName = getDisplayName(doctor);
  const doctorHeadingName = /^dr\.?\s/i.test(doctorDisplayName)
    ? doctorDisplayName
    : `Dr. ${doctorDisplayName}`;

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#DCEFED] bg-white/95 p-6 shadow-[0_18px_44px_rgba(15,79,82,0.08)] sm:p-8">
      <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left lg:w-[280px] lg:flex-col lg:items-start">
            <div className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-secondary/25 to-primary/20 blur-md" />
              <img
                src={doctor.photoUrl || "/profilePic.png"}
                alt={doctorDisplayName}
                className="relative h-28 w-28 rounded-[30px] border-4 border-white object-cover shadow-[0_18px_36px_rgba(24,170,176,0.18)] sm:h-32 sm:w-32"
              />
            </div>

            <div>
              {/* <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                Doctor profile
              </p> */}
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#0F4F52]">
                {doctorHeadingName}
              </h2>
              <p className="mt-2 text-sm text-[#5D7B7D]">
                {doctor.email || "Email not available"}
              </p>
            </div>
          </div>

          <div className="flex-1 rounded-[28px] border border-[#DCEFED] bg-[linear-gradient(135deg,#F7FCFB_0%,#EEF9F5_100%)] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B8A8C]">
                  Profile snapshot
                </p>
                <p className="mt-2 text-lg font-semibold text-[#0F4F52]">
                  Everything you need for today&apos;s clinical workflow.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <StatusPill
                  label="Recent patients"
                  value={recentPatientsCount}
                />
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#5D7B7D]">
              Keep your profile details current so patients and records stay
              clearly connected across consultations and reports.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoTile
            icon={FiHash}
            label="License number"
            value={doctor.licenseNumber}
          />
          <InfoTile
            icon={FiAward}
            label="Specialization"
            value={doctor.specialization}
          />
          <InfoTile
            icon={FiBriefcase}
            label="Hospital"
            value={doctor.hospital}
          />
          <InfoTile icon={FiUsers} label="Doctor ID" value={doctor.doctorId} />
        </div>
      </div>
    </section>
  );
}

function StatusPill({ label, value }) {
  return (
    <div className="min-w-[170px] rounded-2xl border border-[#DCEFED] bg-white px-4 py-3 text-[#0F4F52] shadow-sm">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
        {label}
      </p>
      <div className="mt-3 flex justify-center">
        <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#F2FBFA_0%,#E7F6F4_100%)] px-3 text-base font-bold text-[#0F4F52]">
          {value}
        </span>
      </div>
    </div>
  );
}
