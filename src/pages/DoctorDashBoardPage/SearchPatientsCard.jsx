import { useMemo, useState } from "react";
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
    String(value ?? "").toLowerCase().includes(normalizedQuery),
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
    <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-secondary/30 h-fit">
      <h2 className="text-2xl font-bold text-secondary mb-4">
        Search Patients
      </h2>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by patient ID, NIC, or name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {searchQuery.trim() === "" && (
          <p className="text-sm text-gray-500 text-center py-4">
            Enter a patient ID, NIC, or name
          </p>
        )}

        {searchQuery.trim() !== "" && filteredPatients.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No patients found
          </p>
        )}

        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-gray-50 rounded-lg p-3 border border-gray-200"
          >
            <p className="font-semibold text-gray-900 text-sm">
              {getDisplayName(patient) || `Patient #${patient.id}`}
            </p>

            <p className="text-xs text-gray-600">
              ID: {patient.patientId || patient.id}
            </p>

            <p className="text-xs text-gray-600">
              NIC: {patient.nic ? patient.nic.toLowerCase() : "-"}
            </p>

            <p className="text-xs text-gray-600">{patient.gender || "-"}</p>

            <button
              onClick={() => onViewProfile(patient)}
              className="mt-2 w-full px-3 py-1.5 bg-primary text-white text-xs rounded-lg"
            >
              Open Patient
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
