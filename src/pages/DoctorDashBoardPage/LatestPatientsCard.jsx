
import { useState } from "react";

export default function LatestPatientsCard({ recentPatients, onViewProfile }) {
  const [searchQuery] = useState("");

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
      {/* <p className="text-sm text-gray-600 mb-4">
        View and manage patients who have granted you access to their records
      </p> */}

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
