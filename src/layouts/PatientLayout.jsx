import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import AddReviewModal from "../components/AddReview";
import HealthifyChatbot from "../components/HealthifyChatbot";
import { PatinetNavBar } from "../components/PatientNavBar";
import {
  getCachedPatientProfile,
  getPatientProfileApi,
  PATIENT_PROFILE_UPDATED,
  syncPatientProfileCache,
} from "../api/PatientApi";
import { getSiteReviewEligibility } from "../api/SiteReviewApi";

const PHOTO_URL_REFRESH_BUFFER_MS = 60 * 1000;

function parseAmzTimestamp(value) {
  const match = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/.exec(value);
  if (!match) {
    return null;
  }

  return Date.UTC(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    Number(match[4]),
    Number(match[5]),
    Number(match[6]),
  );
}

function getPhotoUrlExpiryTime(photoUrl) {
  if (!photoUrl || typeof photoUrl !== "string") {
    return null;
  }

  try {
    const url = new URL(photoUrl, window.location.origin);
    const epochExpires =
      url.searchParams.get("Expires") || url.searchParams.get("expires");

    if (epochExpires && /^\d+$/.test(epochExpires)) {
      const expiresAt = Number(epochExpires);
      return expiresAt > 1e12 ? expiresAt : expiresAt * 1000;
    }

    const amzExpires = url.searchParams.get("X-Amz-Expires");
    const amzDate = url.searchParams.get("X-Amz-Date");

    if (amzExpires && amzDate && /^\d+$/.test(amzExpires)) {
      const issuedAt = parseAmzTimestamp(amzDate);
      if (issuedAt) {
        return issuedAt + Number(amzExpires) * 1000;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export default function PatientLayout() {
  const [patient, setPatient] = useState(() => getCachedPatientProfile());
  const [loading, setLoading] = useState(() => !getCachedPatientProfile());
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [reviewEligibilityChecked, setReviewEligibilityChecked] = useState(false);
  const handledPhotoErrorRef = useRef("");

  const refreshPatientProfile = useCallback(async (force = false) => {
    const res = await getPatientProfileApi({ force });
    const nextPatient = force ? syncPatientProfileCache(res.data) : res.data;
    setPatient(nextPatient);
    return nextPatient;
  }, []);

  useEffect(() => {
    const loadPatient = async () => {
      try {
        await refreshPatientProfile();
      } catch (err) {
        console.error("Failed to load patient data", err);
      } finally {
        setLoading(false);
      }
    };

    void loadPatient();
  }, [refreshPatientProfile]);

  useEffect(() => {
    const handlePatientProfileUpdated = (event) => {
      if (event.detail) {
        setPatient(event.detail);
        setLoading(false);
        return;
      }

      const cachedPatient = getCachedPatientProfile();
      if (cachedPatient) {
        setPatient(cachedPatient);
        setLoading(false);
      }
    };

    window.addEventListener(PATIENT_PROFILE_UPDATED, handlePatientProfileUpdated);
    return () => {
      window.removeEventListener(
        PATIENT_PROFILE_UPDATED,
        handlePatientProfileUpdated,
      );
    };
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

  useEffect(() => {
    const photoUrl = patient?.photoUrl;
    const expiresAt = getPhotoUrlExpiryTime(photoUrl);

    if (!photoUrl || !expiresAt) {
      return undefined;
    }

    const refreshInMs = Math.max(
      expiresAt - Date.now() - PHOTO_URL_REFRESH_BUFFER_MS,
      0,
    );

    const timeoutId = window.setTimeout(() => {
      void refreshPatientProfile(true);
    }, refreshInMs);

    return () => window.clearTimeout(timeoutId);
  }, [patient?.photoUrl, refreshPatientProfile]);

  useEffect(() => {
    if (!patient?.photoUrl || patient.photoUrl !== handledPhotoErrorRef.current) {
      handledPhotoErrorRef.current = "";
    }
  }, [patient?.photoUrl]);

  const handlePatientPhotoError = useCallback(
    async (event) => {
      const failedPhotoUrl =
        event?.currentTarget?.currentSrc ||
        event?.currentTarget?.src ||
        patient?.photoUrl;

      if (!failedPhotoUrl || handledPhotoErrorRef.current === failedPhotoUrl) {
        return;
      }

      handledPhotoErrorRef.current = failedPhotoUrl;

      try {
        await refreshPatientProfile(true);
      } catch (error) {
        console.error(
          "Failed to refresh patient profile after photo load error",
          error,
        );
      }
    },
    [patient?.photoUrl, refreshPatientProfile],
  );

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
      <PatinetNavBar
        patientData={patient}
        onProfileImageError={handlePatientPhotoError}
      />
      <Outlet />
      <AddReviewModal
        isOpen={showReviewPrompt}
        onClose={handleCloseReviewPrompt}
        onSubmitted={handleSubmittedReview}
      />
      <HealthifyChatbot
        contextUserId={patient?.id ? String(patient.id) : undefined}
        contextLabel={
          patient?.id
            ? "Your health context is enabled for more personalized guidance."
            : undefined
        }
        launcherOffsetClassName="bottom-20 sm:bottom-6"
      />
    </>
  );
}
