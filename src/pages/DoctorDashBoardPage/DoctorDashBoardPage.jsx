import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorInfoCard from "./DoctorInfoCard";
import SearchPatientsCard from "./SearchPatientsCard";
import LatestPatientsCard from "./LatestPatientsCard";
import { getDoctorProfileApi } from "../../api/DoctorApi";
import { getAllPatients } from "../../api/PatientApi";

export default function DoctorProfilePage() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [recentPatients, setRecentPatients] = useState([]);
  const [patients, setPatients] = useState([]);

  const handleOpenPatient = (patient) => {
    localStorage.setItem("selectedPatientId", String(patient.id));
    localStorage.setItem("selectedPatient", JSON.stringify(patient));

    setRecentPatients((prev) => {
      const exists = prev.find((item) => item.id === patient.id);
      if (!exists) {
        return [patient, ...prev].slice(0, 6);
      }
      return [patient, ...prev.filter((item) => item.id !== patient.id)].slice(0, 6);
    });

    navigate(`/doctor/${patient.id}/medical-reports`, {
      state: { patient },
    });
  };

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const res = await getDoctorProfileApi();
        setDoctor(res.data);

        const patientRes = await getAllPatients();
        setPatients(patientRes.data ?? []);
      } catch (err) {
        console.error("Failed to load doctor profile", err);
      }
    };

    void loadDoctor();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DoctorInfoCard doctor={doctor} onProfileUpdate={setDoctor} />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LatestPatientsCard
              recentPatients={recentPatients}
              onViewProfile={handleOpenPatient}
            />
          </div>
          <div className="lg:col-span-1">
            <SearchPatientsCard
              patients={patients}
              onViewProfile={handleOpenPatient}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
