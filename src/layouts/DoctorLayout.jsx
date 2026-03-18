import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import DoctorNavBar from "../components/DoctorNavBar";
import DoctorNavBar2 from "../components/DoctorNavBar2";
import {
  DOCTOR_PROFILE_UPDATED,
  getCachedDoctorProfile,
  getDoctorProfileApi,
} from "../api/DoctorApi";
import { getAllPatients } from "../api/PatientApi";
import Footer from "../components/footer";

function getStoredPatient(patientId, locationPatient) {
  if (
    locationPatient &&
    (String(locationPatient.id) === String(patientId) ||
      String(locationPatient.patientId) === String(patientId))
  ) {
    return locationPatient;
  }

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
    if (!patientId) {
      const resetFrame = window.requestAnimationFrame(() => {
        setPatient(null);
      });
      return () => window.cancelAnimationFrame(resetFrame);
    }

    const storedPatient = getStoredPatient(patientId, location.state?.patient);
    const patientForView = storedPatient || {
      id: patientId,
      fullName: `Patient #${patientId}`,
    };
    const frameId = window.requestAnimationFrame(() => {
      setPatient(patientForView);
    });

    const loadSelectedPatient = async () => {
      try {
        const res = await getAllPatients();
        const matchedPatient = res.data?.find(
          (item) =>
            String(item.id) === String(patientId) ||
            String(item.patientId) === String(patientId),
        );

        if (!matchedPatient) {
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
    return () => window.cancelAnimationFrame(frameId);
  }, [location.state, patientId]);

  const isDashboard =
    location.pathname === "/doctor/dashboard" ||
    location.pathname === "/doctor/dashboard/";
  const isDoctorProfile =
    location.pathname === "/doctor/doctor-profile" ||
    location.pathname === "/doctor/doctor-profile/";

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
        <DoctorNavBar2 key={location.pathname} doctor={doctor} patient={patient} />
      )}

      <div className="lg:px-14  bg-gray-50 pb-[100px]">
        <Outlet />                                                  
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
