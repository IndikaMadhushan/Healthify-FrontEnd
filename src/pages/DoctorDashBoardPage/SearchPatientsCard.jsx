// ============================================
// FILE 4: src/pages/DoctorProfilePage/SearchPatientsCard.jsx
// ============================================

import { useState, useMemo } from "react";

export default function SearchPatientsCard({ patients, onViewProfile }) {
  const [searchQuery, setSearchQuery] = useState("");
  // Use useMemo instead of useEffect + state
  const filteredPatients = useMemo(() => {
    if (searchQuery.trim() === "") {
      return [];
    }
    return patients.filter((patient) =>
      patient.nic.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, patients]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-secondary/30 h-fit">
      <h2 className="text-2xl font-bold text-secondary mb-4">
        Search Patients
      </h2>

      {/* Search Input */}
      <div className="relative mb-4">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by NIC number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition"
        />
      </div>

      {/* Patient Results */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {searchQuery.trim() === "" && (
          <p className="text-sm text-gray-500 text-center py-4">
            Enter NIC number to search patients
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
              {patient.name}
            </p>
            <p className="text-xs text-gray-600">{patient.nic}</p>
            <p className="text-xs text-gray-600">{patient.gender}</p>
            <button
              onClick={() => onViewProfile(patient)}
              className="mt-2 w-full px-3 py-1.5 bg-primary hover:bg-primary/90 text-white text-xs rounded-lg transition"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
