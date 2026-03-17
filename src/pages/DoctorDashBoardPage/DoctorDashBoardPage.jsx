import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorInfoCard from "./DoctorInfoCard";
import SearchPatientsCard from "./SearchPatientsCard";
import LatestPatientsCard from "./LatestPatientsCard";
import { getDoctorProfileApi } from "../../api/DoctorApi";
import { getAllPatients } from "../../api/PatientApi";

const MAX_RECENT_PATIENTS = 6;

function getRecentPatientsStorageKey(doctorId) {
  return `doctor_recent_patients:${doctorId}`;
}

function loadRecentPatients(doctorId) {
  if (!doctorId) {
    return [];
  }

  const raw = localStorage.getItem(getRecentPatientsStorageKey(doctorId));
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse recent patients", error);
    localStorage.removeItem(getRecentPatientsStorageKey(doctorId));
    return [];
  }
}

function mergeRecentPatient(list, patient) {
  const normalizedPatient = {
    ...patient,
    accessedAt: new Date().toISOString(),
  };

  const withoutCurrent = list.filter((item) => String(item.id) !== String(patient.id));
  return [normalizedPatient, ...withoutCurrent].slice(0, MAX_RECENT_PATIENTS);
}

export default function DoctorProfilePage() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [recentPatients, setRecentPatients] = useState([]);
  const [patients, setPatients] = useState([]);
  const recentPatientsStorageKey = doctor?.id
    ? getRecentPatientsStorageKey(doctor.id)
    : null;

  const handleOpenPatient = (patient) => {
    localStorage.setItem("selectedPatientId", String(patient.id));
    localStorage.setItem("selectedPatient", JSON.stringify(patient));

    const updatedRecentPatients = mergeRecentPatient(recentPatients, patient);
    setRecentPatients(updatedRecentPatients);

    if (doctor?.id) {
      localStorage.setItem(
        getRecentPatientsStorageKey(doctor.id),
        JSON.stringify(updatedRecentPatients),
      );
    }

    navigate(`/doctor/${patient.id}/medical-reports`, {
      state: { patient },
    });
  };

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const res = await getDoctorProfileApi();
        setDoctor(res.data);
        setRecentPatients(loadRecentPatients(res.data.id));

        const patientRes = await getAllPatients();
        setPatients(patientRes.data ?? []);
      } catch (err) {
        console.error("Failed to load doctor profile", err);
      }
    };

    void loadDoctor();
  }, []);

  useEffect(() => {
    if (!recentPatientsStorageKey) {
      return;
    }

    localStorage.setItem(
      recentPatientsStorageKey,
      JSON.stringify(recentPatients.slice(0, MAX_RECENT_PATIENTS)),
    );
  }, [recentPatients, recentPatientsStorageKey]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DoctorInfoCard doctor={doctor} />

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
