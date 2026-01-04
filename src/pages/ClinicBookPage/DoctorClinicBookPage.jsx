//thathsara
// DoctorClinicBookPage.jsx (REFACTORED VERSION)
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import reusable card components
import { DoctorNavBar } from "../../components/DoctorNavBar";
import { PatientDetailsCard } from "../../components/DoctorCards/PatientDetailsCard";
import { TodayPageFormCard } from "../../components/DoctorCards/TodayPageFormCard";
import { ExaminationAndTestsCard } from "../../components/DoctorCards/ExaminationAndTestsCard";
import { VitalSignsCard } from "../../components/DoctorCards/VitalSignsCard";
import { MedicationCard } from "../../components/DoctorCards/MedicationCard";
import { PastClinicPagesCard } from "../../components/DoctorCards/PastClinicPagesCard";

/**
 * DOCTOR CLINIC BOOK PAGE (REFACTORED)
 * Purpose: Doctor creates clinic book entries for ongoing patient treatment
 * Now uses reusable card components shared with Consult Page
 */

export default function DoctorClinicBookPage() {
  const navigate = useNavigate();

  // ==================== MOCK PATIENT DATA ====================
  const patientInfo = {
    patientId: "UR5678",
    fullName: "Parindya Hewage",
    age: 23,
    gender: "Female",
  };

  // ==================== MOCK PAST CLINIC PAGES ====================
  const [pastPages] = useState([
    {
      id: 1,
      date: "2025-09-23",
      time: "10:08AM",
      reason: "Follow-up gastritis treatment",
    },
    {
      id: 2,
      date: "2025-08-21",
      time: "10:08AM",
      reason: "Initial consultation for stomach pain",
    },
    {
      id: 3,
      date: "2025-08-23",
      time: "10:08AM",
      reason: "Medication adjustment",
    },
    {
      id: 4,
      date: "2025-09-23",
      time: "10:00AM",
      reason: "Medication adjustment",
    },
  ]);

  // ==================== FORM STATE ====================
  const [formData, setFormData] = useState({
    // Auto-filled
    date: new Date().toISOString().split("T")[0],

    // Doctor fills
    reasonForVisit: "",
    examinationNotes: "",

    // Vital signs (optional)
    bloodPressure: "",
    pulse: "",
    temperature: "",
    weight: "",
    respiratoryRate: "",

    // Medication section
    medication: "",
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

  // Unified change handler
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleMoreAboutPatient = () => {
    navigate("/form");
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.reasonForVisit.trim()) {
      newErrors.reasonForVisit = "Reason for visit is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Complete and save clinic book page
  const handleComplete = async () => {
    if (!validate()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsCompleting(true);

    // ==================== SIMULATE API SAVE ====================
    const clinicBookPage = {
      patientId: patientInfo.patientId,
      clinicBookId: "CB001", // ID of the clinic book this page belongs to
      pageDate: formData.date,
      timestamp: new Date().toISOString(),
      patientDetails: patientInfo,
      pageData: formData,
      doctorId: "DR123",
      status: "completed",
      folder: "clinic-book", // Saved in patient's clinic book folder
    };

    setTimeout(() => {
      console.log("✅ Clinic Book Page saved:", clinicBookPage);

      alert(
        `✅ Clinic Book Page completed and saved!\n\nPatient: ${patientInfo.fullName}\nDate: ${formData.date}\n\nThis page is now locked and saved in patient's Clinic Book folder.`,
      );

      setIsCompleting(false);
      navigate("/patient-dashboard");
    }, 1500);
  };

  // ==================== RENDER ====================
  return (
    <>
      {/* ← ADD THE NAVBAR HERE */}
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
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-mainblack mb-6">
            Clinic Book Page
          </h1>

          {/* ========== GRID LAYOUT: 3 COLUMNS ========== */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* ========== LEFT COLUMN: PATIENT INFO & PAST PAGES ========== */}
            <div className="space-y-6">
              {/* Patient Details Card */}
              <PatientDetailsCard
                patientInfo={patientInfo}
                onMoreAboutPatient={handleMoreAboutPatient}
                showMedicationPurpose={false}
              />

              {/* Past Clinic Pages Card */}
              <PastClinicPagesCard pastPages={pastPages} />
            </div>

            {/* ========== MIDDLE & RIGHT COLUMNS: FORMS ========== */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today Page Form (Date + Reason) */}
              <TodayPageFormCard
                formData={formData}
                onChange={handleChange}
                errors={errors}
              />

              {/* Examination & Tests */}
              <ExaminationAndTestsCard
                formData={formData}
                onChange={handleChange}
              />

              {/* Vital Signs */}
              <VitalSignsCard formData={formData} onChange={handleChange} />

              {/* Medication Section */}
              <MedicationCard formData={formData} onChange={handleChange} />

              {/* Complete Button */}
              <div className="flex justify-end">
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
        </div>
      </div>
    </>
  );
}
