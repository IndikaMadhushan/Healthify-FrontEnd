import axiosInstance from "./axiosInstance";

const PATIENT_CACHE_KEY = "patient_me_cache";
const PATIENT_CACHE_TTL_MS = 5 * 60 * 1000;
const PATIENT_PROFILE_UPDATED_EVENT = "patient-profile-updated";

function buildPatientFullName(patient = {}) {
    return [patient.firstName, patient.secondName, patient.lastName]
        .map((part) => (typeof part === "string" ? part.trim() : ""))
        .filter(Boolean)
        .join(" ");
}

function appendCacheBust(url, version = Date.now()) {
    if (typeof url !== "string" || !url.trim()) {
        return url;
    }

    const [base, hash = ""] = url.split("#");
    const [path, query = ""] = base.split("?");
    const params = new URLSearchParams(query);
    params.set("t", String(version));

    const nextUrl = `${path}?${params.toString()}`;
    return hash ? `${nextUrl}#${hash}` : nextUrl;
}

function normalizePatientProfile(data, options = {}) {
    if (!data || typeof data !== "object") {
        return data;
    }

    const normalized = { ...data };
    const fullName = buildPatientFullName(normalized);

    if (fullName) {
        normalized.fullName = fullName;
    }

    if (options.bustPhotoCache && normalized.photoUrl) {
        normalized.photoUrl = appendCacheBust(
            normalized.photoUrl,
            options.photoVersion,
        );
    }

    return normalized;
}

function dispatchPatientProfileUpdated(data) {
    if (typeof window === "undefined") {
        return;
    }

    window.dispatchEvent(
        new CustomEvent(PATIENT_PROFILE_UPDATED_EVENT, {
            detail: data,
        }),
    );
}

function setPatientProfileCache(data, options = {}) {
    const normalized = normalizePatientProfile(data, options);

    localStorage.setItem(
        PATIENT_CACHE_KEY,
        JSON.stringify({
            data: normalized,
            expiresAt: Date.now() + PATIENT_CACHE_TTL_MS,
        }),
    );

    return normalized;
}

export function getCachedPatientProfile() {
    const cached = localStorage.getItem(PATIENT_CACHE_KEY);

    if (!cached) {
        return null;
    }

    try {
        const parsed = JSON.parse(cached);

        if (!parsed || typeof parsed !== "object") {
            localStorage.removeItem(PATIENT_CACHE_KEY);
            return null;
        }

        if (!("data" in parsed)) {
            return normalizePatientProfile(parsed);
        }

        if (Date.now() >= parsed.expiresAt) {
            localStorage.removeItem(PATIENT_CACHE_KEY);
            return null;
        }

        return normalizePatientProfile(parsed.data);
    } catch (error) {
        console.error("Failed to parse patient cache", error);
        localStorage.removeItem(PATIENT_CACHE_KEY);
        return null;
    }
}

export function clearPatientProfileCache() {
    localStorage.removeItem(PATIENT_CACHE_KEY);
}

export function syncPatientProfileCache(data, options = {}) {
    const normalized = setPatientProfileCache(data, options);
    dispatchPatientProfileUpdated(normalized);
    return normalized;
}

export const PATIENT_PROFILE_UPDATED = PATIENT_PROFILE_UPDATED_EVENT;

// logged-in patient profile
export const getPatientProfileApi = async (options = {}) => {
    const { force = false } = options;
    const cachedPatient = force ? null : getCachedPatientProfile();

    if (cachedPatient) {
        return { data: cachedPatient };
    }

    const res = await axiosInstance.get("/api/patients/me");
    const normalized = setPatientProfileCache(res.data);

    return {
        ...res,
        data: normalized,
    };
};

// patient profile by id
export const getPatientProfileByIdApi = (patientId) =>
    axiosInstance.get(`/api/patients/${patientId}`);


// Update patient profile
export const updatePatientProfileApi = async (patientId, payload) => {
    await axiosInstance.put(`/api/patients/${patientId}`, payload);

    const latestProfile = await getPatientProfileApi({ force: true });
    const normalized = syncPatientProfileCache(latestProfile.data);

    return {
        ...latestProfile,
        data: normalized,
    };
};

// Load patient medical info
export const getPatientMedicalInfoApi = (patientId) =>
    axiosInstance.get(`/api/patients/${patientId}/medical-info`);

// Save patient medical info
export const updatePatientMedicalInfoApi = (patientId, payload) =>
    axiosInstance.put(`/api/patients/${patientId}/medical-info`, payload);


// Upload profile image
export const uploadPatientProfileImageApi = async (patientId, file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axiosInstance.post(
        `/api/patients/${patientId}/profile-image`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
    );

    const photoUrl = typeof res.data === "string" ? res.data : res.data?.photoUrl;
    const photoVersion = Date.now();
    const cachedPatient = getCachedPatientProfile();

    if (photoUrl && cachedPatient && String(cachedPatient.id) === String(patientId)) {
        syncPatientProfileCache(
            {
                ...cachedPatient,
                photoUrl,
            },
            {
                bustPhotoCache: true,
                photoVersion,
            },
        );
        return res;
    }

    const latestProfile = await getPatientProfileApi({ force: true });
    syncPatientProfileCache(latestProfile.data, {
        bustPhotoCache: true,
        photoVersion,
    });

    return res;
};


// BMI
export const getPatientBmiApi = (patientId) =>
    axiosInstance.get(`/api/patients/${patientId}/bmi`);

// Medicine reminders
export const getMedicineRemindersApi = (patientId) =>
    axiosInstance.get(`/api/reminders/${patientId}`);

// Appointments
export const getAppointmentRemindersApi = (patientId) =>
    axiosInstance.get(`/api/appointments/${patientId}`);

// Period reminders
export const getPeriodRemindersApi = (patientId) =>
    axiosInstance.get(`/api/reminders/period/${patientId}`);

// Other reminders
export const getOtherRemindersApi = (patientId) =>
    axiosInstance.get(`/api/reminders/other/${patientId}`);

// Health metrics (graphs)
export const getPatientMetricGraphApi = (patientId, metricType) =>
    axiosInstance.get(
        `/api/metrics/${patientId}/graph`,
        { params: { metricType } }
    );

// Add health metric
export const addPatientMetricApi = (patientId, metricType, value) =>
    axiosInstance.post(
        `/api/metrics/${patientId}`,
        null,
        { params: { metricType, value } }
    );

    
//list all patients
export const getAllPatients = () =>
    axiosInstance.get(`/api/patients/all`);
