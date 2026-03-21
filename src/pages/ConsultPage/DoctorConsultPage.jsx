import { useState } from "react";
import toast from "react-hot-toast";
import {
  FiCheckCircle,
  FiClipboard,
  FiEdit3,
  FiFileText,
  FiRefreshCw,
  FiSave,
  FiTrash2,
} from "react-icons/fi";
import { useParams } from "react-router-dom";

import { AdditionalNotesCard } from "../../components/DoctorCards/AdditionalNotesCard";
import { ExaminationAndTestsCard } from "../../components/DoctorCards/ExaminationAndTestsCard";
import { MedicationCard } from "../../components/DoctorCards/MedicationCard";
import { TodayPageFormCard } from "../../components/DoctorCards/TodayPageFormCard";
import { VitalSignsCard } from "../../components/DoctorCards/VitalSignsCard";
import ProfileAvatar from "../../components/ProfileAvatar";
import { createConsultPage } from "../../api/ConsultationApi";
import { getDisplayName, getInitial } from "../../utils/nameUtils";

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

function getStoredSelectedPatient(patientId) {
  const storedPatientRaw = localStorage.getItem("selectedPatient");

  if (!storedPatientRaw) {
    return null;
  }

  try {
    const storedPatient = JSON.parse(storedPatientRaw);

    if (
      String(storedPatient?.id) === String(patientId) ||
      String(storedPatient?.patientId) === String(patientId)
    ) {
      return storedPatient;
    }
  } catch (error) {
    console.error("Failed to parse selected patient for consultation", error);
  }

  return null;
}

