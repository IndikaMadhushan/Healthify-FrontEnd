import axiosInstance from "./axiosInstance";

const DOCTOR_CACHE_KEY = "doctor_me_cache";
const DOCTOR_CACHE_TTL_MS = 5 * 60 * 1000;
const DOCTOR_PROFILE_UPDATED_EVENT = "doctor-profile-updated";

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

export const getDoctorProfileApi = async (options = {}) => {
  const { force = false } = options;
  const cachedDoctor = force ? null : getCachedDoctorProfile();
  if (cachedDoctor) {
    return { data: cachedDoctor };
  }

  const res = await axiosInstance.get("/api/doctors/me");
  setDoctorProfileCache(res.data);
  return res;
};

export const updateMyProfile = async (data) => {
  const res = await axiosInstance.post("/api/doctors/me", data);
  if (res?.data && typeof res.data === "object") {
    syncDoctorProfileCache(res.data);
    return res;
  }

  return getDoctorProfileApi({ force: true });
};

export const uploadDoctorProfileImageApi = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axiosInstance.post(
    "/api/doctors/me/profile-image",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  if (res?.data && typeof res.data === "object") {
    syncDoctorProfileCache(res.data);
    return res;
  }

  return getDoctorProfileApi({ force: true });
};
