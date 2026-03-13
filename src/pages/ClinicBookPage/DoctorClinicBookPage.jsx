
// thahsara
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DoctorNavBar from "../../components/DoctorNavBar2";
import { PatientDetailsCard } from "../../components/DoctorCards/PatientDetailsCard";
import { TodayPageFormCard } from "../../components/DoctorCards/TodayPageFormCard";
import { ExaminationAndTestsCard } from "../../components/DoctorCards/ExaminationAndTestsCard";
import { AdditionalNotesCard } from "../../components/DoctorCards/AdditionalNotesCard";
import { VitalSignsCard } from "../../components/DoctorCards/VitalSignsCard";
import { MedicationCard } from "../../components/DoctorCards/MedicationCard";
import { PastClinicPagesCard } from "../../components/DoctorCards/PastClinicPagesCard";

import { createClinicPageById } from "../../api/ClinicPageApi";
import { getPatientDataByClinicBookId } from "../../api/ClinicBookApi";
import {
  getClinicPagesByClinicBookId,
  getClinicPageById,
  updateClinicPage,
  deleteClinicPage,
  requestEditApproval
} from "../../api/ClinicPageApi";

export default function DoctorClinicBookPage() {
  const navigate = useNavigate();
  const { clinicBookId } = useParams();

  const [patientInfo, setPatientInfo] = useState(null);
  const [pastPages, setPastPages] = useState([]);

  const [formData, setFormData] = useState({
    subReason: "",
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
  const [approvalRequestedPageId, setApprovalRequestedPageId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isCompleting, setIsCompleting] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [isViewingOldPage, setIsViewingOldPage] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState(null);

  const EDIT_WINDOW_MINUTES = 10;
  const EDIT_WINDOW_SECONDS = EDIT_WINDOW_MINUTES * 60;

  // ===== Modern UI Modal State =====
const [modal, setModal] = useState({
  open: false,
  message: "",
  confirm: false,
  onConfirm: null,
});

// show normal message
const showMessage = (message) => {
  setModal({
    open: true,
    message,
    confirm: false,
    onConfirm: null,
  });
};

// show confirm dialog
const showConfirm = (message, callback) => {
  setModal({
    open: true,
    message,
    confirm: true,
    onConfirm: callback,
  });
};

// close modal
const closeModal = () => {
  setModal({
    open: false,
    message: "",
    confirm: false,
    onConfirm: null,
  });
};

  // ================= LOAD PATIENT =================
  useEffect(() => {
    if (!clinicBookId) return;

    getPatientDataByClinicBookId(clinicBookId)
      .then((res) => {
        const data = res.data;
        setPatientInfo({
          patientId: data.patinetId,
          age: data.age,
          gender: data.gender,
          medicationPurpose: data.visit_reason,
        });
      })
      .catch((err) => console.error(err));
  }, [clinicBookId]);

  // ================= LOAD PAST PAGES =================
  useEffect(() => {
    if (!clinicBookId) return;

    getClinicPagesByClinicBookId(clinicBookId)
      .then((res) => setPastPages(res.data))
      .catch((err) => console.error(err));
  }, [clinicBookId]);

  // ================= VIEW OLD PAGE =================
  const handleViewPage = async (page) => {
    try {
      const response = await getClinicPageById(page.id);
      const data = response.data.data;

      const metrics = data.healthMetricRequestSetDTO?.metrics || {};

      const updatedForm = {
        subReason: data.subReason || "",
        clinicExaming: data.clinicExaming || "",
        clinicSuggestTest: data.clinicSuggestTest || "",
        clinicDoctorNote: data.clinicDoctorNote || "",
        nextClinic: data.nextClinic
          ? data.nextClinic.split("T")[0]
          : "",
        medication:
          data.medication?.map((med) => ({
            medicine: med.drugName || "",
            dose: med.dosage || "",
            frequency: med.frequency || "",
            duration: med.duration || "",
            timing: med.instruction || "",
          })) || [],
        mediMessure: {
          BP:
            metrics.BLOOD_PRESSURE_SYSTOLIC &&
            metrics.BLOOD_PRESSURE_DIASTOLIC
              ? `${metrics.BLOOD_PRESSURE_SYSTOLIC}/${metrics.BLOOD_PRESSURE_DIASTOLIC}`
              : "",
          pulse: metrics.HEART_RATE ?? "",
          temperature: metrics.TEMPERATURE ?? "",
          weight: metrics.WEIGHT ?? "",
          bloodSugar: metrics.BLOOD_SUGAR ?? "",
          cholesterol: metrics.CHOLESTEROL ?? "",
        },
      };

      setFormData(updatedForm);

      // 🔥 IMPORTANT
      setIsViewingOldPage(true);
      setSelectedPageId(page.id);
      setIsCompleted(true);
      setCanEdit(true);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to load clinic page");
    }
  };

  // ================= CREATE NEW =================
  const handleCreateNewPage = () => {
    setFormData({
      subReason: "",
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

    setErrors({});
    setIsViewingOldPage(false);
    setSelectedPageId(null);
    setIsCompleted(false);
    setCanEdit(false);
    setCompletionTime(null);
    setRemainingTime(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ================= COMPLETE =================
//   const handleComplete = async () => {
//   if (!formData.subReason.trim()) {
//     alert("Please fill required fields");
//     return;
//   }

//   try {
//     setIsCompleting(true);

//     const requestBody = {
//       subReason: formData.subReason,
//       clinicExaming: formData.clinicExaming,
//       clinicSuggestTest: formData.clinicSuggestTest,
//       clinicDoctorNote: formData.clinicDoctorNote,
//       nextClinic: formData.nextClinic,
//       medication: formData.medication.map((med) => ({
//         drugName: med.medicine,
//         dosage: med.dose,
//         frequency: med.frequency,
//         duration: med.duration,
//         instruction: med.timing,
//       })),
//     };

//     // ================= METRICS =================
//     const metrics = {};

//     if (formData.mediMessure?.pulse)
//       metrics["HEART_RATE"] = Number(formData.mediMessure.pulse);

//     if (formData.mediMessure?.temperature)
//       metrics["TEMPERATURE"] = Number(formData.mediMessure.temperature);

//     if (formData.mediMessure?.weight)
//       metrics["WEIGHT"] = Number(formData.mediMessure.weight);

//     if (formData.mediMessure?.bloodSugar)
//       metrics["BLOOD_SUGAR"] = Number(formData.mediMessure.bloodSugar);

//     if (formData.mediMessure?.cholesterol)
//       metrics["CHOLESTEROL"] = Number(formData.mediMessure.cholesterol);

//     if (formData.mediMessure?.BP) {
//       const [sys, dia] = formData.mediMessure.BP.split("/");
//       metrics["BLOOD_PRESSURE_SYSTOLIC"] = Number(sys);
//       metrics["BLOOD_PRESSURE_DIASTOLIC"] = Number(dia);
//     }

//     if (Object.keys(metrics).length > 0) {
//       requestBody.healthMetricRequestSetDTO = { metrics };
//     }

//     // ================= API CALL =================
//     await createClinicPageById(clinicBookId, requestBody);

//     const now = Date.now();
//     setCompletionTime(now);
//     setIsCompleted(true);
//     setRemainingTime(EDIT_WINDOW_SECONDS);
//     setCanEdit(true);
//     setShowSuccessModal(true);

//   } catch (error) {
//     console.error(error);
//     alert("❌ Error saving clinic page");
//   } finally {
//     setIsCompleting(false);
//   }
// };


const handleComplete = async () => {
  if (!formData.subReason.trim()) {
     showMessage("Please fill required feilds");
    return;
  }

  try {
    setIsCompleting(true);

    const requestBody = {
      subReason: formData.subReason,
      clinicExaming: formData.clinicExaming,
      clinicSuggestTest: formData.clinicSuggestTest,
      clinicDoctorNote: formData.clinicDoctorNote,
      nextClinic: formData.nextClinic,
      medication: formData.medication.map((med) => ({
        drugName: med.medicine,
        dosage: med.dose,
        frequency: med.frequency,
        duration: med.duration,
        instruction: med.timing,
      })),
    };

    // ================= METRICS =================
    const metrics = {};

    if (formData.mediMessure?.pulse)
      metrics["HEART_RATE"] = Number(formData.mediMessure.pulse);

    if (formData.mediMessure?.temperature)
      metrics["TEMPERATURE"] = Number(formData.mediMessure.temperature);

    if (formData.mediMessure?.weight)
      metrics["WEIGHT"] = Number(formData.mediMessure.weight);

    if (formData.mediMessure?.bloodSugar)
      metrics["BLOOD_SUGAR"] = Number(formData.mediMessure.bloodSugar);

    if (formData.mediMessure?.cholesterol)
      metrics["CHOLESTEROL"] = Number(formData.mediMessure.cholesterol);

    if (formData.mediMessure?.BP) {
      const [sys, dia] = formData.mediMessure.BP.split("/");
      metrics["BLOOD_PRESSURE_SYSTOLIC"] = Number(sys);
      metrics["BLOOD_PRESSURE_DIASTOLIC"] = Number(dia);
    }

    if (Object.keys(metrics).length > 0) {
      requestBody.healthMetricRequestSetDTO = { metrics };
    }

    // ================= API CALL =================
    const response = await createClinicPageById(clinicBookId, requestBody);

    // 🔥 IMPORTANT: switch to VIEW MODE
    const newPageId = response?.data?.data?.clinicPageId;

    setIsViewingOldPage(true);
    setSelectedPageId(newPageId);

    const now = Date.now();
    setCompletionTime(now);
    setIsCompleted(true);
    setRemainingTime(EDIT_WINDOW_SECONDS);
    setCanEdit(true);

    setShowSuccessModal(true);

  }catch (error) {
    console.error(error);

    if (error.response?.data?.error) {
      showMessage(error.response.data.error);
    } else {
      showMessage("Error saving clinic page");
    }

  } finally {
    setIsCompleting(false);
  }
};



// const handleUpdate = async () => {

//   if (approvalRequestedPageId === selectedPageId) {
//     showMessage("Patient approval is pending for this page.");
//     return;
//   }

//   showConfirm(
//     "Do you want to update this clinic page?",
//     async () => {

//       try {

//         const requestBody = {
//           subReason: formData.subReason,
//           clinicExaming: formData.clinicExaming,
//           clinicSuggestTest: formData.clinicSuggestTest,
//           clinicDoctorNote: formData.clinicDoctorNote,
//           nextClinic: formData.nextClinic,
//           medication: formData.medication.map((med) => ({
//             drugName: med.medicine,
//             dosage: med.dose,
//             frequency: med.frequency,
//             duration: med.duration,
//             instruction: med.timing,
//           })),
//         };

//         await updateClinicPage(selectedPageId, requestBody);

//         showMessage("Clinic page updated successfully");

//       } catch (error) {

//         if (
//           error.response?.status === 403 &&
//           error.response?.data?.error === "EDIT_WINDOW_EXPIRED"
//         ) {

//           showConfirm(
//             "Edit time expired. Do you want to request approval from the patient?",
//             async () => {

//               await requestEditApproval(selectedPageId);

//               setApprovalRequestedPageId(selectedPageId);

//               showMessage("Approval request sent to patient");

//             }
//           );

//         } else {

//           showMessage("Update failed");

//         }

//       }

//     }
//   );
// };

const handleUpdate = async () => {

  if (approvalRequestedPageId === selectedPageId) {
    showMessage("Patient approval is pending for this page.");
    return;
  }

  showConfirm(
    "Do you want to update this clinic page?",
    async () => {

      try {

        const requestBody = {
          subReason: formData.subReason,
          clinicExaming: formData.clinicExaming,
          clinicSuggestTest: formData.clinicSuggestTest,
          clinicDoctorNote: formData.clinicDoctorNote,
          nextClinic: formData.nextClinic,
          medication: formData.medication.map((med) => ({
            drugName: med.medicine,
            dosage: med.dose,
            frequency: med.frequency,
            duration: med.duration,
            instruction: med.timing,
          })),
        };

        // ================= METRICS =================
        const metrics = {};

        const pulse = Number(formData.mediMessure?.pulse);
        if (!isNaN(pulse) && pulse > 0) {
          metrics["HEART_RATE"] = pulse;
        }

        const temperature = Number(formData.mediMessure?.temperature);
        if (!isNaN(temperature) && temperature > 0) {
          metrics["TEMPERATURE"] = temperature;
        }

        const weight = Number(formData.mediMessure?.weight);
        if (!isNaN(weight) && weight > 0) {
          metrics["WEIGHT"] = weight;
        }

        const bloodSugar = Number(formData.mediMessure?.bloodSugar);
        if (!isNaN(bloodSugar) && bloodSugar > 0) {
          metrics["BLOOD_SUGAR"] = bloodSugar;
        }

        const cholesterol = Number(formData.mediMessure?.cholesterol);
        if (!isNaN(cholesterol) && cholesterol > 0) {
          metrics["CHOLESTEROL"] = cholesterol;
        }

        const bp = formData.mediMessure?.BP;

        if (bp && bp.includes("/")) {
          const [sys, dia] = bp.split("/");

          const sysVal = Number(sys);
          const diaVal = Number(dia);

          if (!isNaN(sysVal) && !isNaN(diaVal)) {
            metrics["BLOOD_PRESSURE_SYSTOLIC"] = sysVal;
            metrics["BLOOD_PRESSURE_DIASTOLIC"] = diaVal;
          }
        }

        if (Object.keys(metrics).length > 0) {
          requestBody.healthMetricRequestSetDTO = { metrics };
        }

        await updateClinicPage(selectedPageId, requestBody);

        showMessage("Clinic page updated successfully");

      } catch (error) {

        if (
          error.response?.status === 403 &&
          error.response?.data?.error === "EDIT_WINDOW_EXPIRED"
        ) {

          showConfirm(
            "Edit time expired. Do you want to request approval from the patient?",
            async () => {

              await requestEditApproval(selectedPageId);

              setApprovalRequestedPageId(selectedPageId);

              showMessage("Approval request sent to patient");

            }
          );

        } else {

          showMessage("Update failed");

        }

      }

    }
  );
};                                         


// const handleDelete = async () => {
//   try {

//     await deleteClinicPage(selectedPageId);

//     alert("🗑 Deleted successfully");

//     handleCreateNewPage();

//   } catch (error) {

//     if (
//       error.response?.status === 403 &&
//       error.response?.data?.error === "DELETE_WINDOW_EXPIRED_REQUEST_APPROVAL"
//     ) {

//       const confirmRequest = window.confirm(
//         "Delete time expired. Request approval from patient?"
//       );

//       if (confirmRequest) {
//         await requestEditApproval(selectedPageId);
//         alert("Approval request sent to patient email");
//       }

//     } else {
//       alert("Delete failed");
//     }

//   }
// };


const handleDelete = async () => {

  if (approvalRequestedPageId === selectedPageId) {
    showMessage("Patient approval is pending for this page.");
    return;
  }

  showConfirm(
    "Do you want to delete this clinic page?",
    async () => {

      try {

        await deleteClinicPage(selectedPageId);

        showMessage("Clinic page deleted successfully");

        handleCreateNewPage();

      } catch (error) {

        if (
          error.response?.status === 403 &&
          error.response?.data?.error === "DELETE_WINDOW_EXPIRED_REQUEST_APPROVAL"
        ) {

          showConfirm(
            "Delete time expired. Do you want to request approval from the patient?",
            async () => {

              await requestEditApproval(selectedPageId);

              setApprovalRequestedPageId(selectedPageId);

              showMessage("Approval request sent to patient");

            }
          );

        } else {

          showMessage("Delete failed");

        }

      }

    }
  );
};

  // ================= RENDER =================
  return (
    <>
      <DoctorNavBar patientData={patientInfo} />

      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-mainblack mb-6">
            Clinic Book Page
          </h1>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <PatientDetailsCard patientInfo={patientInfo} />
              <PastClinicPagesCard
                pastPages={pastPages}
                onViewPage={handleViewPage}
              />

              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={handleCreateNewPage}
                  className="px-4 py-2 w-full bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition"
                >
                  ➕ Create New Page
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <TodayPageFormCard
                formData={formData}
                onChange={(field, value) =>
                  setFormData((prev) => ({ ...prev, [field]: value }))
                }
                errors={errors}
              />

              <ExaminationAndTestsCard
                formData={formData}
                onChange={(field, value) =>
                  setFormData((prev) => ({ ...prev, [field]: value }))
                }
              />

              <VitalSignsCard
                formData={formData}
                onChange={(field, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    mediMessure: {
                      ...prev.mediMessure,
                      [field]: value,
                    },
                  }))
                }
              />
            </div>
          </div>

          <div className="pt-5 gap-5 flex flex-col">
            <AdditionalNotesCard
              formData={formData}
              onChange={(field, value) =>
                setFormData((prev) => ({ ...prev, [field]: value }))
              }
            />

            <MedicationCard
              formData={formData}
              onChange={(field, value) =>
                setFormData((prev) => ({ ...prev, [field]: value }))
              }
            />

            <div className="flex justify-between items-center mt-6">
              {isViewingOldPage ? (
                <div className="ml-auto flex gap-3">
                  <button
                    onClick={handleUpdate}
                    disabled={approvalRequestedPageId === selectedPageId}
                    className={`px-6 py-3 rounded-lg font-semibold text-white
                    ${approvalRequestedPageId === selectedPageId
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"}`}
                  >
                    ✏️ Update
                  </button>

                  <button
                    onClick={handleDelete}
                    disabled={approvalRequestedPageId === selectedPageId}
                    className={`px-6 py-3 rounded-lg font-semibold text-white
                    ${approvalRequestedPageId === selectedPageId
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"}`}
                  >
                    🗑️ Delete
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleComplete}
                  disabled={isCompleting}
                  className="ml-auto px-8 py-3 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition"
                >
                  {isCompleting ? "Completing..." : "✅ Complete"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center">
            <h2 className="text-xl font-bold text-green-600 mb-3">
              ✅ Clinic Page Saved
            </h2>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-6 py-2 bg-secondary text-white rounded-lg font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      )}


      {modal.open && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 text-center">

      <p className="text-gray-800 text-lg mb-6">
        {modal.message}
      </p>

      {modal.confirm ? (
        <div className="flex justify-center gap-4">

          <button
            onClick={() => {
              modal.onConfirm && modal.onConfirm();
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
