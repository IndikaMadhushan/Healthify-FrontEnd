import axiosInstance from "./axiosInstance";

//appointments

export const getAppointmentsApi = (patientId) =>
  axiosInstance.get(`/api/appointments/${patientId}`);

export const addAppointmentApi = (patientId, data) =>
  axiosInstance.post(`/api/appointments/${patientId}`, data);

export const markAppointmentDoneApi = (appointmentId) =>
  axiosInstance.put(`/api/appointments/${appointmentId}/complete`);

//Medicines

export const getMedicinesApi = (patientId) =>
  axiosInstance.get(`/api/reminders/${patientId}`);

export const addMedicineApi = (patientId, data) =>
  axiosInstance.post(`/api/reminders/${patientId}`, data);

export const deactivateMedicineApi = (reminderId) =>
  axiosInstance.put(`/api/reminders/${reminderId}`);

//other reminders

export const getOtherRemindersApi = (patientId) =>
  axiosInstance.get(`/api/reminders/other/${patientId}`);

export const addOtherReminderApi = (patientId, data) =>
  axiosInstance.post(`/api/reminders/other/${patientId}`, data);

export const deactivateOtherReminderApi = (reminderId) =>
  axiosInstance.put(`/api/reminders/other/${reminderId}/deactivate`);

//period

export const getPeriodHistoryApi = (patientId) =>
  axiosInstance.get(`/api/reminders/period/${patientId}`);

export const updatePeriodDateApi = (patientId, date) =>
  axiosInstance.post(`/api/reminders/period/${patientId}`, null, {
    params: { date },
  });