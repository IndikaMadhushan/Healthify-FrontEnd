import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getMedicineRemindersApi,
  getAppointmentRemindersApi,
  getPeriodTrackerApi,
  getOtherRemindersApi,
} from "../../api/RemindersApi";
import PeriodTracker from "./components/PeriodTracker";

export default function RemindersPage() {
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState({
    medicines: [],
    appointments: [],
    other: [],
  });

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const [medicinesRes, appointmentsRes, otherRes] = await Promise.all([
        getMedicineRemindersApi(),
        getAppointmentRemindersApi(),
        getOtherRemindersApi(),
      ]);

      setReminders({
        medicines: medicinesRes || [],
        appointments: appointmentsRes || [],
        other: otherRes || [],
      });
    } catch (error) {
      console.error("Error fetching reminders:", error);
      toast.error("Failed to load reminders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading reminders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Reminders</h1>

        {/* Period Tracker Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Period Tracker
          </h2>
          <PeriodTracker />
        </div>

        {/* Medicine Reminders Section */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Medicine Reminders
          </h2>
          {reminders.medicines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reminders.medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="p-4 border border-blue-200 rounded-lg bg-blue-50"
                >
                  <p className="font-semibold text-gray-900">
                    {medicine.name || medicine.medicineName}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {medicine.dosage || medicine.dose} - {medicine.frequency}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {medicine.time || medicine.reminderTime}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No medicine reminders set</p>
          )}
        </div>

        {/* Appointment Reminders Section */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Appointment Reminders
          </h2>
          {reminders.appointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reminders.appointments.map((appointment, index) => (
                <div
                  key={index}
                  className="p-4 border border-green-200 rounded-lg bg-green-50"
                >
                  <p className="font-semibold text-gray-900">
                    {appointment.doctorName || appointment.appointmentTitle}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {new Date(appointment.appointmentDate).toLocaleDateString()} at{" "}
                    {appointment.appointmentTime || appointment.time}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {appointment.clinicName || appointment.location}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No appointment reminders set</p>
          )}
        </div>

        {/* Other Reminders Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Other Reminders
          </h2>
          {reminders.other.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reminders.other.map((reminder, index) => (
                <div
                  key={index}
                  className="p-4 border border-purple-200 rounded-lg bg-purple-50"
                >
                  <p className="font-semibold text-gray-900">
                    {reminder.title || reminder.reminderTitle}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {reminder.description}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {reminder.reminderDate &&
                      new Date(reminder.reminderDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No other reminders set</p>
          )}
        </div>
      </div>
    </div>
  );
}
