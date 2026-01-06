// thathsara
// Doctor Navigation Bar Component in doctor consultation and clinic book pages
import { useState } from "react";

export function DoctorNavBar({
  patientData,
  doctorData,
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

  const doctor = doctorData || {
    fullName: "Dr. Samantha Silva",
    email: "samantha@hospital.com",
    profilePic: "/profilePic.png",
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
      console.log("Logging out doctor:", doctor.email);
      sessionStorage.clear();
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Healthify Logo"
              className="h-16 object-contain cursor-pointer"
              onClick={() => handleNavigation("/")}
            />
          </div>

          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-secondary/10 rounded-lg">
            <img
              src={patient.profilePic}
              //alt={patient.fullName}
              className="w-10 h-10 rounded-full border-2 border-secondary object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Patient: {patient.fullName}
              </p>
              <p className="text-xs text-gray-600">{patient.email}</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {doctor.fullName.charAt(0)}
              </div>

              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-800">
                  {doctor.fullName}
                </p>
                <p className="text-xs text-gray-600">{doctor.email}</p>
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

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <button
                  onClick={() => handleNavigation("/")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  🏠 Home
                </button>

                <hr className="my-2 border-gray-200" />

                <div className="px-4 py-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Patient
                  </p>
                </div>

                <button
                  onClick={() => handleNavigation("/patient-profile")}
                  className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  👤 Profile
                </button>

                <button
                  onClick={() => handleNavigation("/patient-files-upload")}
                  className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  📊 File Upload
                </button>

                <button
                  onClick={() => handleNavigation("/form")}
                  className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  📝 Form Page
                </button>

                <hr className="my-2 border-gray-200" />

                <button
                  onClick={() => handleNavigation("/doctor-profile")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  👨‍⚕️ My Profile
                </button>

                <button
                  onClick={() => handleNavigation("/doctor-dashboard")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  📈 My Dashboard
                </button>

                <hr className="my-2 border-gray-200" />

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

        <div className="md:hidden flex items-center gap-2 pb-3 px-2 bg-secondary/5 rounded-lg mb-2">
          <img
            src={patient.profilePic}
            alt={patient.fullName}
            className="w-8 h-8 rounded-full border-2 border-secondary object-cover"
          />
          <div>
            <p className="text-xs font-semibold text-gray-800">
              Patient: {patient.fullName}
            </p>
            <p className="text-[10px] text-gray-600">{patient.email}</p>
          </div>
        </div>
      </div>

      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </nav>
  );
}
