import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PatinetNavBar } from "../../components/PatientNavBar";
import SurgeryHistory from "./SurgeryHistory";

export default  function SurgeryPage() {
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

        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="lg:text-3xl text-2xl font-bold text-secondary">
              🩺surgery History
            </h1>
            <p className="text-gray-500 mt-1">
              Track and manage your surgery history.
            </p>
          </div>
        </div> */}
        <div className="mb-8 p-4 rounded-xl bg-gray-50 ">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary text-xl">
              🩺
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary drop-shadow-sm">
              Surgery History
            </h1>
          </div>

          <p className="text-teal-800 ml-13">
            Track and manage your surgery history
          </p>
        </div>
      </div>
      

      {/* Content Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-6">
        <SurgeryHistory/>
      </div>
    </div>
    </>
  );

}
