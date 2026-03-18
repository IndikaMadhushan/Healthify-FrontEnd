
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import PrescriptionQR from "../../Prescriptions/PrescriptionQR";

export default function BookTemplate({ data }) {

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
    style={{
      position: "relative",
      background: "#fff",
      padding: 20,
      fontFamily: "Arial, sans-serif",
      color: "#030303"
    }}
  >

    

    {/* HEADER */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "2px solid #18AAB0",
      paddingBottom: 10,
      marginBottom: 10
    }}>
      

      <div style={{ textAlign: "left", fontSize: 10 }}>
        <p><b>Date:</b> {data.pagecreatedDate}</p>
        <p><b>Time:</b> {data.pagecreatedTime}</p>
      </div>
    </div>

    {/* DOCTOR + PATIENT CARD */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      background: "#F8FAFB",
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
      fontSize: 12
    }}>
      <div>
        <p><b>Doctor:</b> Dr.{data.createdDoctor}</p>
        <p><b>SLMC:</b> {data.slmc}</p>
      </div>

      
      <div style={{
      marginBottom: 10,
      padding: 5,
      background: "#FFF",
      borderLeft: "4px solid #18AAB0",
      fontSize: 13
     }}>
            <p><b>Reason:</b> {data.consultReason || data.subReason}</p>
    </div>

    </div>

    

    {/* VITALS */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 8,
      background: "#F9FDFD",
      padding: 10,
      borderRadius: 8,
      marginBottom: 10,
      fontSize: 12
    }}>
      {vitals?.BLOOD_PRESSURE_SYSTOLIC !== undefined && (
        <p><b>BP:</b> {vitals.BLOOD_PRESSURE_SYSTOLIC}/{vitals.BLOOD_PRESSURE_DIASTOLIC}</p>
      )}
      {vitals?.HEART_RATE !== undefined && (
        <p><b>Heart Rate:</b> {vitals.HEART_RATE}</p>
      )}
      {vitals?.TEMPERATURE !== undefined && (
        <p><b>Temp:</b> {vitals.TEMPERATURE}</p>
      )}
      {vitals?.WEIGHT !== undefined && (
        <p><b>Weight:</b> {vitals.WEIGHT}</p>
      )}
      {vitals?.BLOOD_SUGAR !== undefined && (
        <p><b>Sugar:</b> {vitals.BLOOD_SUGAR}</p>
      )}
      {vitals?.CHOLESTEROL !== undefined && (
        <p><b>Cholesterol:</b> {vitals.CHOLESTEROL}</p>
      )}
    </div>

    {/* MEDICATION */}
    {data?.medication?.length > 0 && (
      <div style={{ marginBottom: 10 }}>
        
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 12
        }}>
          <thead>
            <tr style={{background: "#F2FBFA" , color: "#3d3b3b" }}>
              <th style={cell}>Medicine</th>
              <th style={cell}>Dose</th>
              <th style={cell}>Frequency</th>
              <th style={cell}>Duration</th>
              <th style={cell}>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.medication.map((m, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#F9F9F9" : "#fff" }}>
                <td style={cell}>{m.drugName}</td>
                <td style={cell}>{m.dosage}</td>
                <td style={cell}>{m.frequency}</td>
                <td style={cell}>{m.duration}</td>
                <td style={cell}>{m.instruction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {/* NOTES */}
    <div style={{
      background: "#FFF",
      padding: 10,
      borderRadius: 8,
      marginBottom: 10
    }}>
      {(data?.clinicExaming || data?.consultExaming) && (
        <p><b>Examine:</b> {data.clinicExaming || data.consultExaming}</p>
      )}
      {(data?.clinicSuggestTest || data?.consultSuggestTest) && (
        <p><b>Tests:</b> {data.clinicSuggestTest || data.consultSuggestTest}</p>
      )}
      {data?.nextClinic && (
        <p><b>Next Clinic:</b> {data.nextClinic}</p>
      )}
    </div>

   

  </div>
);
}

const cell = {
  border: "1px solid #000",
  padding: "6px",
  fontSize: 13
};