export default function DoctorConsultPage() {
  const { patientId } = useParams();
  const selectedPatient = getStoredSelectedPatient(patientId);

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

  const patientInfo = selectedPatient || {
    id: patientId,
    patientId: patientId || "UR234567",
    fullName: patientId ? `Patient #${patientId}` : "Selected Patient",
    email: "Email not available",
    age: "Not added",
    gender: "Not added",
  };

  const patientDisplayName = getDisplayName(patientInfo);
  const patientPhotoUrl = patientInfo.photoUrl || patientInfo.profilePic || "";
  const completedFieldCount = [
    formData.reasonForVisit.trim(),
    formData.clinicExaming.trim(),
    formData.clinicSuggestTest.trim(),
    formData.clinicDoctorNote.trim(),
    formData.nextClinic,
    formData.medication.length > 0,
    Object.values(formData.mediMessure || {}).some(Boolean),
  ].filter(Boolean).length;
  const patientSummary = [
    {
      label: "Patient ID",
      value: patientInfo.patientId || patientInfo.id || "Not added",
    },
    {
      label: "Age",
      value: patientInfo.age || "Not added",
    },
    {
      label: "Gender",
      value: patientInfo.gender || "Not added",
    },
    {
      label: "Draft Status",
      value: isCompleted ? "Saved" : "In Progress",
    },
  ];

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
      showMessage("Please fill in the required consultation details.");
      return;
    }

    showConfirm(
      "Save this consultation? Once submitted, it cannot be edited or deleted later.",
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
      },
    );
  };

  const handleClearAll = () => {
    showConfirm("Clear all unsaved consultation fields?", () => {
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
      <div className="min-h-screen bg-[#F6FBFA] py-6">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,_rgba(24,170,176,0.18),_transparent_52%),radial-gradient(circle_at_top_right,_rgba(15,79,82,0.14),_transparent_44%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#0F4F52] via-secondary to-primary px-6 py-8 text-white shadow-[0_28px_70px_rgba(24,170,176,0.24)] sm:px-8 lg:px-10">
            <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-[28px] border-4 border-white/20 shadow-[0_16px_36px_rgba(15,79,82,0.24)]">
                  <ProfileAvatar
                    src={patientPhotoUrl}
                    alt={patientDisplayName || "Patient"}
                    className="h-full w-full"
                    imageClassName="h-full w-full object-cover"
                    fallbackClassName="bg-white/15 text-3xl font-bold text-white"
                    fallbackIcon={<span>{getInitial(patientInfo)}</span>}
                  />
                </div>

                <div>
                  {/* <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                    Consultation Workspace
                  </p> */}
                  <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    {patientDisplayName}
                  </h1>
                  {/* <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                    Complete the current consultation with structured clinical
                    notes, vitals, medications, and follow-up instructions.
                  </p> */}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:w-[440px]">
                {patientSummary.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-6">
            <TodayPageFormCard
              formData={formData}
              onChange={handleChange}
              errors={errors}
            />
          </div>

          <div className="mt-8">
            <SectionHeading
              icon={<FiClipboard className="text-xl" />}
              eyebrow="Clinical Review"
              title="Assessment and Measurements"
              description="Document the examination findings and capture key vital signs in the same workspace."
            />

            <div className="mt-4 grid gap-6 xl:grid-cols-12">
              <div className="xl:col-span-7">
                <ExaminationAndTestsCard
                  formData={formData}
                  onChange={handleChange}
                />
              </div>
              <div className="xl:col-span-5">
                <VitalSignsCard
                  formData={formData}
                  onChange={handleVitalChange}
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <SectionHeading
              icon={<FiFileText className="text-xl" />}
              eyebrow="Treatment Plan"
              title="Notes, Follow-Up, and Medication"
              description="Capture recommendations, next steps, and the medication plan before completing the consultation."
            />

            <div className="mt-4 grid gap-6">
              <AdditionalNotesCard
                formData={formData}
                onChange={handleChange}
              />
              <MedicationCard formData={formData} onChange={handleChange} />
            </div>
          </div>

          <div className="sticky bottom-4 z-20 mt-8">
            <div className="rounded-[28px] border border-[#DCEFED] bg-white/90 p-4 shadow-[0_22px_58px_rgba(15,79,82,0.12)] backdrop-blur-xl sm:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                      isCompleted
                        ? "bg-[#EAF7F1] text-[#13966A]"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {isCompleted ? (
                      <FiCheckCircle className="text-xl" />
                    ) : (
                      <FiEdit3 className="text-xl" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B8A8C]">
                      Consultation Status
                    </p>
                    <p className="mt-1 text-lg font-semibold text-[#0F4F52]">
                      {isCompleted
                        ? "Consultation saved successfully"
                        : `${completedFieldCount} of 7 sections completed`}
                    </p>
                    <p className="mt-1 text-sm text-[#5D7B7D]">
                      {isCompleted
                        ? "You can start a new consultation page for this patient."
                        : "Finish the consultation draft and review the required details before saving."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  {!isCompleted && (
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#DCEFED] bg-white px-5 py-3 text-sm font-semibold text-[#5D7B7D] transition hover:border-[#BFDCD8] hover:bg-[#F7FCFB]"
                    >
                      <FiTrash2 className="text-base" />
                      Clear All
                    </button>
                  )}

                  {isCompleted && (
                    <button
                      type="button"
                      onClick={handleCreateNewPage}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-secondary to-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(24,170,176,0.20)] transition hover:translate-y-[-1px] hover:opacity-95"
                    >
                      <FiRefreshCw className="text-base" />
                      New Page
                    </button>
                  )}

                  {!isCompleted && (
                    <button
                      type="button"
                      onClick={handleComplete}
                      disabled={isCompleting}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-secondary to-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(24,170,176,0.20)] transition hover:translate-y-[-1px] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <FiSave className="text-base" />
                      {isCompleting ? "Saving..." : "Save Consultation"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F20]/45 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-[#DCEFED] bg-white p-6 shadow-[0_30px_80px_rgba(15,79,82,0.20)] sm:p-7">
            <div className="absolute -right-8 top-0 h-24 w-24 rounded-full bg-secondary/10 blur-3xl" />
            <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                {modal.confirm ? (
                  <FiClipboard className="text-xl" />
                ) : (
                  <FiCheckCircle className="text-xl" />
                )}
              </div>

              <p className="mt-5 text-lg font-semibold leading-8 text-[#0F4F52]">
                {modal.message}
              </p>

              {modal.confirm ? (
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-2xl border border-[#DCEFED] bg-white px-5 py-3 text-sm font-semibold text-[#5D7B7D] transition hover:bg-[#F7FCFB]"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      modal.onConfirm?.();
                      closeModal();
                    }}
                    className="rounded-2xl bg-gradient-to-r from-secondary to-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(24,170,176,0.20)] transition hover:opacity-95"
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-2xl bg-gradient-to-r from-secondary to-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(24,170,176,0.20)] transition hover:opacity-95"
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SectionHeading({ icon, eyebrow, title, description }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0F4F52]">
            {title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#5D7B7D]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
