import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  getAppointmentRemindersApi,
  createAppointmentReminderApi,
  updateAppointmentReminderApi,
  deleteAppointmentReminderApi
} from '../../../api/RemindersApi';
import { confirmDeletion } from '../../../utils/deleteConfirmation';

export default function AppointmentReminders() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const data = await getAppointmentRemindersApi();
      setReminders(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await confirmDeletion({
      title: 'Delete appointment reminder?',
      message: 'This appointment reminder will be removed permanently.',
      confirmLabel: 'Delete Appointment',
    });
    if (!confirmed) return;
    
    try {
      await deleteAppointmentReminderApi(id);
      await fetchReminders();
      toast.success('Appointment deleted successfully!');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Failed to delete appointment.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#18AAB0] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0F4F52] flex items-center gap-2">
            <span className="text-3xl">📅</span>
            Appointment Reminders
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Never miss an important appointment
          </p>
        </div>
        <button
          onClick={() => {
            setEditingReminder(null);
            setShowAddModal(true);
          }}
          className="px-6 py-3 bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          + Add Appointment
        </button>
      </div>

      {reminders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-gray-500 mb-4">No appointments scheduled yet</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-[#18AAB0] text-white rounded-xl font-semibold hover:bg-[#86C443] transition-all"
          >
            Schedule Your First Appointment
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <AppointmentCard
              key={reminder.id}
              reminder={reminder}
              onEdit={(r) => {
                setEditingReminder(r);
                setShowAddModal(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showAddModal && (
        <AppointmentModal
          reminder={editingReminder}
          onClose={() => setShowAddModal(false)}
          onSave={() => {
            fetchReminders();
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}

function AppointmentCard({ reminder, onEdit, onDelete }) {
  const appointmentDate = new Date(reminder.appointmentDate);
  const isUpcoming = appointmentDate > new Date();

  return (
    <div className="bg-gradient-to-r from-[#F7FCFB] to-white border-2 border-[#D3F0ED] rounded-2xl p-6 hover:shadow-lg transition-all">
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-3">
            <div className={`p-3 rounded-xl ${isUpcoming ? 'bg-green-100' : 'bg-gray-100'}`}>
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F4F52]">{reminder.title}</h3>
              <p className="text-sm text-[#18AAB0] font-medium">{reminder.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📅</span>
              <span>{appointmentDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🕐</span>
              <span>{reminder.time}</span>
            </div>
            {reminder.doctor && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>👨‍⚕️</span>
                <span>{reminder.doctor}</span>
              </div>
            )}
            {reminder.reason && (
              <div className="flex items-start gap-2 text-sm text-gray-600 md:col-span-2">
                <span>📝</span>
                <span>{reminder.reason}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex md:flex-col gap-2">
          <button
            onClick={() => onEdit(reminder)}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-all"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(reminder.id)}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function AppointmentModal({ reminder, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: reminder?.title || '',
    appointmentDate: reminder?.appointmentDate || '',
    time: reminder?.time || '',
    location: reminder?.location || '',
    doctor: reminder?.doctor || '',
    reason: reminder?.reason || ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      if (reminder) {
        await updateAppointmentReminderApi(reminder.id, formData);
        toast.success('Appointment updated successfully!');
      } else {
        await createAppointmentReminderApi(formData);
        toast.success('Appointment created! You will receive email reminders.');
      }
      onSave();
    } catch (error) {
      console.error('Error saving appointment:', error);
      toast.error('Failed to save appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#0F4F52] mb-6">
          {reminder ? 'Edit Appointment' : 'Add Appointment'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Doctor Checkup, Lab Test"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all
                ${errors.title ? 'border-red-300' : 'border-[#D3F0ED] focus:border-[#18AAB0]'}
              `}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0F4F52] mb-2">Date *</label>
              <input
                type="date"
                value={formData.appointmentDate}
                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all
                  ${errors.appointmentDate ? 'border-red-300' : 'border-[#D3F0ED] focus:border-[#18AAB0]'}
                `}
              />
              {errors.appointmentDate && <p className="text-red-500 text-xs mt-1">{errors.appointmentDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F4F52] mb-2">Time *</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all
                  ${errors.time ? 'border-red-300' : 'border-[#D3F0ED] focus:border-[#18AAB0]'}
                `}
              />
              {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">Location *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., City Hospital, Clinic Name"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all
                ${errors.location ? 'border-red-300' : 'border-[#D3F0ED] focus:border-[#18AAB0]'}
              `}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">Doctor (Optional)</label>
            <input
              type="text"
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              placeholder="Doctor's name"
              className="w-full px-4 py-3 border-2 border-[#D3F0ED] rounded-xl outline-none focus:border-[#18AAB0] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">Reason (Optional)</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Purpose of appointment..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-[#D3F0ED] rounded-xl outline-none focus:border-[#18AAB0] transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : reminder ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
