import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDisplayName, getInitial } from "../utils/nameUtils";
import { MdDashboard } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { confirmLogout } from "../utils/logoutConfirmation";

export default function DoctorNavBar({ doctor }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboardPage =
    location.pathname === "/doctor/dashboard" ||
    location.pathname === "/doctor/dashboard/";
  const isProfilePage =
    location.pathname === "/doctor/doctor-profile" ||
    location.pathname === "/doctor/doctor-profile/";

  const doctorDisplayName = getDisplayName(doctor);
  const doctorPhotoUrl =
    doctor?.photoUrl || doctor?.profilePic || "/profilePic.png";

  const goToProfile = () => {
    setDropdownOpen(false);
    navigate("/doctor/doctor-profile", {
      state: { fromNav: "NAV1" },
    });
  };

  const handleNavigation = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    if (!confirmLogout()) {
      return;
    }
    setDropdownOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("doctor_me_cache");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Healthify Logo"
              className="h-16 object-contain cursor-pointer"
              onClick={() => handleNavigation("/doctor/dashboard")}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              {doctor.photoUrl || doctor.profilePic ? (
                <img
                  src={doctorPhotoUrl}
                  alt={doctorDisplayName}
                  className="w-10 h-10 rounded-full border object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#18AAB0] text-white flex items-center justify-center font-bold">
                  {getInitial(doctor)}
                </div>
              )}

              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-800">
                  {doctorDisplayName}
                </p>
                <p className="text-xs text-gray-600">{doctor.email}</p>
                <p className="text-[10px] text-gray-500">{doctor.doctorId}</p>
              </div>

              <svg
                className={`w-4 h-4 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
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
                {isProfilePage && (
                  <button
                    onClick={() => handleNavigation("/doctor/dashboard")}
                    className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <MdDashboard className="text-base" />
                    Dashboard
                  </button>
                )}
                {isDashboardPage && (
                  <button
                    onClick={goToProfile}
                    className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <FaUserDoctor className="text-base" />
                    My Profile
                  </button>
                )}

                <hr className="my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold"
                >
                  Logout
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
