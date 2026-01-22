import { Bell, Plus } from "lucide-react";

export default function TodaySection({
  medicines,
  appointments,
  otherReminders,
  onMarkAsDone,
  onShowMedicineForm,
  onShowAppointmentForm,
  onShowOtherForm,
}) {
  return (
    <div className="space-y-6">
      <div className="text-black text-xl sm:text-2xl md:text-[30px] font-semibold">
        <p className="text-l sm:text-xl md:text-2xl font-semibold text-black">
          Today Reminders
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h2 className="text-black font-semibold text-base sm:text-lg">
            Medicine
          </h2>

          <button
            onClick={onShowMedicineForm}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 w-full sm:w-auto text-sm sm:text-base"
          >
            <Plus className="inline w-4 h-4 mr-1" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {medicines.map((med) => (
            <div
              key={med.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-3 sm:p-4 gap-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full text-sm sm:text-base">
                <span className="text-teal-600 break-words">{med.type}</span>
                <span>{med.time}</span>
                <span>{med.date}</span>
                <span className="text-red-400 break-words">{med.category}</span>
              </div>

              <button
                onClick={() => onMarkAsDone("medicine", med.id)}
                className={`px-4 py-1 rounded border w-full sm:w-auto ${
                  med.done
                    ? "bg-white text-gray-400 border-gray-300 cursor-not-allowed"
                    : "bg-white text-teal-600 border-teal-500 hover:bg-teal-50 hover:border-teal-500"
                }`}
                disabled={med.done}
              >
                {med.done ? "Done" : "Done"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h2 className="text-black font-semibold text-base sm:text-lg">
            Appointments
          </h2>
          <button
            onClick={onShowAppointmentForm}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 w-full sm:w-auto text-sm sm:text-base"
          >
            <Plus className="inline w-4 h-4 mr-1" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-3 sm:p-4 gap-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center w-full gap-3">
                <div>
                  <div className="font-semibold pr-0 sm:pr-5">{apt.date}</div>
                  <div className="text-sm text-gray-600 pr-0 sm:pr-5">
                    {apt.time}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full text-sm sm:text-base">
                  <span className="text-green-600 break-words">
                    {apt.hospital}
                  </span>
                  <span className="break-words">{apt.doctor}</span>
                  {apt.note && (
                    <span className="text-red-400 text-sm pr-0 sm:pr-5">
                      {apt.note}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onMarkAsDone("appointment", apt.id)}
                className={`px-4 py-1 rounded border w-full sm:w-auto ${
                  apt.done
                    ? "bg-white text-gray-400 border-gray-300 cursor-not-allowed"
                    : "bg-white text-teal-600 border-teal-500 hover:bg-teal-50 hover:border-teal-500"
                }`}
                disabled={apt.done}
              >
                {apt.done ? "Done" : "Done"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h2 className="text-black font-semibold text-base sm:text-lg">
            Other
          </h2>
          <button
            onClick={onShowOtherForm}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 w-full sm:w-auto text-sm sm:text-base"
          >
            <Plus className="inline w-4 h-4 mr-1" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {otherReminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-3 sm:p-4 gap-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2">
                <div>
                  <div className="font-semibold">{reminder.date}</div>
                  <div className="text-sm text-gray-600">{reminder.time}</div>
                </div>
                <span className="text-green-600 break-words">
                  {reminder.note}
                </span>
              </div>
              <button
                onClick={() => onMarkAsDone("other", reminder.id)}
                className={`px-4 py-1 rounded border w-full sm:w-auto ${
                  reminder.done
                    ? "bg-white text-gray-400 border-gray-300 cursor-not-allowed"
                    : "bg-white text-teal-600 border-teal-500 hover:bg-teal-50 hover:border-teal-500"
                }`}
                disabled={reminder.done}
              >
                {reminder.done ? "Done" : "Done"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
