// import { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import DoctorNavBar from "../components/DoctorNavBar";
// import { getDoctorProfileApi } from "../api/DoctorApi";

// export default function DoctorLayout() {
//   const [doctor, setDoctor] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadDoctor = async () => {
//       try {
//         const res = await getDoctorProfileApi();
//         setDoctor(res.data);
//       } catch (err) {
//         console.error("Failed to load doctor profile", err);
//         navigate("/login");
//       }
//     };

//     loadDoctor();
//   }, [navigate]);

//   if (!doctor) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500">Loading doctor dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <DoctorNavBar doctor={doctor} />
//       <Outlet />
//     </>
//   );
// }


// import { useEffect, useState } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import DoctorNavBar from "../components/DoctorNavBar";
// import DoctorNavBar2 from "../components/DoctorNavBar2";
// import { getDoctorProfileApi } from "../api/DoctorApi";

// export default function DoctorLayout() {
//   const [doctor, setDoctor] = useState(null);
//   const [patient, setPatient] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const loadDoctor = async () => {
//       try {
//         const res = await getDoctorProfileApi();
//         setDoctor(res.data);

//         const storedPatient = localStorage.getItem("selectedPatient");
//         if (storedPatient) {
//           setPatient(JSON.parse(storedPatient));
//         }
//       } catch (err) {
//         console.error("Failed to load doctor profile", err);
//         navigate("/login");
//       }
//     };

//     loadDoctor();
//   }, [navigate]);

//   const isDashboard = location.pathname === "/doctor/dashboard" || location.pathname === "/doctor/dashboard/";

//   if (!doctor) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500">Loading doctor dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {isDashboard ? (
//         <DoctorNavBar doctor={doctor} />
//       ) : (
//         <DoctorNavBar2 doctor={doctor} patient={patient} />
//       )}
//       <Outlet />
//     </>
//   );
// }


// import { useEffect, useState } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import DoctorNavBar from "../components/DoctorNavBar";
// import DoctorNavBar2 from "../components/DoctorNavBar2";
// import { getDoctorProfileApi } from "../api/DoctorApi";

// export default function DoctorLayout() {
//   const [doctor, setDoctor] = useState(null);
//   const [patient, setPatient] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const loadDoctor = async () => {
//       try {
//         // ✅ Load doctor from backend
//         const res = await getDoctorProfileApi();
//         setDoctor(res.data);

//         // ✅ TEMP HARD-CODED PATIENT (until backend is ready)
//         const hardCodedPatient = {
//           id: 1,
//           fullName: "Test Patient",
//           email: "patient@test.com",
//           profilePic: "/profilePic.png",
//         };

//         setPatient(hardCodedPatient);
//         localStorage.setItem(
//           "selectedPatient",
//           JSON.stringify(hardCodedPatient)
//         );
//       } catch (err) {
//         console.error("Failed to load doctor profile", err);
//         navigate("/login");
//       }
//     };

//     loadDoctor();
//   }, [navigate]);

//   // 🔹 ONLY dashboard gets NavBar 1
//   const isDashboard =
//     location.pathname === "/doctor/dashboard" ||
//     location.pathname === "/doctor/dashboard/";

//   if (!doctor) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500">Loading doctor dashboard...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {isDashboard || location.pathname === "/doctor/doctor-profile" ? (
//         <DoctorNavBar doctor={doctor} />
//       ) : (
//         <DoctorNavBar2 doctor={doctor} patient={patient} />
//       )}

//       {/* 🔹 Middle content changes by URL */}
//       <Outlet />
//     </>
//   );
// }


import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import DoctorNavBar from "../components/DoctorNavBar";
import DoctorNavBar2 from "../components/DoctorNavBar2";
import { getDoctorProfileApi } from "../api/DoctorApi";
import Footer from "../components/footer";

export default function DoctorLayout() {
  const [doctor, setDoctor] = useState(null);
  const [patient, setPatient] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        // ✅ Load doctor from backend
        const res = await getDoctorProfileApi();
        setDoctor(res.data);

        // ✅ TEMP HARD-CODED PATIENT (until backend is ready)
        const hardCodedPatient = {
          id: 1,
          fullName: "Test Patient",
          email: "patient@test.com",
          profilePic: "/profilePic.png",
        };

        setPatient(hardCodedPatient);
        localStorage.setItem(
          "selectedPatient",
          JSON.stringify(hardCodedPatient)
        );
      } catch (err) {
        console.error("Failed to load doctor profile", err);
        navigate("/login");
      }
    };

    loadDoctor();
  }, [navigate]);

  // 🔹 ONLY dashboard gets NavBar 1
  const isDashboard =
    location.pathname === "/doctor/dashboard" ||
    location.pathname === "/doctor/dashboard/";

  // ✅ NEW: detect where doctor-profile navigation came from
  const fromNav = location.state?.fromNav;

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading doctor dashboard...</p>
      </div>
    );
  }

  return (
    <>
      {isDashboard ||
      (location.pathname === "/doctor/doctor-profile" &&
        fromNav === "NAV1") ? (
        <DoctorNavBar doctor={doctor} />
      ) : (
        <DoctorNavBar2 doctor={doctor} patient={patient} />
      )}

      {/* 🔹 Middle content changes by URL */}
      <div className="lg:px-14 px-6 ">
        <Outlet />
      </div>
      <Footer/>
    </>
  );
}
