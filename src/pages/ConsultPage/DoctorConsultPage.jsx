import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { PatientDetailsCard } from "../../components/DoctorCards/PatientDetailsCard";
import { TodayPageFormCard } from "../../components/DoctorCards/TodayPageFormCard";
import { ExaminationAndTestsCard } from "../../components/DoctorCards/ExaminationAndTestsCard";
import { VitalSignsCard } from "../../components/DoctorCards/VitalSignsCard";
import { AdditionalNotesCard } from "../../components/DoctorCards/AdditionalNotesCard";
import { MedicationCard } from "../../components/DoctorCards/MedicationCard";
import { createConsultPage } from "../../api/ConsultationApi";
import { getDisplayName } from "../../utils/nameUtils";

const initialFormData = () => ({
  date: new Date().toISOString().split("T")[0],
  reasonForVisit: "",
  clinicExaming: "",
  clinicSuggestTest: "",
  clinicDoctorNote: "",
  nextClinic: "",
  medication: [],
  mediMessure: {
    BP: "",
    pulse: "",
    temperature: "",
    weight: "",
    bloodSugar: "",
    cholesterol: "",
  },
});

export default function DoctorConsultPage() {
  const navigate = useNavigate();
  const { patientId } = useParams();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    message: "",
    confirm: false,
    onConfirm: null,
  });

  const patientInfo = {
    id: patientId,
    patientId: patientId || "UR234567",
    fullName: "Parindya Hewage",
    email: "parindya@gmail.com",
    age: 23,
    gender: "Female",
  };

  const patientDisplayName = getDisplayName(patientInfo);

  const showMessage = (message) => {
    setModal({
      open: true,
      message,
      confirm: false,
      onConfirm: null,
    });
  };

  const showConfirm = (message, callback) => {
    setModal({
      open: true,
      message,
      confirm: true,
      onConfirm: callback,
    });
  };

  const closeModal = () => {
    setModal({
      open: false,
      message: "",
      confirm: false,
      onConfirm: null,
    });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleVitalChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      mediMessure: {
        ...prev.mediMessure,
        [field]: value,
      },
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.reasonForVisit.trim()) {
      nextErrors.reasonForVisit = "Reason for visit is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildMetrics = () => {
    const metrics = {};
    const vitalSigns = formData.mediMessure || {};

    if (vitalSigns.BP && vitalSigns.BP.includes("/")) {
      const [systolic, diastolic] = vitalSigns.BP.split("/");
      const systolicValue = Number(systolic);
      const diastolicValue = Number(diastolic);

      if (Number.isFinite(systolicValue)) {
        metrics.BLOOD_PRESSURE_SYSTOLIC = systolicValue;
      }

      if (Number.isFinite(diastolicValue)) {
        metrics.BLOOD_PRESSURE_DIASTOLIC = diastolicValue;
      }
    }

    const metricMap = {
      pulse: "HEART_RATE",
      temperature: "TEMPERATURE",
      weight: "WEIGHT",
      bloodSugar: "BLOOD_SUGAR",
      cholesterol: "CHOLESTEROL",
    };

    Object.entries(metricMap).forEach(([formKey, apiKey]) => {
      const value = Number(vitalSigns[formKey]);
      if (Number.isFinite(value)) {
        metrics[apiKey] = value;
      }
    });

    return metrics;
  };

  const handleComplete = async () => {
    if (!validate()) {
      showMessage("Please fill required fields.");
      return;
    }

    showConfirm(
      "Are you sure you want to save this consultation?",
      async () => {
        try {
          setIsCompleting(true);

          const requestBody = {
            consultReason: formData.reasonForVisit,
            consultExaming: formData.clinicExaming,
            consultSuggestTest: formData.clinicSuggestTest,
            consultDoctorNote: formData.clinicDoctorNote,
            nextConsultationDate: formData.nextClinic || undefined,
            medications: formData.medication.map((med) => ({
              drugName: med.medicine,
              dosage: med.dose,
              frequency:
                med.frequency === "OTHER"
                  ? med.customFrequency || ""
                  : med.frequency,
              duration: med.duration,
              instruction: med.timing,
            })),
          };

          const metrics = buildMetrics();
          if (Object.keys(metrics).length > 0) {
            requestBody.healthMetrics = metrics;
          }

          await createConsultPage(patientId, requestBody);

          setIsCompleted(true);
          toast.success(`Consultation saved for ${patientDisplayName}.`);
        } catch (error) {
          const message =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Error saving consultation";
          showMessage(message);
        } finally {
          setIsCompleting(false);
        }
      }
    );
  };

  const handleClearAll = () => {
    showConfirm("Are you sure you want to clear all fields?", () => {
      setFormData(initialFormData());
      setErrors({});
    });
  };

  const handleCreateNewPage = () => {
    setFormData(initialFormData());
    setErrors({});
    setIsCompleted(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-mainblack mb-6">
            Consultation Page
          </h1>

          <div className="grid lg:grid-cols-2 gap-6">
            <PatientDetailsCard
              patientInfo={patientInfo}
              onMoreAboutPatient={() =>
                navigate(`/doctor/${patientId}/doctorViewform`)
              }
            />

            <TodayPageFormCard
              formData={formData}
              onChange={handleChange}
              errors={errors}
            />
          </div>

          <div className="mt-6">
            <ExaminationAndTestsCard
              formData={formData}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            <VitalSignsCard
              formData={formData}
              onChange={handleVitalChange}
            />
          </div>

          <div className="mt-6">
            <AdditionalNotesCard
              formData={formData}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            <MedicationCard formData={formData} onChange={handleChange} />
          </div>

          <div className="flex justify-between items-center mt-6">
            {!isCompleted && (
              <button
                onClick={handleClearAll}
                className="px-6 py-3 bg-gray-400 text-white rounded-lg"
              >
                Clear All
              </button>
            )}

            {isCompleted && (
              <button
                onClick={handleCreateNewPage}
                className="px-8 py-3 bg-secondary text-white rounded-lg"
              >
                New Page
              </button>
            )}

            {!isCompleted && (
              <button
                onClick={handleComplete}
                disabled={isCompleting}
                className="px-8 py-3 bg-secondary text-white rounded-lg disabled:opacity-50"
              >
                {isCompleting ? "Completing..." : "Complete"}
              </button>
            )}
          </div>
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 text-center">
            <p className="text-gray-800 text-lg mb-6">{modal.message}</p>

            {modal.confirm ? (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    modal.onConfirm?.();
                    closeModal();
                  }}
                  className="px-6 py-2 bg-secondary text-white rounded-lg"
                >
                  Yes
                </button>

                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gray-300 rounded-lg"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-secondary text-white rounded-lg"
              >
                OK
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
