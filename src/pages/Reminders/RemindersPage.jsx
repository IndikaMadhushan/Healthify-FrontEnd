import Tabs from "./Tabs";
import TodaySection from "./TodaySection";
import AppointmentSection from "./AppointmentSection";
import MedicineSection from "./MedicineSection";
import OtherSection from "./OtherSection";
import PeriodSection from "./PeriodSection";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  getMedicinesApi,
  getAppointmentsApi,
  getOtherRemindersApi,
  getPeriodHistoryApi,
  deactivateOtherReminderApi,
} from "../../api/ReminderApi";

export default function RemindersPage() {
  const [activeTab, setActiveTab] = useState("today");
  const [medicines, setMedicines] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [otherReminders, setOtherReminders] = useState([]);


  const markAsDone = async (type, id) => {
    try {
      if (type === "appointment") {
        await markAppointmentDoneApi(id);
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, done: true } : a))
        );
      }

      if (type === "medicine") {
        await deactivateMedicineApi(id);
        setMedicines((prev) => prev.filter((m) => m.id !== id));
      }

      if (type === "other") {
        await deactivateOtherReminderApi(id);
        setOtherReminders((prev) => prev.filter((o) => o.id !== id));
      }
    } catch (err) {
      console.error("Failed to update reminder", err);
    }
  };


  useEffect(() => {
    const loadReminders = async () => {
      try {
        const profileRes = await axiosInstance.get("/api/patients/me");
        const patientId = profileRes.data.id;

        const [medRes, aptRes, otherRes] = await Promise.all([
          getMedicinesApi(patientId),
          getAppointmentsApi(patientId),
          getOtherRemindersApi(patientId),
        ]);

        setMedicines(medRes.data);
        setAppointments(aptRes.data);
        setOtherReminders(otherRes.data);
      } catch (err) {
        console.error("Failed to load reminders", err);
      }
    };

    loadReminders();
  }, []);



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">


      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-grow">
        {/* Page Title */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-[10px] sm:text-3xl md:text-4xl font-bold text-teal-500">
            Personal Health Reminder
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">
            Track your health, stay on schedule
          </p>
        </div>

        {/*Tabs Component */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* <h1>Today Reminders</h1> */}

        {/* Content */}
        <div className="mt-4 sm:mt-6 md:mt-8">
          {activeTab === "today" && (
            <TodaySection
              medicines={medicines}
              appointments={appointments}
              otherReminders={otherReminders}
              onMarkAsDone={markAsDone}
              onShowMedicineForm={() => setActiveTab("medicine")}
              onShowAppointmentForm={() => setActiveTab("appointment")}
              onShowOtherForm={() => setActiveTab("other")}
            />
          )}

          {activeTab === "medicine" && (
            <MedicineSection medicines={medicines} onMarkAsDone={markAsDone} />
          )}

          {activeTab === "appointment" && (
            <AppointmentSection
              appointments={appointments}
              onMarkAsDone={markAsDone}
            />
          )}

          {activeTab === "period" && <PeriodSection />}
          {activeTab === "other" && (
            <OtherSection
              otherReminders={otherReminders}
              onMarkAsDone={markAsDone}
            />
          )}
        </div>
      </div>
    </div>
  );
}
