// import PrescriptionTemplate from "./PrescriptionTemplate";

// export default function PrescriptionModal({ data, onClose }) {
//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
//       <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden">

//         {/* HEADER */}
//         <div className="flex justify-between items-center px-6 py-4 border-b">
//           <h2 className="font-semibold text-lg text-[#0F4F52]">
//             Prescription
//           </h2>
//           <button onClick={onClose} className="text-xl">×</button>
//         </div>

//         {/* BODY */}
//         <div className="p-6 max-h-[75vh] overflow-y-auto">
//           <PrescriptionTemplate data={data} />
//         </div>
//       </div>
//     </div>
//   );
// }










// import { useRef,useState,useEffect } from "react";
// import html2pdf from "html2pdf.js";
// import PrescriptionTemplate from "./PrescriptionTemplate";
// import PrescriptionA4Wrapper from "./PrescriptionA4Wrapper";
// import {getClinicPageById} from "../../api/ClinicPageApi.js"; 
// export default function PrescriptionModal({ data, onClose }) {
//   const pdfRef = useRef(null);

//   const [prescription, setPrescription] = useState(null);

//   useEffect(() => {
//     async function loadPrescription() {
//       try {
//         const pageRes = await getClinicPageById(data.clinicPageId);
//         // const bookRes = await getClinicBookById(data.clinicBookId);

//         const page = pageRes.data.data;
//         const book = bookRes.data;

//         const metrics = page.healthMetricRequestSetDTO?.metrics || {};

//         setPrescription({
//           id: data.clinicPageId,

//           // doctor: {
//           //   name: book.doctorFullName,
//           //   slmc: book.licenseNumber
//           // },

//           // patient: {
//           //   name: book.patientFullName,
//           //   age: book.patientAge,
//           //   gender: book.patientGender
//           // },

//           // createdAt: book.createdDate,

//           vitals: {
//             bp: metrics.BLOOD_PRESSURE_SYSTOLIC ?? "—",
//             HeartRate: metrics.HEART_RATE ?? "—",
//             temp: metrics.TEMPERATURE ?? "—",
//             BloodSugar: metrics.BLOOD_SUGAR ?? "—",
//             weight: "—"
//           },

//           medications: page.medication.map(m => ({
//             name: m.drugName,
//             dose: m.dosage,
//             freq: m.frequency,
//             days: m.duration
//           })),

//           examine: page.clinicExaming,
//           tests: page.clinicSuggestTest
//         });
//       } catch (e) {
//         console.error("Failed to load prescription", e);
//       }
//     }

//     loadPrescription();
//   }, [data]);

//   // if (!prescription) {
//   //   return (
//   //     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//   //       <div className="bg-white p-6 rounded-xl">
//   //         Loading prescription...
//   //       </div>
//   //     </div>
//   //   );
//   // }











//   /////////////////////

//   const downloadPDF = async () => {
//     if (!pdfRef.current) return;

//     // IMPORTANT: wait for QR + layout to render
//     await new Promise((res) => setTimeout(res, 300));

//     html2pdf()
//       .set({
//         margin: 0,
//         filename: `Prescription_${data.id}.pdf`,
//         image: { type: "jpeg", quality: 0.98 },
//         html2canvas: {
//           scale: 2,
//           useCORS: true,
//           backgroundColor: "#ffffff"
//         },
//         jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
//       })
//       .from(pdfRef.current)
//       .save();
//   };

//   return (
//     <>
//       {/* ===== MODAL UI ===== */}
//       <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
//         <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl">

//           {/* HEADER */}
//           <div className="flex justify-between items-center px-6 py-4 border-b">
//             <h2 className="font-semibold text-lg text-[#0F4F52]">
//               Prescription
//             </h2>

//             <div className="flex gap-3">
//               <button
//                 type="button"
//                 onClick={downloadPDF}
//                 className="px-4 py-2 bg-[#18AAB0] text-white rounded-lg text-sm"
//               >
//                 Download PDF
//               </button>

//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="text-xl"
//               >
//                 ×
//               </button>
//             </div>
//           </div>

//           {/* PREVIEW (OPTIONAL – can keep or remove) */}
//           <div className="p-6 max-h-[70vh] overflow-y-auto">
//             <PrescriptionTemplate data={data} />
//           </div>

          
//         </div>
//       </div>

//       {/* ===== PDF SOURCE (ONLY ONE SOURCE) ===== */}
//       <div
//         style={{
//           position: "fixed",
//           left: "-10000px",
//           top: 0,
//           background: "#fff"
//         }}
//       >
//         <div ref={pdfRef}>
//           <PrescriptionA4Wrapper>
//             <PrescriptionTemplate data={data} />
//           </PrescriptionA4Wrapper>
//         </div>
//       </div>
//     </>
//   );
// }


