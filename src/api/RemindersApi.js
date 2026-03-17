import axiosInstance from "./axiosInstance";

// Medicine reminders for logged-in patient
export const getMedicineRemindersApi = async () => {
  try {
    const res = await axiosInstance.get("/api/reminders/medicines");
    return res.data || [];
  } catch (error) {
    console.error("Error fetching medicine reminders:", error);
    return [];
  }
};

// Appointment reminders for logged-in patient
export const getAppointmentRemindersApi = async () => {
  try {
    const res = await axiosInstance.get("/api/reminders/appointments");
    return res.data || [];
  } catch (error) {
    console.error("Error fetching appointment reminders:", error);
    return [];
  }
};

// Period tracker data for logged-in patient
export const getPeriodTrackerApi = async () => {
  try {
    const res = await axiosInstance.get("/api/reminders/period-tracker");
    return res.data;
  } catch (error) {
    console.error("Error fetching period tracker:", error);
    return null;
  }
};

// Update period tracker
export const updatePeriodTrackerApi = async (data) => {
  try {
    const res = await axiosInstance.put("/api/reminders/period-tracker", data);
    return res.data;
  } catch (error) {
    console.error("Error updating period tracker:", error);
    throw error;
  }
};

// Delete period tracker
export const deletePeriodTrackerApi = async (id) => {
  try {
    const res = await axiosInstance.delete(`/api/reminders/period-tracker/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting period tracker:", error);
    throw error;
  }
};

// Other reminders for logged-in patient
export const getOtherRemindersApi = async () => {
  try {
    const res = await axiosInstance.get("/api/reminders/other");
    return res.data || [];
  } catch (error) {
    console.error("Error fetching other reminders:", error);
    return [];
  }
};
