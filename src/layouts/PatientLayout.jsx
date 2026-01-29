import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { PatinetNavBar } from "../components/PatientNavBar";
import { getPatientProfileApi } from "../api/PatientApi";

export default function PatientLayout() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const res = await getPatientProfileApi();
        setPatient(res.data);
      } catch (err) {
        console.error("Failed to load patient data", err);
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <>
      <PatinetNavBar patientData={patient} />
      <Outlet />
    </>
  );
}
