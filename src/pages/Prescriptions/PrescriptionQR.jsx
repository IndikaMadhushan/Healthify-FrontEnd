// import { QRCodeCanvas } from "qrcode.react";

// export default function PrescriptionQR({ prescription }) {
//   const qrPayload = JSON.stringify({
//     prescriptionId: prescription.id,
//     doctorSLMC: prescription.doctor.slmc,
//     doctorName: prescription.doctor.name,
//     issuedAt: prescription.createdAt
//   });

//   return (
//     <div style={{ textAlign: "center" }}>
//       <QRCodeCanvas
//         value={qrPayload}
//         size={60}
//         level="H"
//         includeMargin
//       />
//       <p style={{ fontSize: 10, marginTop: 4 }}>
//         Scan to verify prescription
//       </p>
//     </div>
//   );
// }

// import { QRCodeCanvas } from "qrcode.react";

// export default function PrescriptionQR({ prescription }) {
//   // frontend-only verification URL
//   const verifyUrl = `${window.location.origin}/verify/${prescription.id}`;

//   return (
//     <div style={{ textAlign: "center" }}>
//       <QRCodeCanvas
//         value={verifyUrl}
//         size={60}          // small & professional
//         level="H"
//         includeMargin={false}
//       />
//       <p style={{ fontSize: 9, color: "#555" }}>
//         Scan to verify
//       </p>
//     </div>
//   );
// }

import { QRCodeCanvas } from "qrcode.react";

export default function PrescriptionQR({ prescription }) {
  const verifyUrl = `${window.location.origin}/verify/${prescription.id}`;

  return (
    <div style={{ textAlign: "start", maxWidth: 190 }}>
      <QRCodeCanvas
        value={verifyUrl}
        size={45}          // small professional size
        level="H"
         includeMargin={false}
      />

      <p style={{ fontSize: 9, color: "#444" }}>
        Scan to verify
      </p>

      {/* Verification URL */}
      <a
        href={verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: 9,
          color: "#18AAB0",
          wordBreak: "break-all",
          textDecoration: "underline"
        }}
      >
        {verifyUrl}
      </a>
    </div>
  );
}