// import { useParams } from "react-router-dom";
// import { prescriptions } from "./Prescription.js";

// export default function PrescriptionVerify() {
//   const { id } = useParams();

//   // FRONTEND-ONLY verification
//   const prescription = prescriptions.find(p => p.id === id);

//   if (!prescription) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded-xl shadow text-center">
//           <h2 className="text-xl font-bold text-red-600">
//             ❌ Invalid Prescription
//           </h2>
//           <p className="text-sm text-gray-600 mt-2">
//             This prescription could not be verified.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6">

//         {/* STATUS */}
//         <div className="flex items-center gap-3 border-b pb-4 mb-4">
//           <span className="text-green-600 text-2xl">✔</span>
//           <div>
//             <h2 className="text-lg font-semibold text-green-700">
//               Valid Prescription
//             </h2>
//             <p className="text-xs text-gray-500">
//               Digitally verified by Healthify
//             </p>
//           </div>
//         </div>

//         {/* DOCTOR */}
//         <section className="mb-4">
//           <h3 className="font-semibold text-gray-700 mb-1">
//             Doctor Information
//           </h3>
//           <p><b>Name:</b> {prescription.doctor.name}</p>
//           <p><b>SLMC:</b> {prescription.doctor.slmc}</p>
//         </section>

//         {/* PATIENT */}
//         <section className="mb-4">
//           <h3 className="font-semibold text-gray-700 mb-1">
//             Patient Summary
//           </h3>
//           <p><b>Name:</b> {prescription.patient.name}</p>
//           <p>
//             <b>Age:</b> {prescription.patient.age} |{" "}
//             <b>Gender:</b> {prescription.patient.gender}
//           </p>
//         </section>

//         {/* MEDICATIONS */}
//         <section className="mb-4">
//           <h3 className="font-semibold text-gray-700 mb-2">
//             Prescribed Medicines
//           </h3>
//           <table className="w-full text-sm border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border p-2">Drug</th>
//                 <th className="border p-2">Dose</th>
//                 <th className="border p-2">Freq</th>
//                 <th className="border p-2">Days</th>
//               </tr>
//             </thead>
//             <tbody>
//               {prescription.medications.map((m, i) => (
//                 <tr key={i}>
//                   <td className="border p-2">{m.name}</td>
//                   <td className="border p-2">{m.dose}</td>
//                   <td className="border p-2">{m.freq}</td>
//                   <td className="border p-2">{m.days}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>

//         {/* FOOTER */}
//         <div className="text-xs text-gray-500 border-t pt-3">
//           Issued on {prescription.createdAt} • Prescription ID: {prescription.id}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PrescriptionVerify() {
  const { clinicPageId } = useParams();

  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /* ---------- LOAD FROM BACKEND ---------- */
  useEffect(() => {
    if (!clinicPageId) return;

    setLoading(true);
    setError(false);

    axios
      .get(`http://localhost:8080/api/v1/cpage/${clinicPageId}`)
      .then((res) => {
        setPrescription(res.data.data); // ✅ correct
        setLoading(false);
      })
      .catch((err) => {
        console.error("Verification failed", err);
        setError(true);
        setLoading(false);
      });
  }, [clinicPageId]);

  /* ---------- LOADING ---------- */
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <p className="text-gray-600">Verifying prescription...</p>
  //     </div>
  //   );
  // }

  /* ---------- INVALID ---------- */
  if (error || !prescription) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold text-red-600">
            ❌ Invalid Prescription
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            This prescription could not be verified.
          </p>
        </div>
      </div>
    );
  }

  /* ---------- VALID ---------- */
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6">

        {/* STATUS */}
        <div className="flex items-center gap-3 border-b pb-4 mb-4">
          <span className="text-green-600 text-2xl">✔</span>
          <div>
            <h2 className="text-lg font-semibold text-green-700">
              Valid Prescription
            </h2>
            <p className="text-xs text-gray-500">
              Digitally verified by Healthify
            </p>
          </div>
        </div>

        {/* BASIC INFO */}
        <section className="mb-4 text-sm">
          <p><b>Prescription ID:</b> {prescription.clinicPageId}</p>
          <p><b>Reason:</b> {prescription.subReason}</p>
        </section>

        {/* MEDICATIONS */}
        {prescription.medication?.length > 0 && (
          <section className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Prescribed Medicines
            </h3>
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Drug</th>
                  <th className="border p-2">Dose</th>
                  <th className="border p-2">Frequency</th>
                  <th className="border p-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                {prescription.medication.map((m, i) => (
                  <tr key={i}>
                    <td className="border p-2">{m.drugName}</td>
                    <td className="border p-2">{m.dosage}</td>
                    <td className="border p-2">{m.frequency}</td>
                    <td className="border p-2">{m.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        <div className="text-xs text-gray-500 border-t pt-3">
          This is a digitally issued prescription.
        </div>
      </div>
    </div>
  );
}