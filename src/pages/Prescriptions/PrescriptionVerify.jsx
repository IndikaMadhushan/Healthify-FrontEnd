import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClinicPageById } from "../../api/ClinicPageApi";
import { getConsultPageById } from "../../api/ConsultationApi";

function normalizePrescription(data, type) {
  if (!data) return null;

  if (type === "CONSULT") {
    return {
      id: data.consultId,
      reason: data.consultReason || data.subReason,
      medication: data.medications || data.medication || [],
    };
  }

  return {
    id: data.clinicPageId,
    reason: data.subReason || data.consultReason,
    medication: data.medication || data.medications || [],
  };
}

export default function PrescriptionVerify() {
  const { clinicPageId, consultId } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPrescription = async () => {
      if (!clinicPageId && !consultId) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(false);

        if (clinicPageId) {
          const res = await getClinicPageById(clinicPageId);
          setPrescription(normalizePrescription(res.data.data, "CLINIC"));
          return;
        }

        if (consultId) {
          const res = await getConsultPageById(consultId);
          setPrescription(normalizePrescription(res.data.data, "CONSULT"));
        }
      } catch (err) {
        console.error("Verification failed", err);
        setError(true);
        setPrescription(null);
      } finally {
        setLoading(false);
      }
    };

    loadPrescription();
  }, [clinicPageId, consultId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="rounded-2xl bg-white px-8 py-6 text-center shadow">
          <p className="text-gray-600">Verifying prescription...</p>
        </div>
      </div>
    );
  }

  if (error || !prescription) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <h2 className="text-xl font-bold text-red-600">
            Invalid Prescription
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            This prescription could not be verified.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 border-b pb-4 mb-4">
          <span className="text-2xl text-green-600">✓</span>
          <div>
            <h2 className="text-lg font-semibold text-green-700">
              Valid Prescription
            </h2>
            <p className="text-xs text-gray-500">
              Digitally verified by Healthify
            </p>
          </div>
        </div>

        <section className="mb-4 text-sm">
          <p>
            <b>Prescription ID:</b> {prescription.id}
          </p>
          <p>
            <b>Reason:</b> {prescription.reason || "N/A"}
          </p>
        </section>

        {prescription.medication?.length > 0 && (
          <section className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              Prescribed Medicines
            </h3>
            <div className="overflow-x-auto">
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
                  {prescription.medication.map((item, index) => (
                    <tr key={index}>
                      <td className="border p-2">{item.drugName || "N/A"}</td>
                      <td className="border p-2">{item.dosage || "N/A"}</td>
                      <td className="border p-2">{item.frequency || "N/A"}</td>
                      <td className="border p-2">{item.duration || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <div className="text-xs text-gray-500 border-t pt-3">
          This is a digitally issued prescription.
        </div>
      </div>
    </div>
  );
}
