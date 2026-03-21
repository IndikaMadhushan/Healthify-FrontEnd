import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import DoctorNavBar from "../components/DoctorNavBar";
import DoctorNavBar2 from "../components/DoctorNavBar2";
import HealthifyChatbot from "../components/HealthifyChatbot";
import {
  DOCTOR_PROFILE_UPDATED,
  getCachedDoctorProfile,
  getDoctorProfileApi,
} from "../api/DoctorApi";
import { getPatientProfileByIdApi } from "../api/PatientApi";
import Footer from "../components/footer";

function getStoredPatient(patientId) {
  const storedPatientRaw = localStorage.getItem("selectedPatient");

  if (!storedPatientRaw) {
    return null;
  }

  try {
    const storedPatient = JSON.parse(storedPatientRaw);
    return String(storedPatient?.id) === String(patientId) ||
      String(storedPatient?.patientId) === String(patientId)
      ? storedPatient
      : null;
  } catch (error) {
    console.error("Failed to parse stored patient", error);
    return null;
  }
}

export default function DoctorLayout() {
  const [doctor, setDoctor] = useState(() => getCachedDoctorProfile());
  const [patient, setPatient] = useState(null);
  const { patientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const res = await getDoctorProfileApi();
        setDoctor(res.data);
      } catch (err) {
        console.error("Failed to load doctor profile", err);
        navigate("/login");
      }
    };

    void loadDoctor();
  }, [navigate]);

  useEffect(() => {
    const handleDoctorProfileUpdated = (event) => {
      if (event.detail) {
        setDoctor(event.detail);
        return;
      }

      const cachedDoctor = getCachedDoctorProfile();
      if (cachedDoctor) {
        setDoctor(cachedDoctor);
      }
    };

    window.addEventListener(DOCTOR_PROFILE_UPDATED, handleDoctorProfileUpdated);
    return () => {
      window.removeEventListener(
        DOCTOR_PROFILE_UPDATED,
        handleDoctorProfileUpdated,
      );
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    if (!patientId) {
      const resetFrame = window.requestAnimationFrame(() => {
        setPatient(null);
      });
      return () => {
        isActive = false;
        window.cancelAnimationFrame(resetFrame);
      };
    }

    const storedPatient = getStoredPatient(patientId);
    const patientForView = storedPatient || {
      id: patientId,
      fullName: `Patient #${patientId}`,
    };
    const frameId = window.requestAnimationFrame(() => {
      setPatient(patientForView);
    });

    const loadSelectedPatient = async () => {
      try {
        const res = await getPatientProfileByIdApi(patientId);
        const matchedPatient = res.data;

        if (!isActive || !matchedPatient) {
          return;
        }

        setPatient(matchedPatient);
        localStorage.setItem("selectedPatientId", String(matchedPatient.id));
        localStorage.setItem("selectedPatient", JSON.stringify(matchedPatient));
      } catch (err) {
        console.error("Failed to load selected patient details", err);
      }
    };

    void loadSelectedPatient();
    return () => {
      isActive = false;
      window.cancelAnimationFrame(frameId);
    };
  }, [patientId]);

  const isDashboard =
    location.pathname === "/doctor/dashboard" ||
    location.pathname === "/doctor/dashboard/";
  const isDoctorProfile =
    location.pathname === "/doctor/doctor-profile" ||
    location.pathname === "/doctor/doctor-profile/";
  const chatbotContextUserId =
    patient?.id != null
      ? String(patient.id)
      : /^\d+$/.test(String(patientId ?? ""))
        ? String(patientId)
        : undefined;

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading doctor dashboard...</p>
      </div>
    );
  }

  return (
    <>
      {isDashboard || isDoctorProfile ? (
        <DoctorNavBar key={location.pathname} doctor={doctor} />
      ) : (
        <DoctorNavBar2
          key={location.pathname}
          doctor={doctor}
          patient={patient}
        />
      )}

      <div className="lg:px-14  bg-gray-50 pb-[100px]">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
      <HealthifyChatbot
        contextUserId={chatbotContextUserId}
        contextLabel={
          chatbotContextUserId
            ? "Current patient context is enabled for more relevant guidance."
            : undefined
        }
      />
    </>
  );
}
