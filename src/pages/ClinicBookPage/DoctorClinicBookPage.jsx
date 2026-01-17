//thathsara
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DoctorNavBar } from "../../components/DoctorNavBar";
import { PatientDetailsCard } from "../../components/DoctorCards/PatientDetailsCard";
import { TodayPageFormCard } from "../../components/DoctorCards/TodayPageFormCard";
import { ExaminationAndTestsCard } from "../../components/DoctorCards/ExaminationAndTestsCard";
import { AdditionalNotesCard } from "../../components/DoctorCards/AdditionalNotesCard";
import { VitalSignsCard } from "../../components/DoctorCards/VitalSignsCard";
import { MedicationCard } from "../../components/DoctorCards/MedicationCard";
import { PastClinicPagesCard } from "../../components/DoctorCards/PastClinicPagesCard";

export default function DoctorClinicBookPage() {
  const navigate = useNavigate();

  // ==================== MOCK PATIENT DATA ====================
  const patientInfo = {
    patientId: "UR5678",
    fullName: "Parindya Hewage",
    email: "parindya@gmail.com",
    age: 23,
    gender: "Female",
    medicationPurpose: "Treat Gastritis",
  };

  // ==================== MOCK PAST CLINIC PAGES ====================
  const [pastPages, setPastPages] = useState(() => {
    const saved = localStorage.getItem("pastClinicPages");
    return saved ? JSON.parse(saved) : [];
  });

  // ==================== FORM STATE ====================
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
  //  WORKFLOW STATE (NEW)
  const [pageStatus, setPageStatus] = useState("DRAFT");
  // DRAFT | COMPLETED | LOCKED | PENDING_APPROVAL

  const [pendingAction, setPendingAction] = useState(null);
  // UPDATE | DELETE

  const [changeSummary, setChangeSummary] = useState("");
  const [_patientApproved, _setPatientApproved] = useState(false);

  // TIME-BASED EDITING STATE
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
      const elapsed = Math.floor((now - completionTime) / 1000);
      const remaining = EDIT_WINDOW_SECONDS - elapsed;

      if (remaining <= 0) {
        setRemainingTime(0);
        setCanEdit(false);
        setPageStatus("LOCKED");
        clearInterval(timer);
      } else {
        setRemainingTime(remaining);
        setCanEdit(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompleted, completionTime, EDIT_WINDOW_SECONDS]);
  useEffect(() => {
    if (pendingAction) {
      console.log("Pending action:", pendingAction);
    }
  }, [pendingAction]);

  const handleCreateNewPage = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      reasonForVisit: "",
      examinationNotes: "",
      bloodPressure: "",
      pulse: "",
      temperature: "",
      weight: "",
      respiratoryRate: "",
      medication: "",
      suggestedTests: "",
      doctorNote: "",
      nextClinicDate: "",
    });

    setIsCompleted(false);
    setCompletionTime(null);
    setRemainingTime(null);
    setCanEdit(false);

    setPageStatus("DRAFT");
    setPendingAction(null);
    setChangeSummary("");
  };

  // PATIENT APPROVAL EFFECT

  /* useEffect(() => {
    if (pageStatus !== "PENDING_APPROVAL" || !patientApproved) return;

    if (pendingAction === "UPDATE") {
      alert("✅ Patient approved update. Changes saved.");
      setPageStatus("COMPLETED");
    }

    if (pendingAction === "DELETE") {
      alert("🗑️ Patient approved deletion.");
      setPastPages((prev) => prev.slice(1));
      handleCreateNewPage();
    }

    setPendingAction(null);
    setPatientApproved(false);
  }, [pageStatus, patientApproved, pendingAction]);*/

  //  HELPER FUNCTIONS

  // Format remaining time as MM:SS
  const formatTime = (seconds) => {
    if (!seconds || seconds <= 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  //  CHANGE SUMMARY HELPER
  const getChangedFieldsSummary = (oldData, newData) => {
    return Object.keys(newData)
      .filter((key) => oldData[key] !== newData[key])
      .map(
        (key) =>
          `• ${key}: "${oldData[key] || "—"}" → "${newData[key] || "—"}"`,
      )
      .join("\n");
  };

  //  HANDLERS
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
    navigate("/doctorViewform");
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
    const completionTimestamp = Date.now();

    // ==================== SIMULATE API SAVE ====================
    const clinicBookPage = {
      id: `CONSULT_${Date.now()}`,
      patientId: patientInfo.patientId,
      clinicBookId: "CB001", // ID of the clinic book this page belongs to
      pageDate: formData.date,
      timestamp: new Date(completionTimestamp).toISOString(),
      patientDetails: patientInfo,
      pageData: formData,
      doctorId: "DR123",
      status: "completed",
      folder: "clinic-book", // Saved in patient's clinic book folder
      editWindow: {
        expiresAt: new Date(
          completionTimestamp + EDIT_WINDOW_SECONDS * 1000,
        ).toISOString(),
        durationMinutes: EDIT_WINDOW_MINUTES,
      },
    };

    setTimeout(() => {
      const newPastPage = {
        id: clinicBookPage.id,
        date: formData.date,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        reason: formData.reasonForVisit,
        fullData: clinicBookPage, // store full page data
      };

      setPastPages((prev) => {
        const updated = [newPastPage, ...prev];
        localStorage.setItem("pastClinicPages", JSON.stringify(updated));
        return updated;
      });

      console.log("✅ Clinic Book Page saved:", clinicBookPage);

      // Mark as completed and start timer
      setIsCompleted(true);
      setCompletionTime(completionTimestamp);
      setCanEdit(true);
      setRemainingTime(EDIT_WINDOW_SECONDS);
      setPageStatus("COMPLETED");

      alert(
        `✅ Clinic Book Page completed and saved!\n\nPatient: ${patientInfo.fullName}\nDate: ${formData.date}\n\n You have ${EDIT_WINDOW_MINUTES} minutes to make edits if needed.\n\n This clinic book is now saved in patient's Clinic Book folder.`,
      );

      setIsCompleting(false);
      //navigate("/patient-dashboard");
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
    //  AFTER 10 MINUTES → REQUEST APPROVAL
    const elapsedSeconds = Math.floor((Date.now() - completionTime) / 1000);
    const isWithinEditWindow = elapsedSeconds < EDIT_WINDOW_SECONDS;

    if (!isWithinEditWindow) {
      setPendingAction("UPDATE");
      setChangeSummary(
        getChangedFieldsSummary(
          pastPages[0]?.fullData?.pageData || {},
          formData,
        ),
      );

      setPageStatus("PENDING_APPROVAL");

      alert(
        "📧 Edit window expired.\n\nUpdate request sent to patient for approval.",
      );

      const updateRequest = {
        clinicId: `CONSULT_${completionTime}`,
        patientId: patientInfo.patientId,
        patientEmail: patientInfo.email,
        updatedAt: new Date().toISOString(),
        updatedData: formData,
        doctorId: "DR123",
        status: "pending_patient_approval",
        emailNotification: {
          to: patientInfo.email,
          subject: `Update Request: Consultation on ${formData.date}`,
          message: `Dr. Samantha Silva has requested to update your consultation record from ${formData.date}. Please review and approve the changes.`,
        },
      };

      console.log("📧 Sending update request:", updateRequest);
      return;
    }

    // WITHIN 10 MINUTES → UPDATE IMMEDIATELY
    if (!validate()) {
      alert("Please fill in required fields before updating");
      return;
    }

    setIsUpdating(true);

    setTimeout(() => {
      setPastPages((prev) => {
        const updated = [...prev];
        updated[0] = {
          ...updated[0],
          date: formData.date,
          reason: formData.reasonForVisit,
          fullData: {
            ...updated[0].fullData,
            pageData: formData,
            updatedAt: new Date().toISOString(),
          },
        };
        localStorage.setItem("pastClinicPages", JSON.stringify(updated));
        return updated;
      });

      alert("✅ Consultation updated successfully (within edit window).");

      setIsUpdating(false);
    }, 800);
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
      requestDelete();
      return;
    }

    setShowDeleteConfirm(true);
  };

  const requestUpdate = () => {
    setPendingAction("UPDATE");
    setChangeSummary("Doctor requested update after edit window expired.");

    alert(`📧 Update request sent to patient.\n\nSummary:\n${changeSummary}`);

    setPageStatus("PENDING_APPROVAL");
  };

  const requestDelete = () => {
    setPendingAction("DELETE");
    setChangeSummary("Doctor requested deletion after edit window expired.");

    alert(`📧 Delete request sent to patient.\n\nSummary:\n${changeSummary}`);

    setPageStatus("PENDING_APPROVAL");
  };

  const confirmDelete = () => {
    const deleteRecord = {
      clinicId: `CONSULT_${completionTime}`,
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
    setPastPages((prev) => {
      const updated = prev.filter(
        (p) => p.fullData.id !== `CONSULT_${completionTime}`,
      );
      localStorage.setItem("pastClinicPages", JSON.stringify(updated));
      return updated;
    });

    handleCreateNewPage();
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
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
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-mainblack mb-6">
            Clinic Book Page
          </h1>
          {/* Status Badge */}
          {isCompleted && (
            <div className="flex items-center gap-3 mb-6">
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
          {/* ========== GRID LAYOUT: 3 COLUMNS ========== */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              <PatientDetailsCard
                patientInfo={patientInfo}
                onMoreAboutPatient={handleMoreAboutPatient}
                showMedicationPurpose={false}
              />
              <PastClinicPagesCard pastPages={pastPages} />

              <button
                onClick={() => {
                  setFormData({
                    date: new Date().toISOString().split("T")[0],
                    reasonForVisit: "",
                    examinationNotes: "",
                    bloodPressure: "",
                    pulse: "",
                    temperature: "",
                    weight: "",
                    respiratoryRate: "",
                    medication: "",
                    suggestedTests: "",
                    doctorNote: "",
                    nextClinicDate: "",
                  });
                  setIsCompleted(false);
                  setCompletionTime(null);
                  setRemainingTime(null);
                  setCanEdit(false);
                }}
                className="w-full mt-3 px-4 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition"
              >
                ➕ Create New Page
              </button>

              <AdditionalNotesCard
                formData={formData}
                onChange={handleChange}
              />
            </div>
            {/* RIGHT COLUMN */}
            <div className="lg:col-span-2 space-y-6">
              <TodayPageFormCard
                formData={formData}
                onChange={handleChange}
                errors={errors}
              />

              <ExaminationAndTestsCard
                formData={formData}
                onChange={handleChange}
              />

              <VitalSignsCard formData={formData} onChange={handleChange} />

              {/* ADD-------------------- */}

              <MedicationCard formData={formData} onChange={handleChange} />

              {/* ACTION BUTTONS */}

              <div className="flex justify-between items-center mt-6">
                {pageStatus === "COMPLETED" && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      className={`px-6 py-3 rounded-lg text-white ${
                        isUpdating
                          ? "bg-blue-300 cursor-not-allowed"
                          : "bg-blue-600"
                      }`}
                    >
                      {isUpdating ? "Sending..." : "✏️ Update"}
                    </button>

                    <button
                      onClick={handleDelete}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}

                {pageStatus === "LOCKED" && (
                  <div className="flex gap-3">
                    <button
                      onClick={requestUpdate}
                      className="px-6 py-3 bg-yellow-500 text-white rounded-lg"
                    >
                      📝 Request Update
                    </button>
                    <button
                      onClick={requestDelete}
                      className="px-6 py-3 bg-orange-600 text-white rounded-lg"
                    >
                      🗑️ Request Delete
                    </button>
                  </div>
                )}

                {pageStatus === "PENDING_APPROVAL" && (
                  <div className="px-4 py-3 bg-yellow-100 border border-yellow-300 rounded-lg text-sm">
                    ⏳ Waiting for patient approval…
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
              {/* check from here */}
              {!isCompleted && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    ℹ️ <strong>Note:</strong> After clicking "Complete", you'll
                    have {EDIT_WINDOW_MINUTES} minutes to make edits.
                  </p>
                </div>
              )}
            </div>{" "}
            {/* ✅ CLOSE lg:col-span-2 */}
          </div>{" "}
          {/* ✅ CLOSE grid */}
        </div>{" "}
        {/* ✅ CLOSE max-w-7xl */}
      </div>{" "}
      {/* ✅ CLOSE min-h-screen */}
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
