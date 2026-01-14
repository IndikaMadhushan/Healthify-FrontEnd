import Header from "./Header";
import UserProfile from "./UserProfile";
import Tabs from "./Tabs";
import TodaySection from "./TodaySection";
import AppointmentSection from "./AppointmentSection";
import MedicineSection from "./MedicineSection";
import OtherSection from "./OtherSection";
import PeriodSection from "./PeriodSection";
import Footer from "./Footer";
import { useState } from "react";
// import logo from "../../assets/logo.png";

export default function RemindersPage() {
  const [activeTab, setActiveTab] = useState("today");

  const [medicines, setMedicines] = useState([
    {
      id: 1,
      type: "Specific Day",
      time: "9:00AM",
      date: "2025-10-03",
      category: "Medicine",
      done: false,
    },
    {
      id: 2,
      type: "Specific Day",
      time: "9:00AM",
      date: "2025-10-03",
      category: "Medicine",
      done: false,
    },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: "2025-11-20",
      time: "9:00 AM",
      hospital: "Nawaloka Hospital",
      doctor: "Dr. Suren",
      note: "Note",
      done: false,
    },
  ]);

  const [otherReminders, setOtherReminders] = useState([
    {
      id: 1,
      date: "2025-11-20",
      time: "9:00 AM",
      note: "Check blood pressure",
      done: false,
    },
  ]);

  const markAsDone = (type, id) => {
    if (type === "medicine") {
      setMedicines(
        medicines.map((m) => (m.id === id ? { ...m, done: true } : m)),
      );
    }
    if (type === "appointment") {
      setAppointments(
        appointments.map((a) => (a.id === id ? { ...a, done: true } : a)),
      );
    }
    if (type === "other") {
      setOtherReminders(
        otherReminders.map((o) => (o.id === id ? { ...o, done: true } : o)),
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <img src={logo} className="w-28" />
          <div className="text-right"> */}
      {/* <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                
              </div> */}
      {/* <UserProfile />
          </div>
        
        </div>
      </header> */}

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

        {/* ✅ Tabs Component */}
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
