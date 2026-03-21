import axiosInstance from "./axiosInstance";

const DOCTOR_CACHE_KEY = "doctor_me_cache";
const DOCTOR_CACHE_TTL_MS = 5 * 60 * 1000;
const DOCTOR_PROFILE_UPDATED_EVENT = "doctor-profile-updated";
let doctorProfileRequest = null;

function dispatchDoctorProfileUpdated(data) {
  window.dispatchEvent(
    new CustomEvent(DOCTOR_PROFILE_UPDATED_EVENT, {
      detail: data,
    }),
  );
}

function setDoctorProfileCache(data) {
  localStorage.setItem(
    DOCTOR_CACHE_KEY,
    JSON.stringify({
      data,
      expiresAt: Date.now() + DOCTOR_CACHE_TTL_MS,
    }),
  );
}

export function getCachedDoctorProfile() {
  const cached = localStorage.getItem(DOCTOR_CACHE_KEY);
  if (!cached) {
    return null;
  }

  try {
    const parsed = JSON.parse(cached);
    if (Date.now() >= parsed.expiresAt) {
      localStorage.removeItem(DOCTOR_CACHE_KEY);
      return null;
    }
    return parsed.data ?? null;
  } catch (error) {
    console.error("Failed to parse doctor cache", error);
    localStorage.removeItem(DOCTOR_CACHE_KEY);
    return null;
  }
}

export function clearDoctorProfileCache() {
  localStorage.removeItem(DOCTOR_CACHE_KEY);
}

export function syncDoctorProfileCache(data) {
  setDoctorProfileCache(data);
  dispatchDoctorProfileUpdated(data);
}

export const DOCTOR_PROFILE_UPDATED = DOCTOR_PROFILE_UPDATED_EVENT;

export const getMyDoctorProfile = async (options = {}) => {
  const { force = false } = options;
  const cachedDoctor = force ? null : getCachedDoctorProfile();
  if (cachedDoctor) {
    return { data: cachedDoctor };
  }

  if (doctorProfileRequest) {
    return doctorProfileRequest;
  }

  doctorProfileRequest = axiosInstance
    .get("/api/doctors/me")
    .then((res) => {
      setDoctorProfileCache(res.data);
      return res;
    })
    .finally(() => {
      doctorProfileRequest = null;
    });

  return doctorProfileRequest;
};

export const updateMyDoctorProfile = async (data) => {
  await axiosInstance.post("/api/doctors/me", data);
  const latestProfile = await getMyDoctorProfile({ force: true });
  syncDoctorProfileCache(latestProfile.data);
  return latestProfile;
};

export const uploadMyDoctorProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axiosInstance.post(
    "/api/doctors/me/profile-image",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  const photoUrl = typeof res.data === "string" ? res.data : res.data?.photoUrl;
  const cachedDoctor = getCachedDoctorProfile();

  if (photoUrl && cachedDoctor) {
    const updatedDoctor = {
      ...cachedDoctor,
      photoUrl,
    };
    syncDoctorProfileCache(updatedDoctor);
  } else {
    const latestProfile = await getMyDoctorProfile({ force: true });
    syncDoctorProfileCache(latestProfile.data);
  }

  return res;
};

export const getDoctorProfileApi = getMyDoctorProfile;
export const updateMyProfile = updateMyDoctorProfile;
export const uploadDoctorProfileImageApi = uploadMyDoctorProfileImage;

export const getDoctorPatientProfileApi = (patientId) =>
  axiosInstance.get(`/api/doctors/patients/${patientId}`);
