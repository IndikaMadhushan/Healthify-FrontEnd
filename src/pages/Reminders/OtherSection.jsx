import React from "react";

export default function OtherSection({ otherReminders }) {
  // if the page shows an erro add this para meter to this fucntion 'onMarkAsDone'
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl text-black font-semibold mb-4 sm:mb-6">
          Add Reminder
        </h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 sm:space-x-4">
            <button className="px-4 py-2 border rounded text-black bg-white border-teal-500 hover:bg-teal-50 flex-1 sm:flex-none min-w-[80px]">
              Daily
            </button>
            <button className="px-4 py-2 border rounded text-black bg-white border-teal-500 hover:bg-teal-50 flex-1 sm:flex-none min-w-[80px]">
              Weekly
            </button>
            <button className="px-4 py-2 border rounded text-black bg-white border-teal-500 hover:bg-teal-50 flex-1 sm:flex-none min-w-[100px]">
              Specific Day
            </button>
            <button className="px-4 py-2 border rounded text-black bg-white border-teal-500  hover:bg-teal-50 flex-1 sm:flex-none min-w-[80px]">
              Other
            </button>
          </div>

          <div>
            <label className="block mb-2 font-medium text-black">Date</label>
            <div className="flex gap-1 sm:gap-2 mb-2 overflow-x-auto pb-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <button
                  key={day}
                  className="px-3 sm:px-4 py-2 border rounded border-teal-500 text-black bg-white hover:bg-gray-50 flex-shrink-0 text-sm sm:text-base"
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-black">Time</label>
            <input
              type="time"
              className="w-full border rounded px-3 py-2 bg-slate-50 text-black [color-scheme:light]"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-black">Note</label>
            <textarea
              className="w-full border rounded px-3 py-2 bg-slate-50 text-black"
              rows="2"
            ></textarea>
          </div>

          <button className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600">
            Add Reminder
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4 text-black">
          Today Reminders
        </h3>
        <div className="space-y-3">
          {otherReminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-3 sm:p-4 gap-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full text-sm sm:text-base">
                <div className="flex flex-col">
                  <span className="font-semibold">{reminder.date}</span>
                  <span className="text-gray-600 text-sm">{reminder.time}</span>
                </div>
                <span className="text-blue-600 break-words">
                  {reminder.note}
                </span>
              </div>

              <button className="px-4 py-1 rounded border bg-white border-teal-500 text-teal-600 hover:bg-green-50 hover:border-teal-500 w-full sm:w-auto">
                Done
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4 text-black">
          Upcoming Appointments
        </h3>
        <div className="space-y-3">
          {otherReminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-3 sm:p-4 gap-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 w-full text-sm sm:text-base">
                <div className="flex flex-col">
                  <span className="font-semibold">{reminder.date}</span>
                  <span className="text-gray-600 text-sm">{reminder.time}</span>
                </div>
                <span className="text-blue-600 break-words">
                  {reminder.note}
                </span>
                <span className="text-red-400 text-sm break-words">Note</span>
              </div>

              <button className="text-red-500 bg-white border-red-500 hover:text-red-700 hover:border-red-700 hover:bg-red-50 w-full sm:w-auto px-4 py-1 rounded border">
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
