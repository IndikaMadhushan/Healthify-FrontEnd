// src/components/AppointmentSection.jsx

export default function AppointmentSection({ appointments, onMarkAsDone, onRemove }) {
  return (
    <div className="space-y-6">

      {/* Add Appointment Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6 bg-slate-50 text-black">Add Appointment</h2>
        <div className="space-y-4">
          <label className="font-medium text-black flex">Date</label>
          <input className="w-full border rounded px-3 py-2 bg-slate-50 text-black [color-scheme:light]" type="date" placeholder="Date" />

          <label className="font-medium text-black flex">Time</label>
          <input className="w-full border rounded px-3 py-2 bg-slate-50 text-black [color-scheme:light]" type="time" placeholder="Time" />

          <label className="font-medium text-black flex">Hospital</label>
          <input className="w-full border rounded px-3 py-2 bg-slate-50 text-black" type="text" placeholder="Hospital" />

          <label className="font-medium text-black flex">Doctor's Name</label>
          <input className="w-full border rounded px-3 py-2 bg-slate-50 text-black" type="text" placeholder="Doctor Name" />

          <label className="font-medium text-black flex">Note</label>
          <textarea className="w-full border rounded px-3 py-2 bg-slate-50 text-black" rows="2" placeholder="Note"></textarea>
                    

          <button className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600">
            Add Appointment
          </button>
        </div>
      </div>

      {/* Today Appointments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg text-black font-semibold mb-4">Today Appointments</h3>
        <div className="space-y-3">
          {appointments.map(apt => (
            <div key={apt.id} className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="font-semibold">{apt.date}</div>
                  <div className="text-sm text-gray-600">{apt.time}</div>
                </div>
                <span className="text-blue-600">{apt.hospital}</span>
                <span>{apt.doctor}</span>
                {apt.note && <span className="text-red-500 text-sm">{apt.note}</span>}
              </div>
              <button
                onClick={() => onMarkAsDone(apt.id)}
                className="px-4 py-1 rounded border border-teal-500 bg-white text-teal-500 hover:bg-green-50 hover:border-teal-500"
              >
                Done
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg text-black font-semibold mb-4">Upcoming Appointments</h3>
        <div className="space-y-3">
          {appointments.map(apt => (
            <div key={apt.id} className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="font-semibold">{apt.date}</div>
                  <div className="text-sm text-gray-600">{apt.time}</div>
                </div>
                <span className="text-blue-600">{apt.hospital}</span>
                <span>{apt.doctor}</span>
                {apt.note && <span className="text-red-500 text-sm">{apt.note}</span>}
              </div>
              <button
                onClick={() => onRemove(apt.id)}
                className="text-red-500 bg-white border-red-500 hover:text-red-700 hover:bg-red-50 hover:border-red-400"
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
