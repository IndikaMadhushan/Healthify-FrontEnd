import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoLogOutSharp } from "react-icons/io5";
import { getDisplayName } from "../utils/nameUtils";
import { confirmLogout } from "../utils/logoutConfirmation";
import { clearAuthStorage } from "../utils/authStorage";

export function PatinetNavBar({
  patientData,
  onProfileImageError,
  // onLogout,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  if (!patientData) return null;

  const { email, patientId, photoUrl } = patientData;
  const fullName = getDisplayName(patientData);

  const handleLogout = async () => {
    const confirmed = await confirmLogout();
    if (!confirmed) {
      return;
    }
    setDropdownOpen(false);
    clearAuthStorage();
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
              onClick={() => navigate("/")}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <img
                src={photoUrl || "/profilePic.png"}
                alt={fullName}
                onError={onProfileImageError}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-800">
                  {fullName}
                </p>
                <p className="text-xs text-gray-600">{email}</p>
                <p className="text-[10px] text-gray-500">{patientId}</p>
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
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-semibold"
                >
                  <IoLogOutSharp className="text-base" />
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
