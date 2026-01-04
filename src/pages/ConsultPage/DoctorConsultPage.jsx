//thathsara
// DoctorConsultPage.jsx (REFACTORED VERSION)
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import reusable card components
import { DoctorNavBar } from "../../components/DoctorNavBar";
import { PatientDetailsCard } from "../../components/DoctorCards/PatientDetailsCard";
import { TodayPageFormCard } from "../../components/DoctorCards/TodayPageFormCard";
import { ExaminationAndTestsCard } from "../../components/DoctorCards/ExaminationAndTestsCard";
import { VitalSignsCard } from "../../components/DoctorCards/VitalSignsCard";
import { AdditionalNotesCard } from "../../components/DoctorCards/AdditionalNotesCard";

/**
 * DOCTOR CONSULT PAGE (REFACTORED)
 * Purpose: Doctor creates consultation record for patient
 * Now uses reusable card components for better maintainability
 */

export default function DoctorConsultPage() {
  const navigate = useNavigate();

  // ==================== MOCK PATIENT DATA ====================
  // In real app: fetch from API using patient ID from route params
  const patientInfo = {
    patientId: "UR234567", // This is NIC
    fullName: "Parindya Hewage",
    age: 23,
    gender: "Female",
    medicationPurpose: "Treat Gastritis",
  };

  // ==================== FORM STATE ====================
  const [formData, setFormData] = useState({
    // Auto-filled
    date: new Date().toISOString().split("T")[0],

    // Doctor fills these
    reasonForVisit: "",
    examinationNotes: "",

    // Vital signs (optional)
    bloodPressure: "",
    pulse: "",
    temperature: "",
    weight: "",
    respiratoryRate: "",

    // Additional fields
    suggestedTests: "",
    doctorNote: "",
    nextClinicDate: "",
  });

  const [errors, setErrors] = useState({});
  const [isCompleting, setIsCompleting] = useState(false);

  // ==================== HANDLERS ====================

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  // Unified change handler for all form fields
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Navigate to patient form page
  const handleMoreAboutPatient = () => {
    navigate("/form");
  };

  // Validate required fields
  const validate = () => {
    const newErrors = {};

    if (!formData.reasonForVisit.trim()) {
      newErrors.reasonForVisit = "Reason for visit is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Complete and save consultation
  const handleComplete = async () => {
    if (!validate()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsCompleting(true);

    // ==================== SIMULATE API SAVE ====================
    const consultationRecord = {
      patientId: patientInfo.patientId,
      consultationDate: formData.date,
      timestamp: new Date().toISOString(),
      patientDetails: patientInfo,
      consultation: formData,
      doctorId: "DR123", // From session/auth
      status: "completed",
      folder: "consult", // Saved in patient's consult folder
    };

    // Simulate API delay
    setTimeout(() => {
      console.log(
        "✅ Consultation saved to patient Consult folder:",
        consultationRecord,
      );

      alert(
        `✅ Consultation completed and saved!\n\nPatient: ${patientInfo.fullName}\nDate: ${formData.date}\n\nThis page is now locked and saved in patient's Consult folder.`,
      );

      setIsCompleting(false);
      navigate("/patient-dashboard");
    }, 1500);
  };

  // ==================== RENDER ====================
  return (
    <>
      <DoctorNavBar
        patientData={patientInfo}
        doctorData={{
          fullName: "Dr. Samantha Silva",
          email: "doctor@hospital.com",
        }}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-mainblack mb-6">
            Consultation Page
          </h1>

          {/* ========== GRID LAYOUT: 2 COLUMNS ========== */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* LEFT COLUMN: Patient Info */}
            <PatientDetailsCard
              patientInfo={patientInfo}
              onMoreAboutPatient={handleMoreAboutPatient}
              showMedicationPurpose={true}
            />

            {/* RIGHT COLUMN: Today Page Form */}
            <TodayPageFormCard
              formData={formData}
              onChange={handleChange}
              errors={errors}
            />
          </div>

          {/* ========== EXAMINATION & TESTS (Full Width) ========== */}
          <div className="mt-6">
            <ExaminationAndTestsCard
              formData={formData}
              onChange={handleChange}
            />
          </div>

          {/* ========== VITAL SIGNS (Full Width) ========== */}
          <div className="mt-6">
            <VitalSignsCard formData={formData} onChange={handleChange} />
          </div>

          {/* ========== ADDITIONAL NOTES (Full Width) ========== */}
          <div className="mt-6">
            <AdditionalNotesCard formData={formData} onChange={handleChange} />
          </div>

          {/* ========== COMPLETE BUTTON ========== */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className="px-8 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCompleting ? "Completing..." : "Complete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