// import { useEffect, useState } from "react";
// import { getClinicPageById } from "../../api/ClinicPageApi";
// import PrescriptionTemplate from "./PrescriptionTemplate";

// export default function PrescriptionModal({ data, onClose }) {
//   const [prescription, setPrescription] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!data?.id) return; // ✅ PREVENT undefined call

//     const loadPrescription = async () => {
//       try {
//         const res = await getClinicPageById(data.id); // ✅ FIX
//         setPrescription(res.data.data);
//       } catch (err) {
//         console.error("Failed to load prescription", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPrescription();
//   }, [data]);

//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
//       <div className="bg-white rounded-xl w-full max-w-4xl">

//         <div className="flex justify-between p-4 border-b">
//           <h2 className="font-semibold">Prescription</h2>
//           <button onClick={onClose}>✕</button>
//         </div>

//         <div className="p-6">
//           {loading && <p>Loading...</p>}

//           {!loading && prescription && (
//             <PrescriptionTemplate data={prescription} />
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { getClinicPageById } from "../../api/ClinicPageApi";
// import { getConsultPageById } from "../../api/ConsultationApi";
// import PrescriptionTemplate from "./PrescriptionTemplate";

// export default function PrescriptionModal({ data, pageType, onClose }) {
//   const [prescription, setPrescription] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   if (!data) return;

//   //   const loadPrescription = async () => {
//   //     try {
//   //       setLoading(true);

//   //       let res;

//   //       if (pageType === "CLINIC") {
//   //         res = await getClinicPageById(data.id); // clinicPageId
//   //       }

//   //       if (pageType === "CONSULT") {
//   //         res = await getConsultPageById(data.consultId); // consultId
//   //       }

//   //       setPrescription(res.data.data);
//   //     } catch (err) {
//   //       console.error("Failed to load prescription", err);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   loadPrescription();
//   // }, [data, pageType]);

//   useEffect(() => {
//   if (!data || !pageType) return;

//   const loadPrescription = async () => {
//     try {
//       setLoading(true);
//       let res;

//       if (pageType === "CLINIC" && data.id) {
//         res = await getClinicPageById(data.id);
//       }

//       if (pageType === "CONSULT" && data.consultId) {
//         res = await getConsultPageById(data.consultId);
//       }

//       if (!res) return; // ✅ PREVENT undefined access

//       setPrescription(res.data.data);
//     } catch (err) {
//       console.error("Failed to load prescription", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   loadPrescription();
// }, [data, pageType]);


//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
//       <div className="bg-white rounded-xl w-full max-w-4xl">

//         <div className="flex justify-between p-4 border-b">
//           <h2 className="font-semibold">Prescription</h2>
//           <button onClick={onClose}>✕</button>
//         </div>

//         <div className="p-6">
//           {loading && <p>Loading...</p>}
//           {!loading && prescription && (
//             <PrescriptionTemplate data={prescription} />
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { getClinicPageById } from "../../api/ClinicPageApi";
import { getConsultPageById } from "../../api/ConsultationApi";
import PrescriptionTemplate from "./PrescriptionTemplate";

export default function PrescriptionModal({ data, pageType, onClose }) {
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data || !pageType) return;

    const loadPrescription = async () => {
      try {
        setLoading(true);
        let res;

        // ---------- CLINIC ----------
        if (pageType === "CLINIC" && data.id) {
          res = await getClinicPageById(data.id);
          setPrescription(res.data.data); // clinic already matches template
        }

        // ---------- CONSULT ----------
        if (pageType === "CONSULT" && data.consultId) {
          res = await getConsultPageById(data.consultId);

          const raw = res.data.data;

          // 🔁 NORMALIZE CONSULT → TEMPLATE STRUCTURE
          setPrescription({
            ...raw,

            // doctor
            createdDoctor: raw.doctorName,
            slmc: raw.slmc,

            // patient
            patientName: raw.patientName,
            patientAge: raw.patientAge,
            patientGender: raw.patientGender,

            // dates
            pagecreatedDate: raw.createdDate,
            pagecreatedTime: raw.createdTime,

            // medications (VERY IMPORTANT)
            medication: raw.medications || [],

            // vitals (VERY IMPORTANT)
            healthMetricRequestSetDTO: {
              metrics: raw.healthMetrics || {}
            }
          });
        }
      } catch (err) {
        console.error("Failed to load prescription", err);
      } finally {
        setLoading(false);
      }
    };

    loadPrescription();
  }, [data, pageType]);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-4xl">

        <div className="flex justify-between p-4 border-b">
          <h2 className="font-semibold">Prescription</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="p-6">
          {loading && <p>Loading...</p>}
          {!loading && prescription && (
            <PrescriptionTemplate data={prescription} />
          )}
        </div>

      </div>
    </div>
  );
}
