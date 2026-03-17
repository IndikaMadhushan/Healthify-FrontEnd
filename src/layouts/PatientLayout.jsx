import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AddReviewModal from "../components/AddReview";
import { PatinetNavBar } from "../components/PatientNavBar";
import { getPatientProfileApi } from "../api/PatientApi";
import { getSiteReviewEligibility } from "../api/SiteReviewApi";

export default function PatientLayout() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [reviewEligibilityChecked, setReviewEligibilityChecked] = useState(false);

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const res = await getPatientProfileApi();
        setPatient(res.data);
      } catch (err) {
        console.error("Failed to load patient data", err);
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, []);

  useEffect(() => {
    if (!patient?.id || reviewEligibilityChecked) return;

    const checkReviewEligibility = async () => {
      try {
        const eligibility = await getSiteReviewEligibility();

        if (eligibility?.canPrompt === true && eligibility?.reason === "CAN_SUBMIT") {
          setShowReviewPrompt(true);
        }
      } catch (error) {
        console.error("Failed to load site review eligibility", error);
      } finally {
        setReviewEligibilityChecked(true);
      }
    };

    checkReviewEligibility();
  }, [patient, reviewEligibilityChecked]);

  const handleCloseReviewPrompt = () => {
    setShowReviewPrompt(false);
  };

  const handleSubmittedReview = () => {
    setShowReviewPrompt(false);
    setReviewEligibilityChecked(true);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <>
      <PatinetNavBar patientData={patient} />
      <Outlet />
      <AddReviewModal
        isOpen={showReviewPrompt}
        onClose={handleCloseReviewPrompt}
        onSubmitted={handleSubmittedReview}
      />
    </>
  );
}
