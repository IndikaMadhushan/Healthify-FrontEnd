import { useState } from "react";
import PatientFormMain from "./pages/PatientFormPage/patientFormMain";
import MedicalReportsPage from "./pages/MedicalReportsPage/MedicalReportsPage";
import FileUploadView from "./pages/MedicalReportsPage/FileUploadView";
import UnderConstruction from "./components/UnderConstruction";

// Main Dashboard/Layout Component
export default function DashboardLayout() {
  const [active, setActive] = useState("Medical Reports");
  const [uploadCategory, setUploadCategory] = useState(null);

  // Navigation handler for uploading files
  const handleNavigateToUpload = (category) => {
    setUploadCategory(category);
    setActive("Upload Report");
  };

  // Back handler from upload view
  const handleBackToReports = () => {
    setUploadCategory(null);
    setActive("Medical Reports");
  };

  function renderContent(active) {
    switch (active) {
      case "Summary":
      case "My Profile":
      case "Reminders":
        return <UnderConstruction active={active} />;

      case "Medical Info":
        return <PatientFormMain />;

      case "Medical Reports":
        return (
          <MedicalReportsPage onNavigateToUpload={handleNavigateToUpload} />
        );

      case "Upload Report":
        return (
          <FileUploadView
            userId="user_123" // Replace with actual user ID
            category={uploadCategory?.id || "general"}
            title={uploadCategory?.title || "Upload Report"}
            onBack={handleBackToReports}
          />
        );

      default:
        return null;
    }
  }

  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <div className="w-64 h-screen bg-white border-r border-gray-200 p-4">
        <nav className="space-y-2">
          {[
            "Summary",
            "My Profile",
            "Medical Info",
            "Medical Reports",
            "Upload Report",
            "Reminders",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${
                active === item
                  ? "bg-secondary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        {renderContent(active)}
      </div>
    </div>
  );
}
