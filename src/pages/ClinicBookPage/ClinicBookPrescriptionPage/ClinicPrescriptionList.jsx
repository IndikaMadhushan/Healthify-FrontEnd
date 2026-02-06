// import { useState } from "react";
// import { FaFilter } from "react-icons/fa";
// import { prescriptions } from "./clinicBookPages.js";

// import { useParams } from "react-router-dom";
// import PrescriptionCard from "./ClinicPrescriptionCard.jsx";
// import PrescriptionModal from "../../Prescriptions/PrescriptionModal.jsx";
// import { PatinetNavBar } from "../../../components/PatientNavBar.jsx";

// export default function ClinicPrescriptionList() {
//   const { id: clinicBookId } = useParams(); // ✅ GET CLINIC BOOK ID

//   const [selected, setSelected] = useState(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const [filterDoctor, setFilterDoctor] = useState("all");
//   const [sortOrder, setSortOrder] = useState("recent");

//   /* ---------------- FILTER LOGIC ---------------- */

//   // ✅ FILTER BY CLINIC BOOK FIRST
//   const clinicBookPrescriptions = prescriptions.filter(
//     (p) => p.clinicBookId === clinicBookId
//   );

//   const uniqueDoctors = [
//     ...new Set(clinicBookPrescriptions.map((p) => p.doctor.name)),
//   ];

//   const filteredAndSortedPrescriptions = clinicBookPrescriptions
//     .filter((p) =>
//       filterDoctor === "all" ? true : p.doctor.name === filterDoctor
//     )
//     .sort((a, b) => {
//       const dateA = new Date(a.createdAt);
//       const dateB = new Date(b.createdAt);
//       return sortOrder === "recent"
//         ? dateB - dateA
//         : dateA - dateB;
//     });

//   /* ---------------- UI (UNCHANGED) ---------------- */

//   return (
// <>
  
//     <div className="p-6 max-w-6xl mx-auto">

//       {/* FILTER BAR */}
//       <div className="bg-white rounded-xl shadow-md p-4 mb-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="md:hidden flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-lg font-medium"
//           >
//             <FaFilter />
//             {showFilters ? "Hide Filters" : "Show Filters"}
//           </button>

//           <div
//             className={`flex flex-col md:flex-row gap-4 w-full md:w-auto ${
//               showFilters ? "block" : "hidden md:flex"
//             }`}
//           >
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Filter by Doctor
//               </label>
//               <select
//                 value={filterDoctor}
//                 onChange={(e) => setFilterDoctor(e.target.value)}
//                 className="w-full md:w-48 px-4 py-2 border rounded-lg"
//               >
//                 <option value="all">All Doctors</option>
//                 {uniqueDoctors.map((doctor) => (
//                   <option key={doctor} value={doctor}>
//                     {doctor}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Sort by Date
//               </label>
//               <select
//                 value={sortOrder}
//                 onChange={(e) => setSortOrder(e.target.value)}
//                 className="w-full md:w-40 px-4 py-2 border rounded-lg"
//               >
//                 <option value="recent">Most Recent</option>
//                 <option value="oldest">Oldest First</option>
//               </select>
//             </div>
//           </div>

//           <div className="text-sm text-gray-600 font-medium">
//             {filteredAndSortedPrescriptions.length}{" "}
//             {filteredAndSortedPrescriptions.length === 1
//               ? "prescription"
//               : "prescriptions"}{" "}
//             found
//           </div>
//         </div>
//       </div>

//       {/* RESULTS */}
//       {filteredAndSortedPrescriptions.length === 0 ? (
//         <div className="text-center py-20">
//           <div className="text-5xl mb-4">📄</div>
//           <h2 className="text-xl font-semibold text-gray-700">
//             No prescriptions found
//           </h2>
//           <p className="text-gray-500 mt-2">
//             This clinic book has no prescriptions yet
//           </p>
//         </div>
//       ) : (
//         <div className="grid  gap-6">
//           {filteredAndSortedPrescriptions.map((rx) => (
//             <PrescriptionCard
//               key={rx.id}
//               data={rx}
//               onClick={() => setSelected(rx)}
//             />
//           ))}
//         </div>
//       )}

//       {/* MODAL */}
//       {selected && (
//         <PrescriptionModal
//           data={selected}
//           onClose={() => setSelected(null)}
//         />
//       )}
//     </div>
//     </>
//   );
// }


//before try to connect backend
// import { useState } from "react";
// import { FaFilter } from "react-icons/fa";
// import { prescriptions } from "./clinicBookPages.js";
// import PrescriptionCard from "./ClinicPrescriptionCard.jsx";
// import PrescriptionModal from "../../Prescriptions/PrescriptionModal.jsx";

// export default function ClinicPrescriptionList() {
//   // 🔹 UI TEST MODE (MATCHES YOUR DUMMY DATA)
//   const clinicBookId = "CB001"; // change to "CB002" to test other book

//   const [selected, setSelected] = useState(null);
//   const [showFilters, setShowFilters] = useState(false);
//   const [filterDoctor, setFilterDoctor] = useState("all");
//   const [sortOrder, setSortOrder] = useState("recent");

//   /* ---------- FILTER BY CLINIC BOOK ---------- */
//   const clinicBookPrescriptions = prescriptions.filter(
//     (p) => p.clinicBookId === clinicBookId
//   );

//   /* ---------- DOCTOR FILTER ---------- */
//   const uniqueDoctors = [
//     ...new Set(clinicBookPrescriptions.map((p) => p.doctor.name)),
//   ];

