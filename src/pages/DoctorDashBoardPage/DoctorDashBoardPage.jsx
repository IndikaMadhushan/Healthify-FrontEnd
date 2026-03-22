import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorInfoCard from "./DoctorInfoCard";
import SearchPatientsCard from "./SearchPatientsCard";
import LatestPatientsCard from "./LatestPatientsCard";
import { getDoctorProfileApi } from "../../api/DoctorApi";
import { getAllPatients } from "../../api/PatientApi";
import { getDisplayName } from "../../utils/nameUtils";

const MAX_RECENT_PATIENTS = 6;

function getRecentPatientsStorageKey(doctorId) {
  return `doctor_recent_patients:${doctorId}`;
}

function getNextMidnightTimestamp(baseDate = new Date()) {
  const nextMidnight = new Date(baseDate);
  nextMidnight.setHours(24, 0, 0, 0);
  return nextMidnight.getTime();
}

function createRecentPatientsPayload(patients) {
  return {
    patients: patients.slice(0, MAX_RECENT_PATIENTS),
    expiresAt: getNextMidnightTimestamp(),
  };
}

function loadRecentPatients(doctorId) {
  if (!doctorId) {
    return [];
  }

  const storageKey = getRecentPatientsStorageKey(doctorId);
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      localStorage.removeItem(storageKey);
      return [];
    }

    if (
      !parsed ||
      typeof parsed !== "object" ||
      !Array.isArray(parsed.patients) ||
      typeof parsed.expiresAt !== "number"
    ) {
      localStorage.removeItem(storageKey);
      return [];
    }

    if (Date.now() >= parsed.expiresAt) {
      localStorage.removeItem(storageKey);
      return [];
    }

    return parsed.patients.slice(0, MAX_RECENT_PATIENTS);
  } catch (error) {
    console.error("Failed to parse recent patients", error);
    localStorage.removeItem(storageKey);
    return [];
  }
}

function mergeRecentPatient(list, patient) {
  const normalizedPatient = {
    ...patient,
    accessedAt: new Date().toISOString(),
  };

  const withoutCurrent = list.filter(
    (item) => String(item.id) !== String(patient.id),
  );
  return [normalizedPatient, ...withoutCurrent].slice(0, MAX_RECENT_PATIENTS);
}

function getTimeBasedGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good Morning";
  }

  if (hour < 18) {
    return "Good Afternoon";
  }

  return "Good Evening";
}

export default function DoctorDashBoardPage() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [recentPatients, setRecentPatients] = useState([]);
  const [patients, setPatients] = useState([]);
  const recentPatientsStorageKey = doctor?.id
    ? getRecentPatientsStorageKey(doctor.id)
    : null;
  const doctorDisplayName = doctor ? getDisplayName(doctor) : "Doctor";
  const doctorHeadingName = /^dr\.?\s/i.test(doctorDisplayName)
    ? doctorDisplayName
    : `Dr. ${doctorDisplayName}`;
  const greeting = getTimeBasedGreeting();

  const handleOpenPatient = (patient) => {
    localStorage.setItem("selectedPatientId", String(patient.id));
    localStorage.setItem("selectedPatient", JSON.stringify(patient));

    const updatedRecentPatients = mergeRecentPatient(recentPatients, patient);
    setRecentPatients(updatedRecentPatients);

    if (doctor?.id) {
      localStorage.setItem(
        getRecentPatientsStorageKey(doctor.id),
        JSON.stringify(createRecentPatientsPayload(updatedRecentPatients)),
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
      JSON.stringify(createRecentPatientsPayload(recentPatients)),
    );
  }, [recentPatients, recentPatientsStorageKey]);

  useEffect(() => {
    if (!recentPatientsStorageKey) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setRecentPatients([]);
      localStorage.removeItem(recentPatientsStorageKey);
    }, Math.max(getNextMidnightTimestamp() - Date.now(), 0));

    return () => window.clearTimeout(timeoutId);
  }, [recentPatients, recentPatientsStorageKey]);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(24,170,176,0.18),_transparent_55%),radial-gradient(circle_at_top_right,_rgba(134,196,67,0.16),_transparent_45%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-secondary via-[#15959C] to-primary px-6 py-8 text-white shadow-[0_28px_70px_rgba(24,170,176,0.22)] sm:px-8 lg:px-10">
          <div className="absolute inset-y-0 right-0 hidden w-64 bg-[radial-gradient(circle,_rgba(255,255,255,0.24),_transparent_65%)] lg:block" />
          <div className="relative">
            <div className="max-w-3xl">
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {greeting}, {doctorHeadingName}
              </h1>
            </div>
          </div>
        </section>

        <div className="relative z-10 mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <DoctorInfoCard
              doctor={doctor}
              recentPatientsCount={recentPatients.length}
            />
          </div>
          <div className="lg:col-span-4">
            <SearchPatientsCard
              patients={patients}
              onViewProfile={handleOpenPatient}
            />
          </div>
          <div className="lg:col-span-12">
            <LatestPatientsCard
              recentPatients={recentPatients}
              onViewProfile={handleOpenPatient}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
