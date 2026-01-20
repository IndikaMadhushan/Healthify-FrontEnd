import { Bell } from 'lucide-react';

export default function MedicineSection({ medicines, onMarkAsDone, onRemove }) {
  return (
    <div className="space-y-6">

      {/* Add Medicine Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl text-black font-semibold mb-6">Add Medicine</h2>

        <div className="space-y-6">

          {/* Frequency Selection */}
          <div className="flex space-x-4 text-black">
            {['Hourly', 'Daily', 'Weekly', 'Specific Day'].map(freq => (
              <label key={freq} className="flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  className="mr-2 accent-white bg-white"
                  defaultChecked={freq === 'Specific Day'}
                />
                <span>{freq}</span>
              </label>
            ))}
          </div>

          {/* Date & Day Buttons */}
          <div>
            <label className="block mb-3 font-medium text-black">Date</label>
            <div className="flex items-center gap-4">
              <input
  type="date"
  className="text-black bg-slate-50 flex-1 border rounded-lg px-4 py-3 
             focus:outline-none focus:ring-2 focus:ring-teal-500
             [color-scheme:light]"
/>

              <div className="flex gap-2">
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => (
                  <button
                    key={day}
                    className="w-14 h-14 border rounded-full text-black bg-slate-200 hover:bg-gray-50 hover:border-teal-500 transition"
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="block mb-3 font-medium text-black">Time</label>
            <div className="grid grid-cols-3 gap-4 text-black">
              {['Morning','Afternoon','Night'].map(slot => (
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm text-gray-800">Start Time</label>
              <input
                type="time"
                className="[color-scheme:light] w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-800">Time Period</label>
              <input
                type="text"
                placeholder="e.g. 2 hours"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
              />
            </div>
          </div>

          {/* Medicine Textarea */}
          <div>
            <label className="text-black block mb-3 font-medium">Medicine</label>
            <textarea
              rows="2"
              placeholder="Enter medicine name and dosage"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition">
              Add Medicine
            </button>
          </div>
        </div>
      </div>

      {/* Today Reminders */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-black font-semibold mb-4">Today Reminders</h3>
        <div className="space-y-3">
          {medicines.map(med => (
            <div key={med.id} className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <Bell className="text-red-400 w-6 h-6" />
                <span className="text-blue-600">{med.type}</span>
                <span>{med.time}</span>
                <span>{med.date}</span>
                {med.category && <span className="text-red-400 text-sm">{med.category}</span>}
              </div>
              <button
                onClick={() => onMarkAsDone(med.id)}
                className="px-4 py-1 rounded border bg-white border-teal-500 text-teal-600 hover:bg-green-50 hover:border-teal-500"
              >
                Done
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Reminders */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-black font-semibold mb-4">Upcoming Reminders</h3>
        <div className="space-y-3">
          {medicines.map(med => (
            <div key={med.id} className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <Bell className="text-green-400 w-6 h-6" />
                <span className="text-blue-600">{med.type}</span>
                <span>{med.time}</span>
                <span>{med.date}</span>
                {med.category && <span className="text-red-400 text-sm">{med.category}</span>}
              </div>
              <button
                onClick={() => onRemove(med.id)}
                className="text-red-500 bg-white border-red-300 hover:text-red-700 hover:border-red-500 hover:bg-red-50"
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
