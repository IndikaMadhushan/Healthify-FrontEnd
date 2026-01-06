import { Bell, Plus } from 'lucide-react';

export default function TodaySection({ 
  medicines, 
  appointments, 
  otherReminders, 
  onMarkAsDone,
  onShowMedicineForm,
  onShowAppointmentForm,
  onShowOtherForm
}) {
  return (
    
    <div className="space-y-6">
      <div className='text-black text-[30px] font-semibold' >{<p>Today Reminders</p>}</div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black font-semibold">Medicine</h2>
    
          <button 
            onClick={onShowMedicineForm}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
          >
            <Plus className="inline w-4 h-4 mr-1" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {medicines.map(med => (
            <div key={med.id} className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <Bell className="text-red-400 w-6 h-6" />
                <span className="text-teal-600">{med.type}</span>
                <span>{med.time}</span>
                <span>{med.date}</span>
                <span className="text-red-400 text-sm">{med.category}</span>
              </div>
              <button 
  onClick={() => onMarkAsDone('medicine', med.id)}
  className={`px-4 py-1 rounded border ${
    med.done 
      ? 'bg-white text-gray-400 border-gray-300 cursor-not-allowed' 
      : 'bg-white text-teal-600 border-teal-500 hover:bg-teal-50 hover:border-teal-500'
  }`}
  disabled={med.done}
>
  {med.done ? 'Done' : 'Done'}
</button>

            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black font-semibold">Appointments</h2>
          <button 
            onClick={onShowAppointmentForm}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
          >
            <Plus className="inline w-4 h-4 mr-1" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {appointments.map(apt => (
            <div key={apt.id} className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="font-semibold">{apt.date}</div>
                  <div className="text-sm text-gray-600">{apt.time}</div>
                </div>
                <span className="text-green-600">{apt.hospital}</span>
                <span>{apt.doctor}</span>
                {apt.note && <span className="text-red-400 text-sm">{apt.note}</span>}
              </div>
              <button 
  onClick={() => onMarkAsDone('appointment', apt.id)}
  className={`px-4 py-1 rounded border ${
    apt.done 
      ? 'bg-white text-gray-400 border-gray-300 cursor-not-allowed' 
      : 'bg-white text-teal-600 border-teal-500 hover:bg-teal-50 hover:border-teal-500'
  }`}
  disabled={apt.done}
>
  {apt.done ? 'Done' : 'Done'}
</button>

            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black font-semibold">Other</h2>
          <button 
            onClick={onShowOtherForm}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 "
          >
            <Plus className="inline w-4 h-4 mr-1" /> Add
          </button>
        </div>
        <div className="space-y-3">
          {otherReminders.map(reminder => (
            <div key={reminder.id} className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="font-semibold">{reminder.date}</div>
                  <div className="text-sm text-gray-600">{reminder.time}</div>
                </div>
                <span className="text-green-600">{reminder.note}</span>
              </div>
              <button 
  onClick={() => onMarkAsDone('other', reminder.id)}
  className={`px-4 py-1 rounded border ${
    reminder.done 
      ? 'bg-white text-gray-400 border-gray-300 cursor-not-allowed' 
      : 'bg-white text-teal-600 border-teal-500 hover:bg-teal-50 hover:border-teal-500'
  }`}
  disabled={reminder.done}
>
  {reminder.done ? 'Done' : 'Done'}
</button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}