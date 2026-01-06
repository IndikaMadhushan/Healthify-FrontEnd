import React from 'react';

export default function OtherSection({ otherReminders }) {// if the page shows an erro add this para meter to this fucntion 'onMarkAsDone'
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl text-black font-semibold mb-6">Add Reminder</h2>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <button className="px-4 py-2 border rounded text-black bg-white border-teal-500 hover:bg-teal-50">Daily</button>
            <button className="px-4 py-2 border rounded text-black bg-white border-teal-500 hover:bg-teal-50">Weekly</button>
            <button className="px-4 py-2 border rounded text-black bg-white border-teal-500 hover:bg-teal-50">Specific Day</button>
            <button className="px-4 py-2 border rounded text-black bg-white border-teal-500  hover:bg-teal-50">Other</button>
          </div>

          <div>
            <label className="block mb-2 font-medium text-black">Date</label>
            <div className="flex space-x-2 mb-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <button key={day} className="px-4 py-2 border rounded border-teal-500 text-black bg-white hover:bg-gray-50">{day}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-black">Time</label>
            <input type="time" className="w-full border rounded px-3 py-2 bg-slate-50 text-black [color-scheme:light]" />
          </div>

          <div>
            <label className="block mb-2 font-medium text-black">Note</label>
            <textarea className="w-full border rounded px-3 py-2 bg-slate-50 text-black" rows="2"></textarea>
          </div>

          <button className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600">
            Add Reminder
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-black">Today Reminders</h3>
        <div className="space-y-3">
          {otherReminders.map(reminder => (
            <div key={reminder.id} className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="font-semibold ">{reminder.date}</div>
                  <div className="text-sm text-gray-600">{reminder.time}</div>
                </div>
                <span className="text-blue-600">{reminder.note}</span>
              </div>
              <button className="px-4 py-1 rounded border bg-white border-teal-500 text-teal-600 hover:bg-green-50 hover:border-teal-500">
                Done
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-black">Upcoming Appointments</h3>
        <div className="space-y-3">
          {otherReminders.map(reminder => (
            <div key={reminder.id} className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="font-semibold">{reminder.date}</div>
                  <div className="text-sm text-gray-600">{reminder.time}</div>
                </div>
                <span className="text-blue-600">{reminder.note}</span>
                <span className="text-red-400 text-sm">Note</span>
              </div>
              <button className="text-red-500 bg-white border-red-500 hover:text-red-700 hover:border-red-700 hover:bg-red-50">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}