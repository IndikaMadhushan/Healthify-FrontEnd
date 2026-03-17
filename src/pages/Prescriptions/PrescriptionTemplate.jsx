// export default function PrescriptionTemplate({ data }) {
//   return (
//     <div className="space-y-6 text-sm">

//       {/* HEADER */}
//       <div className="flex justify-between items-center border-b pb-4">
//         <div>
//           <img src="logo.png" className=" w-25"/>
//           <p className="text-xs text-gray-500">Digital Prescription</p>
//         </div>

//         <div className="text-right">
//           <p className="font-semibold">{data.doctor.name}</p>
//           <p className="text-xs">SLMC: {data.doctor.slmc}</p>
//           <p className="text-xs">{data.doctor.email}</p>
//         </div>
//       </div>

//       {/* PATIENT INFO */}
//       <div className="grid grid-cols-2 gap-4">
//         <p><b>Patient:</b> {data.patient.name}</p>
//         <p><b>Age:</b> {data.patient.age}</p>
//         <p><b>Gender:</b> {data.patient.gender}</p>
//         <p><b>Date:</b> {data.createdAt}</p>
//         <p><b>Clinic:</b> {data.clinic}</p>
//       </div>

//       {/* VITALS */}
//       <div className="border rounded-lg p-4">
//         <div className="grid grid-cols-3 gap-2">
//           <p>BP: {data.vitals.bp}</p>
//           <p>Pulse: {data.vitals.pulse}</p>
//           <p>Temp: {data.vitals.temp}</p>
//           <p>Weight: {data.vitals.weight}</p>
//         </div>
//       </div>

//       {/* MEDICATIONS */}
//       <div>
//         <h3 className="font-semibold mb-2">Medications</h3>
//         <table className="w-full border text-sm">
//           <thead className="bg-[#F2FBFA]">
//             <tr>
//               <th className="border px-2 py-1">Drug</th>
//               <th className="border px-2 py-1">Dose</th>
//               <th className="border px-2 py-1">Frequency</th>
//               <th className="border px-2 py-1">Duration</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.medications.map((m, i) => (
//               <tr key={i}>
//                 <td className="border px-2 py-1">{m.name}</td>
//                 <td className="border px-2 py-1">{m.dose}</td>
//                 <td className="border px-2 py-1">{m.freq}</td>
//                 <td className="border px-2 py-1">{m.days}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* NOTES */}
//       <div>
//         <p><b>Doctor Notes:</b> {data.notes}</p>
//         <p><b>Suggested Tests:</b> {data.tests}</p>
//       </div>

//     </div>
//   );
// }



// import PrescriptionQR from "./PrescriptionQR";

// export default function PrescriptionTemplate({ data }) {

//   // ✅ DEFINE vitals FIRST
//   const vitals = data?.healthMetricRequestSetDTO?.metrics;

//   return (
//     <div className="md:text-sm text-xs space-y-4">

//       {/* HEADER */}
//       <div style={{ borderBottom: "2px solid #18AAB0", paddingBottom: 8 }}>
//         <img src="logo.png" alt="Healthify Logo" style={{ height: 70 }} />
//         <p style={{ fontSize: 12 }}>Digital Prescription</p>
//       </div>

//       {/* DOCTOR INFO */}
//       <div>
//         <p><b>Doctor:</b> {data.createdDoctor}</p>
//         <p><b>SLMC:</b> {data.slmc}</p>
//       </div>

//       {/* PATIENT INFO */}
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <p><b>Patient:</b> {data.patientName}</p>
//         <p><b>Age:</b> {data.patientAge}</p>
//         <p><b>Gender:</b> {data.patientGender}</p>
//       </div>

//       {/* DATE */}
//       {data?.createdAt && (
//         <p><b>Date:</b> {data.createdAt}</p>
//       )}

//       {/* ✅ VITALS — SHOW ONLY IF EXISTS */}
//       <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>

//         {vitals?.BLOOD_PRESSURE_SYSTOLIC !== undefined && (
//           <p><b>BP:</b> {vitals.BLOOD_PRESSURE_SYSTOLIC}</p>
//         )}

//         {vitals?.HEART_RATE !== undefined && (
//           <p><b>Heart Rate:</b> {vitals.HEART_RATE}</p>
//         )}

//         {vitals?.TEMPERATURE !== undefined && (
//           <p><b>Temp:</b> {vitals.TEMPERATURE}</p>
//         )}

//         {vitals?.WEIGHT !== undefined && (
//           <p><b>Weight:</b> {vitals.WEIGHT}</p>
//         )}

//         {vitals?.BLOOD_SUGAR !== undefined && (
//           <p><b>Blood Sugar:</b> {vitals.BLOOD_SUGAR}</p>
//         )}

//       </div>

//       {/* MEDICATION TABLE */}
//       {data?.medication?.length > 0 && (
//         <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
//           <thead>
//             <tr style={{ background: "#F2FBFA" }}>
//               <th style={cell}>Medicine</th>
//               <th style={cell}>Dose</th>
//               <th style={cell}>Frequency</th>
//               <th style={cell}>Duration</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.medication.map((m, i) => (
//               <tr key={i}>
//                 <td style={cell}>{m.drugName}</td>
//                 <td style={cell}>{m.dosage}</td>
//                 <td style={cell}>{m.frequency}</td>
//                 <td style={cell}>{m.duration}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* NOTES */}
//       <div>
//         {data?.clinicExaming && (
//           <p><b>Examine:</b> {data.clinicExaming}</p>
//         )}
//         {data?.clinicSuggestTest && (
//           <p><b>Tests:</b> {data.clinicSuggestTest}</p>
//         )}
//       </div>

