import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MyClinicBooks from "./MyClinicBooks";

export default  function ClinicBookPage() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const rawRole = localStorage.getItem("role");
  const role = rawRole?.toUpperCase();
  const resolvedPatientId = patientId || localStorage.getItem("selectedPatientId");

  const handleBackToDashboard = () => {
    if (role === "PATIENT") {
      navigate("/patient/medical-reports");
      return;
    }

    if (role === "DOCTOR" && resolvedPatientId) {
      navigate(`/doctor/${resolvedPatientId}/medical-reports`);
      return;
    }

    navigate("/doctor/dashboard");
  };

  return (
<>
    {/* <PatientNavBar/> */}
    <div className="min-h-screen bg-gray-50 ">
        
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
        onClick={handleBackToDashboard}
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

        
        <div className="mb-8 py-4 rounded-xl bg-gray-50 ">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 text-secondary text-xl">
              🩺
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary drop-shadow-sm">
              Clinic Books
            </h1>
          </div>

          <p className="text-[12px] md:text-[16px] text-teal-800 ml-13">
            Track and manage your All clinical History
          </p>
        </div>
      </div>
      

      {/* Content Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-6">
       <MyClinicBooks/>
      </div>
    </div>
    </>
  );

}
