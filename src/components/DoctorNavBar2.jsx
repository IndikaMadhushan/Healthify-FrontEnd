//thathsara
// from 1st doctor nav bar code that i have created .latest doctor nav bar
// Doctor Navigation Bar Component in doctor consultation and clinic book pages

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function DoctorNavBar({ doctor, patient }) {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   // 🔒 SAFETY GUARDS (prevents crashes)
//   if (!doctor) return null;

//   const safePatient = patient || null;

//   const handleNavigation = (path) => {
//     setDropdownOpen(false);
//     navigate(path);
//   };

//   const handleLogout = () => {
//     setDropdownOpen(false);
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           {/* LOGO */}
//           <img
//             src="/logo.png"
//             alt="Healthify Logo"
//             className="h-16 cursor-pointer"
//             onClick={() => handleNavigation("/")}
//           />

//           {/* PATIENT INFO (if available) */}
//           {safePatient && (
//             <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-secondary/10 rounded-lg">
//               <img
//                 src={safePatient.profilePic || "/profilePic.png"}
//                 alt={safePatient.fullName}
//                 className="w-10 h-10 rounded-full border object-cover"
//               />
//               <div>
//                 <p className="text-sm font-semibold text-gray-800">
//                   Viewing Patient: {safePatient.fullName}
//                 </p>
//                 <p className="text-xs text-gray-600">{safePatient.email}</p>
//               </div>
//             </div>
//           )}

//           {/* DOCTOR DROPDOWN */}
//           <div className="relative">
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
//             >
//               {doctor.photoUrl ? (
//                 <img
//                   src={doctor.photoUrl}
//                   alt={doctor.fullName}
//                   className="w-10 h-10 rounded-full border object-cover"
//                 />
//               ) : (
//                 <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
//                   {doctor.fullName?.charAt(0)}
//                 </div>
//               )}

//               <div className="hidden sm:block text-left">
//                 <p className="text-sm font-semibold text-gray-800">
//                   {doctor.fullName}
//                 </p>
//                 <p className="text-xs text-gray-600">{doctor.email}</p>
//               </div>

//               <svg
//                 className={`w-4 h-4 transition-transform ${
//                   dropdownOpen ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>

//             {/* DROPDOWN MENU */}
//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
//                 {/* HOME */}
//                 <button
//                   onClick={() => handleNavigation("/")}
//                   className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                 >
//                   🏠 Home
//                 </button>
//                 <hr className="my-2 border-gray-200" />
//                 {/* PATIENT SECTION */}
//                 {safePatient && (
//                   <>
//                     <div className="px-4 py-2">
//                       <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                         Patient
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => handleNavigation("/patient/profile")}
//                       className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                     >
//                       👤 Profile
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleNavigation("/patient/medical-reports")
//                       }
//                       className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                     >
//                       📊 Dashboard
//                     </button>
//                     <button
//                       onClick={() => handleNavigation("/doctorViewform")}
//                       className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                     >
//                       📝 Form Page
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleNavigation("/doctor-consult/:patientId")
//                       }
//                       className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                     >
//                       📋 Prescriptions
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleNavigation(
//                           "/doctor-clinic-book/:patientId/:bookId",
//                         )
//                       }
//                       className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                     >
//                       🩺 Clinic Books
//                     </button>
//                   </>
//                 )}

//                 {/* DOCTOR SECTION */}
//                 <hr className="my-2 border-gray-200" />
//                 <button
//                   onClick={() => handleNavigation("/doctor-profile")}
//                   className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                 >
//                   👨‍⚕️ My Profile
//                 </button>
//                 <button
//                   onClick={() => handleNavigation("/doctor/dashboard")}
//                   className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                 >
//                   📈 My Dashboard
//                 </button>

//                 <hr className="my-2 border-gray-200" />

//                 {/* LOGOUT */}
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-semibold"
//                 >
//                   🚪 Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* MOBILE PATIENT INFO */}
//         {safePatient && (
//           <div className="md:hidden flex gap-2 pb-3 px-2 bg-secondary/5 rounded-lg mb-2">
//             <img
//               src={safePatient.profilePic || "/profilePic.png"}
//               alt={safePatient.fullName}
//               className="w-8 h-8 rounded-full border object-cover"
//             />
//             <div>
//               <p className="text-xs font-semibold">
//                 Patient: {safePatient.fullName}
//               </p>
//               <p className="text-[10px] text-gray-600">{safePatient.email}</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* BACKDROP */}
//       {dropdownOpen && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => setDropdownOpen(false)}
//         />
//       )}
//     </nav>
//   );
// }

// //parindya
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function DoctorNavBar({ doctor, patient }) {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();

//   // 🔒 SAFETY GUARDS (prevents crashes)
//   if (!doctor) return null;

//   const safePatient = patient || null;

//   const handleNavigation = (path) => {
//     setDropdownOpen(false);
//     navigate(path);
//   };

//   const handleLogout = () => {
//     setDropdownOpen(false);
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
//       <div className="max-w-8xl mx-auto  sm:px-6 lg:px-10">
//         <div className="flex justify-between items-center h-20">
//           {/* LOGO */}
//           <img
//             src="/logo.png"
//             alt="Healthify Logo"
//             className="h-16 cursor-pointer"
//             onClick={() => handleNavigation("/")}
//           />

//         <div className="flex">
//           {/* PATIENT INFO (if available) */}
//           {safePatient && (
//             <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-lg">
//               <img
//                 src={safePatient.profilePic || "/profilePic.png"}
//                 alt={safePatient.fullName}
//                 className="w-10 h-10 rounded-full  object-cover"
//               />
//               <div>
//                 <p className="text-sm font-semibold text-gray-800">
//                   Viewing Patient: {safePatient.fullName}
//                 </p>
//                 <p className="text-xs text-gray-600">{safePatient.email}</p>
//               </div>
//             </div>
//           )}

//           {/* DOCTOR DROPDOWN */}
//           <div className="relative">
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100"
//             >
//               {doctor.photoUrl ? (
//                 <img
//                   src={doctor.photoUrl}
//                   alt={doctor.fullName}
//                   className="w-10 h-10 rounded-full border object-cover"
//                 />
//               ) : (
//                 <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
//                   {doctor.fullName?.charAt(0)}
//                 </div>
//               )}

//               <div className="hidden sm:block text-left">
//                 <p className="text-sm font-semibold text-gray-800">
//                   {doctor.fullName}
//                 </p>
//                 <p className="text-xs text-gray-600">{doctor.email}</p>
//               </div>

//               <svg
//                 className={`w-4 h-4 transition-transform ${
//                   dropdownOpen ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>

//             {/* DROPDOWN MENU */}
//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
//                 {/* HOME */}
//                 <button
//                   onClick={() => handleNavigation("/")}
//                   className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                 >
//                   🏠 Home
//                 </button>
//                 <hr className="my-2 border-gray-200" />
//                 {/* PATIENT SECTION */}
//                 {safePatient && (
//                   <>
//                     <div className="px-4 py-2">
//                       <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                         Patient
//                       </p>
//                     </div>
//                     <button
//                       onClick={() => handleNavigation("/patient/profile")}
//                       className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                     >
//                       👤 Profile
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleNavigation("/patient/medical-reports")
//                       }
//                       className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                     >
//                       📊 Dashboard
//                     </button>
//                     <button
//                       onClick={() => handleNavigation("/doctorViewform")}
//                       className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                     >
//                       📝 Form Page
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleNavigation("/doctor-consult/:patientId")
//                       }
//                       className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                     >
//                       📋 Prescriptions
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleNavigation(
//                           "/doctor-clinic-book/:patientId/:bookId",
//                         )
//                       }
//                       className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                     >
//                       🩺 Clinic Books
//                     </button>
//                   </>
//                 )}

//                 {/* DOCTOR SECTION */}
//                 <hr className="my-2 border-gray-200" />
//                 <button
//                   onClick={() => handleNavigation("/doctor-profile")}
//                   className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                 >
//                   👨‍⚕️ My Profile
//                 </button>
//                 <button
//                   onClick={() => handleNavigation("/doctor/dashboard")}
//                   className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
//                 >
//                   📈 My Dashboard
//                 </button>

//                 <hr className="my-2 border-gray-200" />

//                 {/* LOGOUT */}
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-semibold"
//                 >
//                   🚪 Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* MOBILE PATIENT INFO */}
//         {safePatient && (
//           <div className="md:hidden flex gap-2 pb-3 px-2 bg-secondary/5 rounded-lg mb-2">
//             <img
//               src={safePatient.profilePic || "/profilePic.png"}
//               alt={safePatient.fullName}
//               className="w-8 h-8 rounded-full border object-cover"
//             />
//             <div>
//               <p className="text-xs font-semibold">
//                 Patient: {safePatient.fullName}
//               </p>
//               <p className="text-[10px] text-gray-600">{safePatient.email}</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* BACKDROP */}
//       {dropdownOpen && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => setDropdownOpen(false)}
//         />
//       )}
//     </div>
//     </nav>
//   );
// }

//parindya
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDisplayName, getInitial } from "../utils/nameUtils";
import { confirmLogout } from "../utils/logoutConfirmation";

export default function DoctorNavBar({ doctor, patient }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/doctor/doctor-profile", {
      state: { fromNav: "NAV2" },
    });
  };

  if (!doctor) return null;
  const safePatient = patient || null;
  const doctorDisplayName = getDisplayName(doctor);
  const patientDisplayName =
    getDisplayName(safePatient) ||
    (safePatient?.id ? `Patient #${safePatient.id}` : "");
  const patientPhotoUrl =
    safePatient?.photoUrl || safePatient?.profilePic || "/profilePic.png";
  const doctorPhotoUrl =
    doctor?.photoUrl || doctor?.profilePic || "/profilePic.png";

  const handleNavigation = (path) => {
    setDropdownOpen(false);
    navigate(path);
  };

  const handlePatientProfileNavigation = () => {
    if (!safePatient) return;

    setDropdownOpen(false);
    navigate(`/doctor/${safePatient.patientId || safePatient.id}/profile`, {
      state: { patient: safePatient },
    });
  };

  const handleLogout = async () => {
    const confirmed = await confirmLogout();
    if (!confirmed) {
      return;
    }
    setDropdownOpen(false);
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-16">
        {/* TOP BAR */}
        <div className="flex items-center justify-between h-20 gap-3">
          {/* LOGO */}
          <img
            src="/logo.png"
            alt="Healthify Logo"
            className="h-14 sm:h-16 cursor-pointer flex-shrink-0"
            onClick={() => handleNavigation("/")}
          />

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* PATIENT INFO (desktop & tablet only) */}
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

            {/* DOCTOR DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
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

              {/* DROPDOWN MENU */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {/* HOME */}
                  <button
                    onClick={() => handleNavigation("/")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    🏠 Home
                  </button>
                  <hr className="my-2 border-gray-200" />
                  {/* PATIENT SECTION */}
                  {safePatient && (
                    <>
                      <div className="px-4 py-2">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Patient
                        </p>
                      </div>
                      <button
                        onClick={handlePatientProfileNavigation}
                        className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        👤 Profile
                      </button>
                      <button
                        onClick={() =>
                          handleNavigation(
                            `/doctor/${safePatient.id}/medical-reports`,
                          )
                        }
                        className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        📊 Dashboard
                      </button>
                      <button
                        onClick={() =>
                          handleNavigation(
                            `/doctor/${safePatient.id}/doctorViewform`,
                          )
                        }
                        className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        📝 Medical Info
                      </button>
                      <button
                        onClick={() =>
                          handleNavigation(`/doctor/${safePatient.id}/consult`)
                        }
                        className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        📋 Consultation
                      </button>
                      {/* <button
                      onClick={() =>
                        handleNavigation(
                          "/doctor-clinic-book/:patientId/:bookId",
                        )
                      }
                      className="w-full text-left px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      🩺 Clinic Books
                    </button> */}
                    </>
                  )}

                  {/* DOCTOR SECTION */}
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={goToProfile}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    👨‍⚕️ My Profile
                  </button>
                  <button
                    onClick={() => handleNavigation("/doctor/dashboard")}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    📈 My Dashboard
                  </button>

                  <hr className="my-2 border-gray-200" />

                  {/* LOGOUT */}
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

        {/* MOBILE PATIENT INFO */}
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

      {/* BACKDROP */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </nav>
  );
}
