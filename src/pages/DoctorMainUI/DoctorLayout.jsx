// import { Outlet } from "react-router-dom";
// import DoctorNavBar from "./DoctorNavBar";

// export default function DoctorLayout() {
//   return (
//     <>
//       <DoctorNavBar />
//       <main className="pt-4 px-4">
//         <Outlet />
//       </main>
//     </>
//   );
// }

// import { Outlet, useLocation } from "react-router-dom";
// import DoctorNavBar from "../../components/DoctorNavBar";
// import DoctorNavBar2 from "../../components/DoctorNavBar2";

// export default function DoctorLayout1() {
//   const location = useLocation();

//   // Dashboard routes → Navbar 1
//   const isDashboard = location.pathname.startsWith("/doctor/dashboard");

//   return (
//     <>
//       {isDashboard ? <DoctorNavBar /> : <DoctorNavBar2 />}

//       <main className="pt-4 px-4">
//         <Outlet />
//       </main>
//     </>
//   );
// }

import { Outlet } from "react-router-dom";
import DoctorNavBar from "../../components/DoctorNavBar";

export default function DoctorLayout1() {
  return (
    <>
      <DoctorNavBar />
      <main className="pt-4 px-4">
        <Outlet />
      </main>
    </>
  );
}
