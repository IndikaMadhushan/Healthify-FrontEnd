import axiosInstance from "./axiosInstance";

// logged-in patient profile
export const getPatientProfileApi = async () => {

    const cached = localStorage.getItem("patient_me_cache");

    if (cached) {
        const { data, expiresAt } = JSON.parse(cached);
        if (Date.now() < expiresAt) {
            return { data };
        }
    }

    const res = await axiosInstance.get("/api/patients/me");

    localStorage.setItem(
        "patient_me_cache",
        JSON.stringify({
            data: res.data,
            expiresAt: Date.now() + 5 * 60 * 1000 // 5 min
        })
    );

    return res;
}

// patient profile by id
export const getPatientProfileByIdApi = (patientId) =>
    axiosInstance.get(`/api/patients/${patientId}`);


// Update patient profile
export const updatePatientProfileApi = (patientId, payload) =>
    axiosInstance.put(`/api/patients/${patientId}`, payload);

// Load patient medical info
export const getPatientMedicalInfoApi = (patientId) =>
    axiosInstance.get(`/api/patients/${patientId}/medical-info`);

// Save patient medical info
export const updatePatientMedicalInfoApi = (patientId, payload) =>
    axiosInstance.put(`/api/patients/${patientId}/medical-info`, payload);


// Upload profile image
export const uploadPatientProfileImageApi = (patientId, file) => {
    const formData = new FormData();
    formData.append("image", file);

    return axiosInstance.post(
        `/api/patients/${patientId}/profile-image`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
    );
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
