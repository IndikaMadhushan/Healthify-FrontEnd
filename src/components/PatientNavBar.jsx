// Patient Navigation Bar Component
import { useState } from "react";

export function PatinetNavBar({
  patientData,
  onNavigate,
  onLogout,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const patient = patientData || {
    fullName: "Parindya Hewage",
    email: "parindya@gmail.com",
    profilePic: "/profilePic.png",
    patientId: "UR234567",
  };

  const handleNavigation = (path) => {
    setDropdownOpen(false);

    if (onNavigate) {
      onNavigate(path);
    } else {
      console.log("Navigating to:", path);
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);

    if (onLogout) {
      onLogout();
    } else {
      console.log("Logging out patient:", patient.email);
      sessionStorage.clear();
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between items-center h-20">

          {/* LEFT: LOGO */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Healthify Logo"
              className="h-16 object-contain cursor-pointer"
              onClick={() => handleNavigation("/")}
            />
          </div>

          {/* RIGHT: PATIENT INFO */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <img
                src={patient.profilePic}
                alt={patient.fullName}
                className="w-10 h-10 rounded-full border-2 border-primary object-cover"
              />

              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-800">
                  {patient.fullName}
                </p>
                <p className="text-xs text-gray-600">
                  {patient.email}
                </p>
                <p className="text-[10px] text-gray-500">
                   {patient.patientId}
                </p>
              </div>

              <svg
                className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* DROPDOWN (ONLY LOGOUT) */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-semibold"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>

        
      </div>

      {/* CLICK OUTSIDE TO CLOSE */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </nav>
  );
}