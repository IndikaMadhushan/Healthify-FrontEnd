// import { useState } from "react";
// import { prescriptions } from "./Prescription.js";
// import PrescriptionCard from "./PrescriptionCard";
// import PrescriptionModal from "./PrescriptionModal";

// export default function PrescriptionList() {
//   const [selected, setSelected] = useState(null);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">


//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {prescriptions.map((rx) => (
//           <PrescriptionCard
//             key={rx.id}
//             data={rx}
//             onClick={() => setSelected(rx)}
//           />
//         ))}
//       </div>

//       {selected && (
//         <PrescriptionModal
//           data={selected}
//           onClose={() => setSelected(null)}
//         />
//       )}
//     </div>
//   );
// }



// import { useState } from "react";
// import { prescriptions } from "./Prescription.js";
// import PrescriptionCard from "./PrescriptionCard";
// import PrescriptionModal from "./PrescriptionModal";

// export default function PrescriptionList() {
//   const [selected, setSelected] = useState(null);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">

//       {/* EMPTY STATE */}
//       {prescriptions.length === 0 ? (
//         <div className="text-center py-20">
//           <div className="text-5xl mb-4">📄</div>
//           <h2 className="text-xl font-semibold text-gray-700">
//             No prescriptions found
//           </h2>
//           <p className="text-gray-500 mt-2">
//             You don’t have any prescriptions yet
//           </p>
//         </div>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {prescriptions.map((rx) => (
//             <PrescriptionCard
//               key={rx.id}
//               data={rx}
//               onClick={() => setSelected(rx)}
//             />
//           ))}
//         </div>
//       )}

//       {selected && (
//         <PrescriptionModal
//           data={selected}
//           onClose={() => setSelected(null)}
//         />
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import PrescriptionCard from "./PrescriptionCard";
import PrescriptionModal from "./PrescriptionModal";
import {
  getConsultCardByDoctor,
  getConsultCardByPatient,
} from "../../api/ConsultationApi";
import { useParams } from "react-router-dom";

export default function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterDoctor, setFilterDoctor] = useState("all");
  const [sortOrder, setSortOrder] = useState("recent");
  const [pageType, setPageType] = useState(null);


  const role = localStorage.getItem("role");
  const { patientId } = useParams(); // used ONLY for doctor

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    if (role === "DOCTOR") {
      if (!patientId) return;

      getConsultCardByDoctor(patientId)
        .then((res) => setPrescriptions(res.data))
        .catch((err) => {
          console.error(err);
          setPrescriptions([]);
        });

    } else if (role === "PATIENT") {
      getConsultCardByPatient()
        .then((res) => setPrescriptions(res.data))
        .catch((err) => {
          console.error(err);
          setPrescriptions([]);
        });
    }
  }, [role, patientId]);

  /* ---------------- FILTER LOGIC ---------------- */

  const uniqueDoctors = [
    ...new Set(prescriptions.map((p) => p.doctorName)),
  ];

  const filteredAndSortedPrescriptions = prescriptions
    .filter((p) =>
      filterDoctor === "all"
        ? true
        : p.doctorName === filterDoctor
    )
    .sort((a, b) => {
      const dateA = new Date(
        `${a.pagecreatedDate}T${a.pagecreatedTime}`
      );
      const dateB = new Date(
        `${b.pagecreatedDate}T${b.pagecreatedTime}`
      );

      return sortOrder === "recent"
        ? dateB - dateA
        : dateA - dateB;
    });

  /* ---------------- UI (UNCHANGED) ---------------- */

  return (
    <div className="md:p-6 p-2 max-w-6xl mx-auto">

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
            className={`flex flex-col md:flex-row gap-4 w-full md:w-auto ${
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
                className="w-full md:w-48 px-4 py-2 border rounded-lg"
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
                className="w-full md:w-40 px-4 py-2 border rounded-lg"
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

      {/* LIST */}
      {filteredAndSortedPrescriptions.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📄</div>
          <h2 className="text-xl font-semibold text-gray-700">
            No prescriptions found
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedPrescriptions.map((rx) => (
            <PrescriptionCard
              key={rx.consultId}   // ✅ UNIQUE
              data={rx}
              onClick={() => {
                setSelected(rx);
                setPageType("CONSULT");
              }}
            />
          ))}
        </div>
      )}

      {/* MODAL */}
      {selected && (
        <PrescriptionModal
          data={selected}
          pageType={pageType}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
