import { QRCodeCanvas } from "qrcode.react";

export default function PrescriptionQR({ prescription }) {
  const clinicPageId = prescription?.clinicPageId;
  const consultId = prescription?.consultId;
  const frontendBaseUrl = (
    import.meta.env.VITE_APP_BASE_URL || "https://healthify.dev"
  ).replace(/\/+$/, "");

  let verifyUrl = "";

  if (clinicPageId) {
    verifyUrl = `${frontendBaseUrl}/verify/clinic/${clinicPageId}`;
  } else if (consultId) {
    verifyUrl = `${frontendBaseUrl}/verify/consult/${consultId}`;
  }

  if (!verifyUrl) return null;

  return (
    <div style={{ textAlign: "start", maxWidth: 190 }}>
      <QRCodeCanvas
        value={verifyUrl}
        size={60}
        level="H"
        includeMargin={false}
      />

      <p style={{ fontSize: 9, color: "#444" }}>Scan to verify</p>

      <a
        href={verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: 10,
          color: "#18AAB0",
          wordBreak: "break-all",
          textDecoration: "underline",
        }}
      >
        {verifyUrl}
      </a>
    </div>
  );
}
