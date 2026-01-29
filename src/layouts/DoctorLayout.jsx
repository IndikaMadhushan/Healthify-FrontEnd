import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DoctorNavBar from "../components/DoctorNavBar";
import { getDoctorProfileApi } from "../api/DoctorApi";

export default function DoctorLayout() {
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

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

    loadDoctor();
  }, [navigate]);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading doctor dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <DoctorNavBar doctor={doctor} />
      <Outlet />
    </>
  );
}
