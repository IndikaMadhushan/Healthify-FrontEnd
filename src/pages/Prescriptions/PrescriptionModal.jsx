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

import { useRef } from "react";
import html2pdf from "html2pdf.js";
import PrescriptionTemplate from "./PrescriptionTemplate";
import PrescriptionA4Wrapper from "./PrescriptionA4Wrapper";

export default function PrescriptionModal({ data, onClose }) {
  const pdfRef = useRef(null);

  const downloadPDF = async () => {
    if (!pdfRef.current) return;

    // IMPORTANT: wait for QR + layout to render
    await new Promise((res) => setTimeout(res, 300));

    html2pdf()
      .set({
        margin: 0,
        filename: `Prescription_${data.id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff"
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      })
      .from(pdfRef.current)
      .save();
  };

  return (
    <>
      {/* ===== MODAL UI ===== */}
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl">

          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="font-semibold text-lg text-[#0F4F52]">
              Prescription
            </h2>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={downloadPDF}
                className="px-4 py-2 bg-[#18AAB0] text-white rounded-lg text-sm"
              >
                Download PDF
              </button>

              <button
                type="button"
                onClick={onClose}
                className="text-xl"
              >
                ×
              </button>
            </div>
          </div>

          {/* PREVIEW (OPTIONAL – can keep or remove) */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <PrescriptionTemplate data={data} />
          </div>

          
        </div>
      </div>

      {/* ===== PDF SOURCE (ONLY ONE SOURCE) ===== */}
      <div
        style={{
          position: "fixed",
          left: "-10000px",
          top: 0,
          background: "#fff"
        }}
      >
        <div ref={pdfRef}>
          <PrescriptionA4Wrapper>
            <PrescriptionTemplate data={data} />
          </PrescriptionA4Wrapper>
        </div>
      </div>
    </>
  );
}