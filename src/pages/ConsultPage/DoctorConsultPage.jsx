// thathsara
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DoctorNavBar } from "../../components/DoctorNavBar";
import { PatientDetailsCard } from "../../components/DoctorCards/PatientDetailsCard";
import { TodayPageFormCard } from "../../components/DoctorCards/TodayPageFormCard";
import { ExaminationAndTestsCard } from "../../components/DoctorCards/ExaminationAndTestsCard";
import { VitalSignsCard } from "../../components/DoctorCards/VitalSignsCard";
import { AdditionalNotesCard } from "../../components/DoctorCards/AdditionalNotesCard";
import { MedicationCard } from "../../components/DoctorCards/MedicationCard";

export default function DoctorConsultPage() {
  const navigate = useNavigate();
  const { patientId } = useParams();

  // ==================== MOCK PATIENT DATA ====================
  const patientInfo = {
    patientId: patientId || "UR234567",
    fullName: "Parindya Hewage",
    email: "parindya@gmail.com", // For email notifications
    age: 23,
    gender: "Female",
    medicationPurpose: "Treat Gastritis",
  };

  // ==================== STATE ====================
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    reasonForVisit: "",
    examinationNotes: "",
    bloodPressure: "",
    pulse: "",
    temperature: "",
    weight: "",
    respiratoryRate: "",
    suggestedTests: "",
    doctorNote: "",
    nextClinicDate: "",
    medication: "",
  });

  const [errors, setErrors] = useState({});
  const [isCompleting, setIsCompleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // ==================== TIME-BASED EDITING STATE ====================
  const [isCompleted, setIsCompleted] = useState(false); // Has doctor completed the page?
  const [completionTime, setCompletionTime] = useState(null); // When was it completed?
  const [remainingTime, setRemainingTime] = useState(null); // Time left to edit (in seconds)
  const [canEdit, setCanEdit] = useState(false); // Can doctor edit right now?

  const EDIT_WINDOW_MINUTES = 10; // Edit window duration
  const EDIT_WINDOW_SECONDS = EDIT_WINDOW_MINUTES * 60; // 600 seconds

  // ==================== TIMER EFFECT ====================
  /**
   * Countdown timer after completion
   * Updates every second to show remaining time
   * Disables Update/Delete buttons after 10 minutes
   */
  useEffect(() => {
    if (!isCompleted || !completionTime) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = Math.floor((now - completionTime) / 1000); // seconds elapsed
      const remaining = EDIT_WINDOW_SECONDS - elapsed;

      if (remaining <= 0) {
        // Time's up!
        setRemainingTime(0);
        setCanEdit(false);
        clearInterval(timer);
      } else {
        setRemainingTime(remaining);
        setCanEdit(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompleted, completionTime]);

  // ==================== HELPER FUNCTIONS ====================

  // Format remaining time as MM:SS
  const formatTime = (seconds) => {
    if (!seconds || seconds <= 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ==================== HANDLERS ====================

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleMoreAboutPatient = () => {
    navigate("/form");
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.reasonForVisit.trim()) {
      newErrors.reasonForVisit = "Reason for visit is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==================== COMPLETE HANDLER ====================
  /**
   * COMPLETE: Save consultation to patient's folder
   * - Marks page as completed
   * - Records completion timestamp
   * - Starts 10-minute edit window
   * - Page saved to patient's "Consult" folder
   */
  const handleComplete = async () => {
    if (!validate()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsCompleting(true);

    const completionTimestamp = Date.now();

    const consultationRecord = {
      id: `CONSULT_${Date.now()}`, // Unique ID for this consultation
      patientId: patientInfo.patientId,
      consultationDate: formData.date,
      completedAt: new Date(completionTimestamp).toISOString(),
      patientDetails: patientInfo,
      consultation: formData,
      doctorId: "DR123",
      status: "completed",
      folder: "consult",
      editWindow: {
        expiresAt: new Date(
          completionTimestamp + EDIT_WINDOW_SECONDS * 1000,
        ).toISOString(),
        durationMinutes: EDIT_WINDOW_MINUTES,
      },
    };

    // ==================== SIMULATE API SAVE ====================
    setTimeout(() => {
      console.log(
        "✅ Consultation completed and saved to patient folder:",
        consultationRecord,
      );

      // Mark as completed and start timer
      setIsCompleted(true);
      setCompletionTime(completionTimestamp);
      setCanEdit(true);
      setRemainingTime(EDIT_WINDOW_SECONDS);

      alert(
        `✅ Consultation completed and saved!\n\nPatient: ${patientInfo.fullName}\nDate: ${formData.date}\n\n✏️ You have ${EDIT_WINDOW_MINUTES} minutes to make edits if needed.\n\nThis consultation is now saved in the patient's Consult folder.`,
      );

      setIsCompleting(false);

      // In real app: Don't navigate away, stay on page so doctor can edit if needed
      // navigate('/patient-dashboard');
    }, 1500);
  };

  // ==================== UPDATE HANDLER ====================
  /**
   * UPDATE: Edit completed consultation within 10-minute window
   * - Only works if canEdit is true
   * - Sends email to patient for approval
   * - Patient must accept before changes are saved
   * - After patient accepts → Updated page replaces original in folder
   */
  const handleUpdate = async () => {
    if (!canEdit) {
      alert(
        "⏰ Edit window has expired. You can no longer update this consultation.",
      );
      return;
    }

    if (!validate()) {
      alert("Please fill in required fields before updating");
      return;
    }

    setIsUpdating(true);

    const updateRequest = {
      consultationId: `CONSULT_${completionTime}`,
      patientId: patientInfo.patientId,
      patientEmail: patientInfo.email,
      updatedAt: new Date().toISOString(),
      updatedData: formData,
      doctorId: "DR123",
      status: "pending_patient_approval", // Waiting for patient to accept
      emailNotification: {
        to: patientInfo.email,
        subject: `Update Request: Consultation on ${formData.date}`,
        message: `Dr. Samantha Silva has requested to update your consultation record from ${formData.date}. Please review and approve the changes.`,
      },
    };

    // ==================== SIMULATE API SAVE & EMAIL SEND ====================
    setTimeout(() => {
      console.log(
        "📧 Update request sent to patient for approval:",
        updateRequest,
      );
      console.log(`📧 Email sent to: ${patientInfo.email}`);

      alert(
        `📧 Update request sent!\n\nPatient: ${patientInfo.fullName}\nEmail: ${patientInfo.email}\n\n⏳ Waiting for patient approval...\n\nThe patient will receive an email to accept these changes.\nOnce approved, the updated consultation will be saved to their Consult folder.`,
      );

      setIsUpdating(false);

      // In real app: You might disable Update button until patient responds
      // or show a "Pending approval" status
    }, 1500);
  };

  // ==================== DELETE HANDLER ====================
  /**
   * DELETE: Remove consultation from patient's folder
   * - Only works if canEdit is true (within 10-minute window)
   * - Shows confirmation modal
   * - Permanently removes consultation from patient folder
   */
  const handleDelete = () => {
    if (!canEdit) {
      alert(
        "⏰ Edit window has expired. You can no longer delete this consultation.",
      );
      return;
    }
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const deleteRecord = {
      consultationId: `CONSULT_${completionTime}`,
      patientId: patientInfo.patientId,
      deletedAt: new Date().toISOString(),
      deletedBy: "DR123",
      reason: "Doctor deleted within edit window",
    };

    console.log("🗑️ Consultation deleted from patient folder:", deleteRecord);

    alert(
      `🗑️ Consultation deleted!\n\nPatient: ${patientInfo.fullName}\nDate: ${formData.date}\n\nThe consultation has been removed from the patient's Consult folder.`,
    );

    setShowDeleteConfirm(false);
    navigate("/patient-dashboard");
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  // ==================== RENDER ====================
  return (
    <>
      {/* Navigation Bar */}
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
          {/* Header with Status */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-mainblack">
              Consultation Page
            </h1>

            {/* Status Badge */}
            {isCompleted && (
              <div className="flex items-center gap-3">
                {canEdit ? (
                  <div className="px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-lg">
                    <p className="text-sm font-semibold text-yellow-800">
                      ⏰ Edit Window: {formatTime(remainingTime)} remaining
                    </p>
                    <p className="text-xs text-yellow-600">
                      Update & Delete available until time expires
                    </p>
                  </div>
                ) : (
                  <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg">
                    <p className="text-sm font-semibold text-gray-800">
                      🔒 Locked - Edit window expired
                    </p>
                    <p className="text-xs text-gray-600">
                      This consultation can no longer be edited
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Grid Layout: 2 Columns */}
          <div className="grid lg:grid-cols-2 gap-6">
            <PatientDetailsCard
              patientInfo={patientInfo}
              onMoreAboutPatient={handleMoreAboutPatient}
              showMedicationPurpose={true}
            />
            <TodayPageFormCard
              formData={formData}
              onChange={handleChange}
              errors={errors}
            />
          </div>

          {/* Other Sections */}
          <div className="mt-6">
            <ExaminationAndTestsCard
              formData={formData}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            <VitalSignsCard formData={formData} onChange={handleChange} />
          </div>

          <div className="mt-6">
            <AdditionalNotesCard formData={formData} onChange={handleChange} />
          </div>

          <div className="mt-6">
            <MedicationCard formData={formData} onChange={handleChange} />
          </div>

          {/* ========== ACTION BUTTONS ========== */}
          <div className="flex justify-between items-center mt-6">
            {/* LEFT: Update & Delete (only if completed) */}
            {isCompleted && (
              <div className="flex gap-3">
                {/* Update Button */}
                <button
                  onClick={handleUpdate}
                  disabled={!canEdit || isUpdating}
                  className={`px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
                    canEdit
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  title={
                    !canEdit ? "Edit window expired" : "Update consultation"
                  }
                >
                  {isUpdating ? "Updating..." : "✏️ Update"}
                </button>

                {/* Delete Button */}
                <button
                  onClick={handleDelete}
                  disabled={!canEdit}
                  className={`px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 ${
                    canEdit
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  title={
                    !canEdit ? "Edit window expired" : "Delete consultation"
                  }
                >
                  🗑️ Delete
                </button>
              </div>
            )}

            {/* RIGHT: Complete Button (only if not completed yet) */}
            {!isCompleted && (
              <button
                onClick={handleComplete}
                disabled={isCompleting}
                className="ml-auto px-8 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition transform hover:scale-105 disabled:opacity-50"
              >
                {isCompleting ? "Completing..." : "✅ Complete"}
              </button>
            )}
          </div>

          {/* Info Box */}
          {!isCompleted && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                ℹ️ <strong>Note:</strong> After clicking "Complete", you'll have{" "}
                {EDIT_WINDOW_MINUTES} minutes to make edits if needed. Any
                updates will require patient approval via email.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 text-3xl">⚠️</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Delete Consultation?
              </h2>
              <p className="text-sm text-gray-600">
                Are you sure you want to delete this consultation for{" "}
                <strong>{patientInfo.fullName}</strong>? This will remove it
                from the patient's Consult folder permanently.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-5 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-50"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
