import axiosInstance from "./axiosInstance";
import { jwtDecode } from "jwt-decode";


const FILE_BASE_URL = axiosInstance.defaults.baseURL || "";

export const buildAdminFileUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (!FILE_BASE_URL) return url;
  if (url.startsWith("/")) return `${FILE_BASE_URL}${url}`;
  return `${FILE_BASE_URL}/${url}`;
};

export const getAdminProfileApi = async () => {
  try {
    const response = await axiosInstance.get("/api/admin/me");
    return response.data;
  } catch (error) {
    const token = localStorage.getItem("token");
    if (!token) throw error;

    const decoded = jwtDecode(token);
    return {
      id: decoded.userId || decoded.id || decoded.sub || "ADMIN",
      email: decoded.email || decoded.sub || "",
      name: decoded.name || decoded.username || "Admin",
    };
  }
};

// Get pending doctor registrations
export const getPendingDoctorsApi = async () => {
  const response = await axiosInstance.get(`/api/admin/pending-doctors`);
  return response.data;
};

// Approve doctor by user ID
export const approveDoctorApi = async (userId) => {
  const response = await axiosInstance.put(`/api/admin/approve-doctor/${userId}`);
  return response.data;
};

// Reject doctor by user ID
export const rejectDoctorApi = async (userId) => {
  const response = await axiosInstance.delete(`/api/admin/reject-doctor/${userId}`);
  return response.data;
};

// Get doctor details by doctor ID
export const getDoctorByIdApi = async (doctorId) => {
  const response = await axiosInstance.get(`/api/admin/doctors/${doctorId}`);
  return response.data;
};

// Toggle doctor account status by doctor ID
export const toggleDoctorStatusApi = async (doctorId) => {
  const response = await axiosInstance.put(`/api/admin/doctors/${doctorId}/toggle-status`);
  return response.data;
};

// Get patient details by patient ID (returns limited info for admin)
export const getPatientByIdApi = async (patientId) => {
  const response = await axiosInstance.get(`/api/admin/patients/${patientId}`);
  return response.data;
};

// Toggle patient account status by patient ID
export const togglePatientStatusApi = async (patientId) => {
  const response = await axiosInstance.put(`/api/admin/patients/${patientId}/toggle-status`);
  return response.data;
};

// Get all audit logs
export const getAllAuditLogsApi = async () => {
  const response = await axiosInstance.get(`/api/admin/audit-logs`);
  return response.data;
};

// Get audit logs by patient ID
export const getAuditLogsByPatientApi = async (patientId) => {
  const response = await axiosInstance.get(`/api/admin/audit-logs/patient/${patientId}`);
  return response.data;
};

// Get audit logs by doctor email
export const getAuditLogsByDoctorApi = async (doctorEmail) => {
  const response = await axiosInstance.get(`/api/admin/audit-logs/doctor`, {
    params: { email: doctorEmail }
  });
  return response.data;
};