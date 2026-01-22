
// src/components/MedicineSection.jsx



import { Bell } from 'lucide-react';


export default function MedicineSection({ medicines, onMarkAsDone, onRemove }) {
  return (
    <div className="space-y-6">
      {/* Add Medicine Form */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl text-black font-semibold mb-4 sm:mb-6">
          Add Medicine
        </h2>

        <div className="space-y-6">
          {/* Frequency Selection */}
          <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 text-black">
            {["Hourly", "Daily", "Weekly", "Specific Day"].map((freq) => (
              <label
                key={freq}
                className="flex items-center border border-teal-500 rounded px-3 sm:px-4 py-2 bg-white hover:bg-gray-50 flex-shrink-0 cursor-pointer"
              >
                <input
                  type="radio"
                  name="frequency"
                  className="mr-2 accent-teal-500"
                  defaultChecked={freq === "Specific Day"}
                />
                <span className="text-sm sm:text-base whitespace-nowrap">
                  {freq}
                </span>
              </label>
            ))}
          </div>
          {/* <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 text-black">
            {['Hourly', 'Daily', 'Weekly', 'Specific Day'].map(freq => (
              <label key={freq} className="flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  className="mr-2 accent-white bg-white"
                  defaultChecked={freq === 'Specific Day'}
                />
                <span className="text-sm sm:text-base">{freq}</span>
              </label>
            ))}
          </div> */}

          {/* Date & Day Buttons */}
          <div>
            <label className="block mb-3 font-medium text-black">Date</label>
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
              <input
                type="date"
                className="text-black bg-slate-50 flex-1 border rounded-lg px-4 py-3 
             focus:outline-none focus:ring-2 focus:ring-teal-500
             [color-scheme:light]"
              />

              <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 lg:pb-0">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <button
                      key={day}
                      className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 border rounded-full text-black bg-slate-200 hover:bg-gray-50 hover:border-teal-500 transition text-xs sm:text-base"
                    >
                      {day}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="block mb-3 font-medium text-black">Time</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-black">
              {["Morning", "Afternoon", "Night"].map((slot) => (
                <div key={slot}>
                  <label className="flex items-center mb-2 ">
                    <input type="radio" name="timeSlot" className="mr-2" />
                    <span>{slot}</span>
                  </label>
                  <input
                    type="time"
                    className="[color-scheme:light] w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Hourly Time */}
          <label className="font-medium text-black flex">Hourly Time</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm text-gray-800">
                Start Time
              </label>
              <input
                type="time"
                className="[color-scheme:light] w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-800">
                Time Period
              </label>
              <input
                type="text"
                placeholder="e.g. 2 hours"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
              />
            </div>
          </div>

          {/* Medicine Textarea */}
          <div>
            <label className="text-black block mb-3 font-medium">
              Medicine
            </label>
            <textarea
              rows="2"
              placeholder="Enter medicine name and dosage"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition w-full sm:w-auto">
              Add Medicine
            </button>
          </div>
        </div>
      </div>

      {/* Today Reminders */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h3 className="text-base sm:text-lg text-black font-semibold mb-4">
          Today Reminders
        </h3>
        <div className="space-y-3">
          {medicines.map((med) => (
            <div
              key={med.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-3 sm:p-4 gap-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 w-full text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <Bell className="text-red-400 w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-blue-600 break-words">{med.type}</span>
                </div>
                <span>{med.time}</span>
                <span>{med.date}</span>
                {med.category && (
                  <span className="text-red-400 break-words">
                    {med.category}
                  </span>
                )}
              </div>

              <button
                onClick={() => onMarkAsDone(med.id)}
                className="px-4 py-1 rounded border bg-white border-teal-500 text-teal-600 hover:bg-green-50 hover:border-teal-500 w-full sm:w-auto"
              >
                Done
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Reminders */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h3 className="text-base sm:text-lg text-black font-semibold mb-4">
          Upcoming Reminders
        </h3>
        <div className="space-y-3">
          {medicines.map((med) => (
            <div
              key={med.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border rounded-lg p-3 sm:p-4 gap-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 w-full text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <Bell className="text-green-400 w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-blue-600 break-words">{med.type}</span>
                </div>
                <span>{med.time}</span>
                <span>{med.date}</span>
                {med.category && (
                  <span className="text-red-400 break-words">
                    {med.category}
                  </span>
                )}
              </div>

              <button
                onClick={() => onRemove(med.id)}
                className="text-red-500 bg-white border-red-300 hover:text-red-700 hover:border-red-500 hover:bg-red-50 w-full sm:w-auto px-4 py-1 rounded border"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
