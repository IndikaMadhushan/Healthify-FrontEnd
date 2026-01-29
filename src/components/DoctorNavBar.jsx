import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorNavBar({ doctor }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("doctor_me_cache");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LOGO */}
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Healthify Logo"
              className="h-16 object-contain cursor-pointer"
              onClick={() => handleNavigation("/doctor/dashboard")}
            />
          </div>

          {/* DOCTOR INFO */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              {/* PROFILE IMAGE */}
              {doctor.photoUrl ? (
                <img
                  src={doctor.photoUrl}
                  alt={doctor.fullName}
                  className="w-10 h-10 rounded-full border object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#18AAB0] text-white flex items-center justify-center font-bold">
                  {doctor.fullName?.charAt(0)}
                </div>
              )}

              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-800">
                  {doctor.fullName}
                </p>
                <p className="text-xs text-gray-600">
                  {doctor.email}
                </p>
                <p className="text-[10px] text-gray-500">
                  {doctor.doctorId}
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

            {/* DROPDOWN */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">

                <button
                  onClick={() => handleNavigation("/doctor/dashboard")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  🏠 Dashboard
                </button>

                <hr className="my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold"
                >
                  🚪 Logout
                </button>
              </div>
            )}
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
