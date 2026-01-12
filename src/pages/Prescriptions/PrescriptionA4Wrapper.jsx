export default function PrescriptionA4Wrapper({ children }) {
  return (
    <div
      id="prescription-pdf"
      style={{
        width: "210mm",
        minHeight: "267mm",
        padding: "15mm",
        backgroundColor: "#ffffff",
        color: "#000000",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {children}
    </div>
  );
}