import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PatinetNavBar } from "../../components/PatientNavBar";
import DoctorNotesSection from "../MedicalReportsPage/DoctorNotesSection";
import AllDoctorNotes from "./AllDoctorNotes";

export default function DoctorNotePage() {
  const navigate = useNavigate();
    const rawRole = localStorage.getItem("role");
  const role = rawRole?.toUpperCase();
  const handleBackToDashboard = () => {
  if (role === "PATIENT") {
    navigate("/patient/medical-reports");
  } else if (role === "DOCTOR") {
    navigate("/doctor/4/medical-reports");
  } 
};

  return (
<>
    <PatinetNavBar/>
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
        
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
         <button
        onClick={handleBackToDashboard}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition mb-3"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>


        <div className="mb-8 py-4 rounded-xl bg-gray-50 ">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary text-xl">
              📝
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary drop-shadow-sm">
              Doctor Notes
            </h1>
          </div>

          <p className="text-[12px] md:text-[16px] text-teal-800 ml-13">
            View all medical notes from your healthcare providers
          </p>
        </div>
      </div>

      {/* Content Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <AllDoctorNotes/>
      </div>
    </div>
    </>
  );

}