//       {/* FOOTER */}
//       <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 30 }}>
//         <div style={{ textAlign: "right" }}>
//           <PrescriptionQR prescription={data} />
//           <p style={{ fontSize: 9, color: "#555", marginTop: 6 }}>
//             This is a digitally issued prescription.
//           </p>
//         </div>
//       </div>

//     </div>
//   );
// }

// const cell = {
//   border: "1px solid #000",
//   padding: "6px",
//   fontSize: 13
// };


import { useRef } from "react";
import html2pdf from "html2pdf.js";
import PrescriptionQR from "./PrescriptionQR";

export default function PrescriptionTemplate({ data }) {

  const vitals = data?.healthMetricRequestSetDTO?.metrics;

  // ✅ NEW: ref for PDF
  const pdfRef = useRef();

  // ✅ NEW: auto download function
  const downloadPDF = () => {
    const element = pdfRef.current;

    html2pdf()
      .set({
        margin: 8,
        filename: `Prescription_${data?.clinicPageId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      })
      .from(element)
      .save(); // ⬅ auto download
  };

  return (
    <div
      ref={pdfRef}
      className="md:text-sm text-xs space-y-4"
      style={{ position: "relative", background: "#fff", padding: 20 }}
    >

      {/* ✅ DOWNLOAD BUTTON */}
      <button
        onClick={downloadPDF}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "6px 12px",
          fontSize: 11,
          background: "#18AAB0",
          color: "#fff",
          borderRadius: 6
        }}
      >
        Download
      </button>

      {/* HEADER */}
      <div style={{ borderBottom: "2px solid #18AAB0", paddingBottom: 8 }}>
        <img src="/logo.png" alt="Healthify Logo" style={{ height: 70 }} />
        <p style={{ fontSize: 12 }}>Digital Prescription</p>
      </div>

      {/* DOCTOR INFO */}
      <div>
        <p><b>Doctor:</b> {data.createdDoctor}</p>
        <p><b>SLMC:</b> {data.slmc}</p>
      </div>
        <p><b>Date:</b> {data.pagecreatedDate} {data.pagecreatedTime}</p>
      {/* PATIENT INFO */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p><b>Patient:</b> {data.patientName}</p>
        <p><b>Age:</b> {data.patientAge}</p>
        <p><b>Gender:</b> {data.patientGender}</p>
      </div>

        <p><b>Reason:</b> {data.consultReason || data.subReason}</p>

      {/* {data?.createdAt && (
        <p><b>Date:</b> {data.createdAt}</p>
      )} */}

      {/* VITALS */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {vitals?.BLOOD_PRESSURE_SYSTOLIC !== undefined && (
          <p><b>Blood pressure(mmHg): </b> {vitals.BLOOD_PRESSURE_SYSTOLIC}/{vitals.BLOOD_PRESSURE_DIASTOLIC}</p>
        )}
        {vitals?.HEART_RATE !== undefined && (
          <p><b>Heart Rate(bpm):</b> {vitals.HEART_RATE}</p>
        )}
        {vitals?.TEMPERATURE !== undefined && (
          <p><b>Temperature(°F):</b> {vitals.TEMPERATURE}</p>
        )}
        {vitals?.WEIGHT !== undefined && (
          <p><b>Weight(kg):</b> {vitals.WEIGHT}</p>
        )}
        {vitals?.BLOOD_SUGAR !== undefined && (
          <p><b>Blood Sugar(mg/dL):</b> {vitals.BLOOD_SUGAR}</p>
        )}
        {vitals?.BLOOD_SUGAR !== undefined && (
          <p><b>Cholesterol(mg/dL):</b> {vitals.CHOLESTEROL}</p>
        )}
      </div>
     

      {/* MEDICATION TABLE */}
      {data?.medication?.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
          <thead>
            <tr style={{ background: "#F2FBFA" }}>
              <th style={cell}>Medicine</th>
              <th style={cell}>Dose</th>
              <th style={cell}>Frequency</th>
              <th style={cell}>Duration</th>
              <th style={cell}>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.medication.map((m, i) => (
              <tr key={i}>
                <td style={cell}>{m.drugName}</td>
                <td style={cell}>{m.dosage}</td>
                <td style={cell}>{m.frequency}</td>
                <td style={cell}>{m.duration}</td>
                <td style={cell}>{m.instruction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* NOTES */}
      <div>
        {(data?.clinicExaming ||data?.consultExaming) && (
          <p><b>Examine:</b> {data.clinicExaming || data.consultExaming} </p>
        )}
        {(data?.clinicSuggestTest || data?.consultSuggestTest )  && (
          <p><b>Tests:</b> {data.clinicSuggestTest|| data.consultSuggestTest}</p>
        )}
        {data?.nextClinic&& (
          <p><b>Next Clinic:</b> {data.nextClinic}</p>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 30 }}>
        <div style={{ textAlign: "right" }}>
          <PrescriptionQR prescription={data} />
          <p style={{ fontSize: 9, color: "#555", marginTop: 6 }}>
            This is a digitally issued prescription.
          </p>
        </div>
      </div>

    </div>
  );
}

const cell = {
  border: "1px solid #000",
  padding: "6px",
  fontSize: 13
};