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
import { pastClinicPagesDummy } from "./pastClinicPages";

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

  //👇when remove dummy file uncomment this//////////////////////////////////////////////
  // const [pastPages, setPastPages] = useState(() => {
  //   const saved = localStorage.getItem("pastClinicPages");
  //   return saved ? JSON.parse(saved) : [];
  // });








//comment when remove dummy data()//////////////////////////////////
const [pastPages, setPastPages] = useState(() => {
  const saved = localStorage.getItem("pastClinicPages");

  if (saved) {
    const parsed = JSON.parse(saved);

    // 👇 THIS IS THE KEY FIX
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  }

  // If empty or not found → load dummy
  localStorage.setItem(
    "pastClinicPages",
    JSON.stringify(pastClinicPagesDummy)
  );

  return pastClinicPagesDummy;
});

  useEffect(() => {
  console.log("PAST PAGES STATE:", pastPages);
}, [pastPages]);
//this ////////////////////////////////////////////////////////////////








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

  // ==================== NEW: VIEWING STATE ====================
  const [viewingPage, setViewingPage] = useState(null); // Currently viewing page
  const [isViewMode, setIsViewMode] = useState(false); // Are we in view mode?

  //  WORKFLOW STATE
  const [pageStatus, setPageStatus] = useState("DRAFT");
  // DRAFT | COMPLETED | LOCKED | PENDING_APPROVAL

  const [pendingAction, setPendingAction] = useState(null);
  // UPDATE | DELETE

  const [changeSummary, setChangeSummary] = useState("");

  // TIME-BASED EDITING STATE
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [canEdit, setCanEdit] = useState(false);

  const EDIT_WINDOW_MINUTES = 10;
  const EDIT_WINDOW_SECONDS = EDIT_WINDOW_MINUTES * 60;

  // ==================== TIMER EFFECT ====================
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

  // ==================== NEW: HANDLE VIEW PAGE ====================
  /**
   * When doctor clicks "View" on a past page:
   * 1. Load page data into form fields
   * 2. Set viewing mode
   * 3. Check if page is within 10-minute edit window
   * 4. Show appropriate buttons (Update/Delete or Request Update/Request Delete)
   */
  const handleViewPage = (page) => {
    if (!page || !page.fullData) return;

    const pageData = page.fullData.pageData;

    // Populate form with page data
    setFormData({
      date: pageData.date || "",
      reasonForVisit: pageData.reasonForVisit || "",
      examinationNotes: pageData.examinationNotes || "",
      bloodPressure: pageData.bloodPressure || "",
      pulse: pageData.pulse || "",
      temperature: pageData.temperature || "",
      weight: pageData.weight || "",
      respiratoryRate: pageData.respiratoryRate || "",
      suggestedTests: pageData.suggestedTests || "",
      doctorNote: pageData.doctorNote || "",
      nextClinicDate: pageData.nextClinicDate || "",
      medication: pageData.medication || "",
    });

    // Set viewing state
    setViewingPage(page);
    setIsViewMode(true);
    setIsCompleted(true);

    // Calculate if within edit window
    const pageCompletionTime = new Date(page.fullData.timestamp).getTime();
    setCompletionTime(pageCompletionTime);

    const now = Date.now();
    const elapsed = Math.floor((now - pageCompletionTime) / 1000);
    const remaining = EDIT_WINDOW_SECONDS - elapsed;

    if (remaining > 0) {
      setCanEdit(true);
      setRemainingTime(remaining);
      setPageStatus("COMPLETED");
    } else {
      setCanEdit(false);
      setRemainingTime(0);
      setPageStatus("LOCKED");
    }
  };

  // ==================== CREATE NEW PAGE ====================
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

    // Reset viewing state
    setViewingPage(null);
    setIsViewMode(false);
  };

  //  HELPER FUNCTIONS
  const formatTime = (seconds) => {
    if (!seconds || seconds <= 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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

  const validate = () => {
    const newErrors = {};

    if (!formData.reasonForVisit.trim()) {
      newErrors.reasonForVisit = "Reason for visit is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==================== COMPLETE HANDLER ====================
  const handleComplete = async () => {
    if (!validate()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsCompleting(true);
    const completionTimestamp = Date.now();

    const clinicBookPage = {
      id: `CONSULT_${Date.now()}`,
      patientId: patientInfo.patientId,
      clinicBookId: "CB001",
      pageDate: formData.date,
      timestamp: new Date(completionTimestamp).toISOString(),
      patientDetails: patientInfo,
      pageData: formData,
      doctorId: "DR123",
      status: "completed",
      folder: "clinic-book",
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
        fullData: clinicBookPage,
      };

      setPastPages((prev) => {
        const updated = [newPastPage, ...prev];
        localStorage.setItem("pastClinicPages", JSON.stringify(updated));
        return updated;
      });

      console.log("✅ Clinic Book Page saved:", clinicBookPage);

      setIsCompleted(true);
      setCompletionTime(completionTimestamp);
      setCanEdit(true);
      setRemainingTime(EDIT_WINDOW_SECONDS);
      setPageStatus("COMPLETED");

      // Set as viewing the newly created page
      setViewingPage(newPastPage);
      setIsViewMode(true);

      alert(
        `✅ Clinic Book Page completed and saved!\n\nPatient: ${patientInfo.fullName}\nDate: ${formData.date}\n\nYou have ${EDIT_WINDOW_MINUTES} minutes to make edits if needed.`,
      );

      setIsCompleting(false);
    }, 1500);
  };

  // ==================== UPDATE HANDLER ====================
  const handleUpdate = async () => {
    const elapsedSeconds = Math.floor((Date.now() - completionTime) / 1000);
    const isWithinEditWindow = elapsedSeconds < EDIT_WINDOW_SECONDS;

    if (!isWithinEditWindow) {
      setPendingAction("UPDATE");
      setChangeSummary(
        getChangedFieldsSummary(
          viewingPage?.fullData?.pageData || {},
          formData,
        ),
      );

      setPageStatus("PENDING_APPROVAL");

      alert(
        `📧 Edit window expired.\n\nUpdate request sent to patient for approval.\n\nChanged fields:\n${changeSummary}`,
      );

      const updateRequest = {
        clinicId: viewingPage?.id,
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

    if (!validate()) {
      alert("Please fill in required fields before updating");
      return;
    }

    setIsUpdating(true);

    setTimeout(() => {
      setPastPages((prev) => {
        const updated = prev.map((page) =>
          page.id === viewingPage.id
            ? {
                ...page,
                date: formData.date,
                reason: formData.reasonForVisit,
                fullData: {
                  ...page.fullData,
                  pageData: formData,
                  updatedAt: new Date().toISOString(),
                },
              }
            : page,
        );
        localStorage.setItem("pastClinicPages", JSON.stringify(updated));
        return updated;
      });

      // Update viewing page state
      setViewingPage((prev) => ({
        ...prev,
        date: formData.date,
        reason: formData.reasonForVisit,
        fullData: {
          ...prev.fullData,
          pageData: formData,
          updatedAt: new Date().toISOString(),
        },
      }));

      alert("✅ Consultation updated successfully (within edit window).");
      setIsUpdating(false);
    }, 800);
  };

  // ==================== DELETE HANDLER ====================
  const handleDelete = () => {
    if (!canEdit) {
      requestDelete();
      return;
    }

    setShowDeleteConfirm(true);
  };

  const requestUpdate = () => {
    const changes = getChangedFieldsSummary(
      viewingPage?.fullData?.pageData || {},
      formData,
    );

    setPendingAction("UPDATE");
    setChangeSummary(changes);

    alert(`📧 Update request sent to patient.\n\nChanged fields:\n${changes}`);

    setPageStatus("PENDING_APPROVAL");
  };

  const requestDelete = () => {
    setPendingAction("DELETE");
    setChangeSummary("Doctor requested deletion after edit window expired.");

    alert(
      `📧 Delete request sent to patient.\n\nThe patient will receive an email with a "Give Access" button to approve deletion.`,
    );

    setPageStatus("PENDING_APPROVAL");
  };

  const confirmDelete = () => {
    const deleteRecord = {
      clinicId: viewingPage?.id,
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
      const updated = prev.filter((p) => p.id !== viewingPage?.id);
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

          {/* ==================== NEW: VIEWING MODE INDICATOR ==================== */}
          {isViewMode && viewingPage && (
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-800">
                    📄 Viewing clinic page from: {viewingPage.date} at{" "}
                    {viewingPage.time}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    {canEdit
                      ? `You can edit this page. Time remaining: ${formatTime(remainingTime)}`
                      : "Edit window expired. Request patient permission to make changes."}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    canEdit
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {canEdit ? "Editable" : "Requires Permission"}
                </span>
              </div>
            </div>
          )}

          {/* Status Badge */}
          {isCompleted && !isViewMode && (
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

              {/* ==================== UPDATED: Pass handleViewPage ==================== */}
              <PastClinicPagesCard
                pastPages={pastPages}
                onViewPage={handleViewPage}
              />

              <button
                onClick={handleCreateNewPage}
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

              <MedicationCard formData={formData} onChange={handleChange} />

              {/* ==================== ACTION BUTTONS ==================== */}
              <div className="flex justify-between items-center mt-6">
                {/* LEFT: Update/Delete or Request buttons (only in view mode) */}
                {isViewMode && pageStatus === "COMPLETED" && canEdit && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      className={`px-6 py-3 rounded-lg text-white font-semibold ${
                        isUpdating
                          ? "bg-blue-300 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {isUpdating ? "Updating..." : "✏️ Update"}
                    </button>

                    <button
                      onClick={handleDelete}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}

                {isViewMode && pageStatus === "LOCKED" && (
                  <div className="flex gap-3">
                    <button
                      onClick={requestUpdate}
                      className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
                    >
                      📝 Request Update
                    </button>
                    <button
                      onClick={requestDelete}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
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

                {/* RIGHT: Complete Button (only if NOT in view mode and not completed) */}
                {!isViewMode && !isCompleted && (
                  <button
                    onClick={handleComplete}
                    disabled={isCompleting}
                    className="ml-auto px-8 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition transform hover:scale-105 disabled:opacity-50"
                  >
                    {isCompleting ? "Completing..." : "✅ Complete"}
                  </button>
                )}
              </div>

              {!isViewMode && !isCompleted && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    ℹ️ <strong>Note:</strong> After clicking "Complete", you'll
                    have {EDIT_WINDOW_MINUTES} minutes to make edits.
                  </p>
                </div>
              )}
            </div>
          </div>
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
