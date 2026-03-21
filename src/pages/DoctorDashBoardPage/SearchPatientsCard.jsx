import { useMemo, useState } from "react";
import { FiArrowRight, FiSearch, FiUsers } from "react-icons/fi";
import { getDisplayName } from "../../utils/nameUtils";

function matchesPatient(patient, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return false;
  }

  const searchableFields = [
    patient.id,
    patient.patientId,
    patient.nic,
    getDisplayName(patient),
    patient.email,
  ];

  return searchableFields.some((value) =>
    String(value ?? "")
      .toLowerCase()
      .includes(normalizedQuery),
  );
}

export default function SearchPatientsCard({ patients, onViewProfile }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = useMemo(() => {
    if (searchQuery.trim() === "") {
      return [];
    }

    return patients.filter((patient) => matchesPatient(patient, searchQuery));
  }, [patients, searchQuery]);

  return (
    <section className="h-full rounded-[32px] border border-[#DCEFED] bg-white/95 p-6 shadow-[0_18px_44px_rgba(15,79,82,0.08)] sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
          <FiSearch className="text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0F4F52]">
            Search Patients
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#5D7B7D]">
            Find patients by ID, NIC, name, or email and open their medical
            record directly.
          </p>
        </div>
      </div>

      <div className="relative mt-6">
        <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-secondary/70" />
        <input
          type="text"
          placeholder="Search by patient ID, NIC, name, or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-[#D3F0ED] bg-[#F7FCFB] py-3 pl-12 pr-4 text-sm text-[#0F4F52] outline-none transition placeholder:text-[#7A989A] focus:border-secondary focus:ring-4 focus:ring-secondary/15"
        />
      </div>

      <div className="mt-4 rounded-2xl border border-[#E3F3F1] bg-[#F7FCFB] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B8A8C]">
          Search results
        </p>
        <p className="mt-2 text-sm text-[#0F4F52]">
          {searchQuery.trim() === ""
            ? "Start typing to find a patient record."
            : `${filteredPatients.length} matching patient${
                filteredPatients.length === 1 ? "" : "s"
              }`}
        </p>
      </div>

      <div className="mt-5 space-y-3 max-h-[28rem] overflow-y-auto pr-1">
        {searchQuery.trim() === "" && (
          <div className="rounded-[28px] border border-dashed border-[#CFE8E5] bg-[linear-gradient(135deg,#F8FCFB_0%,#F1F9F7_100%)] p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-secondary/10 text-secondary">
              <FiUsers className="text-2xl" />
            </div>
            <p className="mt-4 text-sm leading-6 text-[#5D7B7D]">
              Search results will appear here as soon as you enter a patient ID,
              NIC, name, or email.
            </p>
          </div>
        )}

        {searchQuery.trim() !== "" && filteredPatients.length === 0 && (
          <div className="rounded-[28px] border border-dashed border-[#CFE8E5] bg-[linear-gradient(135deg,#F8FCFB_0%,#F1F9F7_100%)] p-8 text-center">
            <p className="text-base font-semibold text-[#0F4F52]">
              No patient matches your search
            </p>
            <p className="mt-2 text-sm leading-6 text-[#5D7B7D]">
              Try a different patient ID, NIC, name, or email.
            </p>
          </div>
        )}

        {filteredPatients.map((patient) => {
          const patientName =
            getDisplayName(patient) || `Patient #${patient.id}`;
          const patientInitial = patientName.charAt(0).toUpperCase();

          return (
            <div
              key={patient.id}
              className="rounded-[28px] border border-[#DCEFED] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FCFB_100%)] p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                {patient.photoUrl ? (
                  <img
                    src={patient.photoUrl}
                    alt={patientName}
                    className="h-12 w-12 rounded-2xl object-cover ring-4 ring-secondary/10"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-primary text-sm font-bold text-white">
                    {patientInitial}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold text-[#0F4F52]">
                    {patientName}
                  </p>
                  <div className="mt-2 space-y-1 text-xs text-[#5D7B7D]">
                    <p>ID: {patient.patientId || patient.id}</p>
                    <p>NIC: {patient.nic || "-"}</p>
                    <p>{patient.email || patient.gender || "-"}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onViewProfile(patient)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-secondary to-primary px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(24,170,176,0.18)] transition hover:translate-y-[-1px] hover:opacity-95"
              >
                Open Patient
                <FiArrowRight className="text-base" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
