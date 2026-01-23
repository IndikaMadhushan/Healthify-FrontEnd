// import React from 'react'
// import { useNavigate } from "react-router-dom";
// import PrescriptionList from './PrescriptionList';

// function PrescriptionPage() {
  
//     const navigate = useNavigate();

//   return (
//     <div className="p-6">
//       <button onClick={() => navigate("/patient-dashboard")}>
//         ← Back
//       </button>

//       <h1 className="text-2xl font-bold">Lab Reports</h1>
//       <PrescriptionList/>
//     </div>
//   );
// }

// export default PrescriptionPage


import React from "react";
import { useNavigate } from "react-router-dom";
import PrescriptionList from "./PrescriptionList";
import { ArrowLeft } from "lucide-react";
import { PatinetNavBar } from "../../components/PatientNavBar";

function PrescriptionPage() {
  const navigate = useNavigate();

  return (
<>
    <PatinetNavBar/>
    <div className="min-h-screen bg-gray-50 p-6">
        
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={() => navigate("/patient-dashboard")}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition mb-3"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="lg:text-3xl text-2xl font-bold text-secondary">
              💊Patient Prescriptions
            </h1>
            <p className="text-gray-500 mt-1">
              View and manage all your doctor-issued prescriptions
            </p>
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <PrescriptionList />
      </div>
    </div>
    </>
  );

}

export default PrescriptionPage;