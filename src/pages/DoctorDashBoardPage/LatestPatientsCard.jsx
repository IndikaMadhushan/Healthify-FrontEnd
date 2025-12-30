// ============================================
// FILE 5: src/pages/DoctorProfilePage/LatestPatientsCard.jsx
// ============================================

import { useState } from "react";

export default function LatestPatientsCard({ recentPatients, onViewProfile }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter patients by name
  const filteredPatients =
    searchQuery.trim() === ""
      ? recentPatients
      : recentPatients.filter((patient) =>
          patient.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border-2 border-secondary/30">
      <h2 className="text-2xl font-bold text-secondary mb-2">
        Latest Patients
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        View and manage patients who have granted you access to their records
      </p>

      {/* Search by Name */}
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
          placeholder="Search by patient name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition"
        />
      </div>

      {/* Patient List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {recentPatients.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">
            No recent patients. Search for patients to view their profiles.
          </p>
        )}

        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{patient.name}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                <p className="text-xs text-gray-600">{patient.nic}</p>
                <p className="text-xs text-gray-600">{patient.gender}</p>
                <p className="text-xs text-gray-500">
                  📅 Last visit on {patient.lastVisit}
                </p>
              </div>
            </div>

            <button
              onClick={() => onViewProfile(patient)}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm rounded-lg transition whitespace-nowrap"
            >
              View Profile
            </button>
          </div>
        ))}

        {recentPatients.length > 0 &&
          filteredPatients.length === 0 &&
          searchQuery.trim() !== "" && (
            <p className="text-sm text-gray-500 text-center py-4">
              No patients found matching "{searchQuery}"
            </p>
          )}
      </div>
    </div>
  );
}
