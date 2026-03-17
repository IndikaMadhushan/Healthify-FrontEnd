
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import DoctorNavBar from "../components/DoctorNavBar";
import DoctorNavBar2 from "../components/DoctorNavBar2";
import { getDoctorProfileApi } from "../api/DoctorApi";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";


export default function DoctorLayout() {
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);
  const { patientId } = useParams();


  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  const loadDoctor = async () => {
    try {
      const res = await getDoctorProfileApi();
      setDoctor(res.data);

      if (patientId) {
        setPatient({ id: patientId });
      }

    } catch (err) {
      console.error("Failed to load doctor profile", err);
      navigate("/login");
    }
  };

  loadDoctor();
}, [navigate, patientId]);


  // 🔹 ONLY dashboard gets NavBar 1
  const isDashboard =
    location.pathname === "/doctor/dashboard" ||
    location.pathname === "/doctor/dashboard/";

  // ✅ NEW: detect where doctor-profile navigation came from
  const fromNav = location.state?.fromNav;

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading doctor dashboard...</p>
      </div>
    );
  }

  return (
    <>
      {isDashboard ||
      (location.pathname === "/doctor/doctor-profile" &&
        fromNav === "NAV1") ? (
        <DoctorNavBar doctor={doctor} />
      ) : (
        <DoctorNavBar2 doctor={doctor} patient={patient} />
      )}

      {/* 🔹 Middle content changes by URL */}
      <div className="lg:px-14 px-6 bg-gray-50 pb-[100px]">
        <Outlet />
      </div>
      <div className="">
        <Footer />
      </div>
    </>
  );
}
