import axiosInstance from "./axiosInstance";

/* ================= MEDICINE ================= */

export const getMedicineRemindersApi = async () => {
  const res = await axiosInstance.get("/api/ui/reminders/medicines");
  return res.data;
};

export const createMedicineReminderApi = async (data) => {
  const res = await axiosInstance.post("/api/ui/reminders/medicines", data);
  return res.data;
};

export const updateMedicineReminderApi = async (id, data) => {
  const res = await axiosInstance.put(`/api/ui/reminders/medicines/${id}`, data);
  return res.data;
};

export const deleteMedicineReminderApi = async (id) => {
  return axiosInstance.delete(`/api/ui/reminders/medicines/${id}`);
};

/* ================= APPOINTMENT ================= */

export const getAppointmentRemindersApi = async () => {
  const res = await axiosInstance.get("/api/ui/reminders/appointments");
  return res.data;
};

export const createAppointmentReminderApi = async (data) => {
  const res = await axiosInstance.post("/api/ui/reminders/appointments", data);
  return res.data;
};

export const updateAppointmentReminderApi = async (id, data) => {
  const res = await axiosInstance.put(`/api/ui/reminders/appointments/${id}`, data);
  return res.data;
};

export const deleteAppointmentReminderApi = async (id) => {
  return axiosInstance.delete(`/api/ui/reminders/appointments/${id}`);
};

/* ================= OTHER ================= */

export const getOtherRemindersApi = async () => {
  const res = await axiosInstance.get("/api/ui/reminders/others");
  return res.data;
};

export const createOtherReminderApi = async (data) => {
  const res = await axiosInstance.post("/api/ui/reminders/others", data);
  return res.data;
};

export const updateOtherReminderApi = async (id, data) => {
  const res = await axiosInstance.put(`/api/ui/reminders/others/${id}`, data);
  return res.data;
};

export const deleteOtherReminderApi = async (id) => {
  return axiosInstance.delete(`/api/ui/reminders/others/${id}`);
};

/* ================= PERIOD ================= */

export const getPeriodTrackerApi = async () => {
  const res = await axiosInstance.get("/api/ui/reminders/period");
  return res.data;
};

export const updatePeriodTrackerApi = async (data) => {
  const res = await axiosInstance.post("/api/ui/reminders/period", data);
  return res.data;
};

export const deletePeriodTrackerApi = async () => {
  return axiosInstance.delete("/api/ui/reminders/period");
};
