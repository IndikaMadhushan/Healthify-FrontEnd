// ============================================
// FILE 6: src/pages/DoctorProfilePage/DoctorProfilePage.jsx (MAIN)
// ============================================

import { useState } from "react";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";
import DoctorNavBar from "./DoctorNavBar";
import DoctorInfoCard from "./DoctorInfoCard";
import SearchPatientsCard from "./SearchPatientsCard";
import LatestPatientsCard from "./LatestPatientsCard";
import { dummyDoctor, dummyPatients } from "./dummyData";

export default function DoctorProfilePage() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(dummyDoctor);
  const [recentPatients, setRecentPatients] = useState([]);

  const handleViewProfile = (patient) => {
    // Add to recent patients if not already there
    setRecentPatients((prev) => {
      const exists = prev.find((p) => p.id === patient.id);
      if (!exists) {
        return [patient, ...prev].slice(0, 6);
      }
      // Move to top if already exists
      return [patient, ...prev.filter((p) => p.id !== patient.id)].slice(0, 6);
    });

    // Navigate to patient profile placeholder
    navigate(`/patient-profile/${patient.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorNavBar doctor={doctor} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DoctorInfoCard doctor={doctor} onProfileUpdate={setDoctor} />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SearchPatientsCard
              patients={dummyPatients}
              onViewProfile={handleViewProfile}
            />
          </div>

          <div className="lg:col-span-2">
            <LatestPatientsCard
              recentPatients={recentPatients}
              onViewProfile={handleViewProfile}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
