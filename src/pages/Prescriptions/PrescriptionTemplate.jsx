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
import PrescriptionQR from "./PrescriptionQR";
export default function PrescriptionTemplate({ data }) {
  return (
    <div className="md:text-sm text-xs space-y-4">

      {/* HEADER */}
      <div style={{ borderBottom: "2px solid #18AAB0", paddingBottom: 8 }}>
        <img src="logo.png" alt="Healthify Logo" style={{ height: 70 }} />
        
        <p style={{ fontSize: 12 }}>Digital Prescription</p>
      </div>

      {/* DOCTOR INFO */}
      <div>
        <p><b>Doctor:</b> {data.doctor.name}</p>
        <p><b>SLMC:</b> {data.doctor.slmc}</p>
        <p><b>Email:</b> {data.doctor.email}</p>
      </div>

      {/* PATIENT INFO */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p><b>Patient:</b> {data.patient.name}</p>
        <p><b>Age:</b> {data.patient.age}</p>
        <p><b>Gender:</b> {data.patient.gender}</p>
      </div>

      <p><b>Date:</b> {data.createdAt}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p><b>BP:</b> {data.vitals.bp}</p>
        <p><b>Heart Rate:</b> {data.vitals.HeartRate}</p>
        <p><b>Temp:</b> {data.vitals.temp}</p>
        <p><b>Weight:</b> {data.vitals.weight}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        
        <p><b>Blood Sugar:</b> {data.vitals.BloodSugar}</p>
      </div>
      {/* MEDICATION TABLE */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 10
        }}
      >
        <thead>
          <tr style={{ background: "#F2FBFA" }}>
            <th style={cell}>Medicine</th>
            <th style={cell}>Dose</th>
            <th style={cell}>Frequency</th>
            <th style={cell}>Duration</th>
          </tr>
        </thead>
        <tbody>
          {data.medications.map((m, i) => (
            <tr key={i}>
              <td style={cell}>{m.name}</td>
              <td style={cell}>{m.dose}</td>
              <td style={cell}>{m.freq}</td>
              <td style={cell}>{m.days}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* NOTES */}
      <div>
        
        <p><b>Examine:</b> {data.examine}</p>
        <p><b>Tests:</b> {data.tests}</p>
      </div>

      {/* FOOTER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 30,
          alignItems: "flex-end"
        }}
      >
        {/* <div>
          <p>Doctor Signature:</p>
          <p style={{ marginTop: 20 }}>
            __________________________
          </p>
        </div> */}

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