//   /* ---------- FILTER + SORT ---------- */
//   const filteredAndSortedPrescriptions = clinicBookPrescriptions
//     .filter((p) =>
//       filterDoctor === "all" ? true : p.doctor.name === filterDoctor
//     )
//     .sort((a, b) => {
//       const dateA = new Date(a.createdAt);
//       const dateB = new Date(b.createdAt);
//       return sortOrder === "recent"
//         ? dateB - dateA
//         : dateA - dateB;
//     });

//   /* ---------- UI ---------- */
//   return (
//     <div className="p-6 max-w-6xl mx-auto">

//       {/* FILTER BAR */}
//       <div className="bg-white rounded-xl shadow-md p-4 mb-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="md:hidden flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-lg font-medium"
//           >
//             <FaFilter />
//             {showFilters ? "Hide Filters" : "Show Filters"}
//           </button>

//           <div
//             className={`flex flex-col md:flex-row gap-4 ${
//               showFilters ? "block" : "hidden md:flex"
//             }`}
//           >
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Filter by Doctor
//               </label>
//               <select
//                 value={filterDoctor}
//                 onChange={(e) => setFilterDoctor(e.target.value)}
//                 className="px-4 py-2 border rounded-lg"
//               >
//                 <option value="all">All Doctors</option>
//                 {uniqueDoctors.map((doctor) => (
//                   <option key={doctor} value={doctor}>
//                     {doctor}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Sort by Date
//               </label>
//               <select
//                 value={sortOrder}
//                 onChange={(e) => setSortOrder(e.target.value)}
//                 className="px-4 py-2 border rounded-lg"
//               >
//                 <option value="recent">Most Recent</option>
//                 <option value="oldest">Oldest First</option>
//               </select>
//             </div>
//           </div>

//           <div className="text-sm text-gray-600 font-medium">
//             {filteredAndSortedPrescriptions.length} prescriptions found
//           </div>
//         </div>
//       </div>

//       {/* RESULTS */}
//       {filteredAndSortedPrescriptions.length === 0 ? (
//         <div className="text-center py-20">
//           <div className="text-5xl mb-4">📄</div>
//           <h2 className="text-xl font-semibold text-gray-700">
//             No prescriptions found
//           </h2>
//         </div>
//       ) : (
//         <div className="grid gap-6">
//           {filteredAndSortedPrescriptions.map((rx) => (
//             <PrescriptionCard
//               key={rx.id}
//               data={rx}
//               onClick={() => setSelected(rx)}
//             />
//           ))}
//         </div>
//       )}

//       {/* MODAL */}
//       {selected && (
//         <PrescriptionModal
//           data={selected}
//           onClose={() => setSelected(null)}
//         />
//       )}
//     </div>
//   );
// }









//OK SOME BACKEND CONNECTING

import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useParams } from "react-router-dom";
import PrescriptionCard from "./ClinicPrescriptionCard";
import PrescriptionModal from "../../Prescriptions/PrescriptionModal";
import { getClinicPagesByClinicBookId } from "../../../api/ClinicPageApi";

export default function ClinicPrescriptionList() {
  const { clinicBookId } = useParams(); // 👈 FROM URL

  const [pages, setPages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterDoctor, setFilterDoctor] = useState("all");
  const [sortOrder, setSortOrder] = useState("recent");

  /* ---------- LOAD DATA ---------- */
  useEffect(() => {
    if (!clinicBookId) return;

    getClinicPagesByClinicBookId(clinicBookId)
      .then((res) => {
        setPages(res.data);
      })
      .catch((err) => {
        console.error("Failed to load clinic pages", err);
      });
  }, [clinicBookId]);

  /* ---------- FILTER ---------- */
  const uniqueDoctors = [
    ...new Set(pages.map((p) => p.createdDoctor)),
  ];

  const filteredAndSortedPrescriptions = pages
    .filter((p) =>
      filterDoctor === "all" ? true : p.createdDoctor === filterDoctor
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "recent"
        ? dateB - dateA
        : dateA - dateB;
    });

  /* ---------- UI ---------- */
  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* FILTER BAR */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-lg font-medium"
          >
            <FaFilter />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <div
            className={`flex flex-col md:flex-row gap-4 ${
              showFilters ? "block" : "hidden md:flex"
            }`}
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Filter by Doctor
              </label>
              <select
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="all">All Doctors</option>
                {uniqueDoctors.map((doctor) => (
                  <option key={doctor} value={doctor}>
                    {doctor}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Sort by Date
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600 font-medium">
            {filteredAndSortedPrescriptions.length} prescriptions found
          </div>
        </div>
      </div>

      {/* RESULTS */}
      {filteredAndSortedPrescriptions.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📄</div>
          <h2 className="text-xl font-semibold text-gray-700">
            No prescriptions found
          </h2>
        </div>
      ) : (
        <div className="grid gap-6">
          {/* {filteredAndSortedPrescriptions.map((rx) => (
            <PrescriptionCard
              key={rx.clinicPageId}
              data={rx}
              onClick={() => setSelected(rx)}
            />
          ))} */}
          

          {filteredAndSortedPrescriptions.map((rx) => (
            <PrescriptionCard
              key={rx.clinicPageId}   // ✅ UNIQUE KEY
              data={rx}
              onClick={() => setSelected(rx)}
            />
          ))}

        </div>
      )}

      {selected && (
        <PrescriptionModal
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
