import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaNotesMedical, FaUserDoctor } from "react-icons/fa6";
import { IoLogOutSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { TbStethoscope } from "react-icons/tb";
import { confirmLogout } from "../utils/logoutConfirmation";
import { getDisplayName, getInitial } from "../utils/nameUtils";
import { clearAuthStorage } from "../utils/authStorage";

export default function DoctorNavBar2({ doctor, patient }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { patientId } = useParams();

  if (!doctor) return null;

  const safePatient = patient || null;
  const normalizedPathname = location.pathname.replace(/\/+$/, "") || "/";
  const selectedPatientId = String(
    patientId || safePatient?.patientId || safePatient?.id || "",
  );
  const hasPatientRoute = Boolean(selectedPatientId);
  const patientBasePath = hasPatientRoute ? `/doctor/${selectedPatientId}` : "";
  const patientDashboardPath = `${patientBasePath}/medical-reports`;
  const patientMedicalInfoPath = `${patientBasePath}/doctorViewform`;
  const patientConsultPath = `${patientBasePath}/consult`;
  const isDoctorProfilePage = normalizedPathname === "/doctor/doctor-profile";
  const isDoctorDashboardPage = normalizedPathname === "/doctor/dashboard";
  const isPatientDashboardPage =
    hasPatientRoute &&
    (normalizedPathname === patientDashboardPath ||
      normalizedPathname.startsWith(`${patientDashboardPath}/`));
  const isPatientMedicalInfoPage =
    hasPatientRoute && normalizedPathname === patientMedicalInfoPath;
  const isPatientConsultPage =
    hasPatientRoute && normalizedPathname === patientConsultPath;

  const doctorDisplayName = getDisplayName(doctor);
  const patientDisplayName =
    getDisplayName(safePatient) ||
    (safePatient?.id ? `Patient #${safePatient.id}` : "");
  const patientPhotoUrl =
    safePatient?.photoUrl || safePatient?.profilePic || "/profilePic.png";
  const doctorPhotoUrl =
    doctor?.photoUrl || doctor?.profilePic || "/profilePic.png";

  const getMenuItemClass = (isActive, paddingClass = "px-4") =>
    `w-full flex items-center gap-2 text-left ${paddingClass} py-2 text-sm transition ${
      isActive
        ? "bg-[#F2FBFA] text-[#18AAB0] font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const handleNavigation = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  const goToProfile = () => {
    setDropdownOpen(false);
    navigate("/doctor/doctor-profile", {
      state: { fromNav: "NAV2" },
    });
  };

  const handleLogout = async () => {
    const confirmed = await confirmLogout();
    if (!confirmed) {
      return;
    }

    setDropdownOpen(false);
    clearAuthStorage();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex items-center justify-between h-20 gap-3">
          <img
            src="/logo.png"
            alt="Healthify Logo"
            className="h-14 sm:h-16 cursor-pointer flex-shrink-0"
            onClick={() => handleNavigation("/")}
          />

          <div className="flex items-center gap-3 sm:gap-4">
            {safePatient && (
              <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-lg">
                <img
                  src={patientPhotoUrl}
                  alt={patientDisplayName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="leading-tight max-w-[200px]">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    Viewing Patient: {patientDisplayName}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {safePatient.email ||
                      safePatient.patientId ||
                      `ID ${safePatient.id}`}
                  </p>
                </div>
              </div>
            )}

            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                {doctor.photoUrl || doctor.profilePic ? (
                  <img
                    src={doctorPhotoUrl}
                    alt={doctorDisplayName}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {getInitial(doctor)}
                  </div>
                )}

                <div className="hidden sm:block text-left max-w-[160px]">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {doctorDisplayName}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {doctor.email}
                  </p>
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
                  {safePatient && hasPatientRoute && (
                    <>
                      <div className="px-4 py-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Patient
                        </p>
                      </div>
                      <button
                        onClick={() => handleNavigation(patientDashboardPath)}
                        className={getMenuItemClass(
                          isPatientDashboardPage,
                          "px-8",
                        )}
                      >
                        <MdDashboard className="text-base" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => handleNavigation(patientMedicalInfoPath)}
                        className={getMenuItemClass(
                          isPatientMedicalInfoPage,
                          "px-8",
                        )}
                      >
                        <FaNotesMedical className="text-base" />
                        Medical Info
                      </button>
                      <button
                        onClick={() => handleNavigation(patientConsultPath)}
                        className={getMenuItemClass(
                          isPatientConsultPage,
                          "px-8",
                        )}
                      >
                        <TbStethoscope className="text-base" />
                        Consultation
                      </button>
                    </>
                  )}

                  <hr className="my-2 border-gray-200" />

                  <button
                    onClick={goToProfile}
                    className={getMenuItemClass(isDoctorProfilePage)}
                  >
                    <FaUserDoctor className="text-base" />
                    My Profile
                  </button>
                  <button
                    onClick={() => handleNavigation("/doctor/dashboard")}
                    className={getMenuItemClass(isDoctorDashboardPage)}
                  >
                    <MdDashboard className="text-base" />
                    My Dashboard
                  </button>

                  <hr className="my-2 border-gray-200" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 text-left px-4 py-2 text-red-600 hover:bg-red-50 transition font-semibold"
                  >
                    <IoLogOutSharp className="text-base" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {safePatient && (
          <div className="md:hidden flex items-center gap-3 px-3 py-2 mb-2 bg-secondary/5 rounded-lg">
            <img
              src={patientPhotoUrl}
              alt={patientDisplayName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="truncate">
              <p className="text-xs font-semibold truncate">
                Patient: {patientDisplayName}
              </p>
              <p className="text-[10px] text-gray-600 truncate">
                {safePatient.email ||
                  safePatient.patientId ||
                  `ID ${safePatient.id}`}
              </p>
            </div>
          </div>
        )}
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
