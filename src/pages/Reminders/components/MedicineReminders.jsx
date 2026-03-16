import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  getMedicineRemindersApi,
  createMedicineReminderApi,
  updateMedicineReminderApi,
  deleteMedicineReminderApi
} from '../../../api/RemindersApi';

export default function MedicineReminders() {
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
      const data = await getMedicineRemindersApi();
      setReminders(data);
    } catch (error) {
      console.error('Error fetching medicine reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingReminder(null);
    setShowAddModal(true);
  };

  const handleEdit = (reminder) => {
    setEditingReminder(reminder);
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this medicine reminder?')) return;
    
    try {
      await deleteMedicineReminderApi(id);
      await fetchReminders();
      toast.success('Medicine reminder deleted successfully!');
    } catch (error) {
      console.error('Error deleting reminder:', error);
      toast.error('Failed to delete reminder. Please try again.');
    }
  };

  const handleSave = async () => {
    await fetchReminders();
    setShowAddModal(false);
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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0F4F52] flex items-center gap-2">
            <span className="text-3xl">💊</span>
            Medicine Reminders
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Keep track of your daily medications
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          + Add Medicine
        </button>
      </div>

      {/* Reminders List */}
      {reminders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💊</div>
          <p className="text-gray-500 mb-4">No medicine reminders yet</p>
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-[#18AAB0] text-white rounded-xl font-semibold hover:bg-[#86C443] transition-all"
          >
            Add Your First Medicine
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reminders.map((reminder) => (
            <MedicineCard
              key={reminder.id}
              reminder={reminder}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <MedicineModal
          reminder={editingReminder}
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

// Medicine Card Component
function MedicineCard({ reminder, onEdit, onDelete }) {
  return (
    <div className="bg-gradient-to-br from-[#F7FCFB] to-white border-2 border-[#D3F0ED] rounded-2xl p-5 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-[#0F4F52]">{reminder.medicineName}</h3>
          <p className="text-sm text-[#18AAB0] font-medium">{reminder.dosage}</p>
        </div>
        <span className="px-3 py-1 bg-[#18AAB0] text-white text-xs rounded-full font-semibold">
          {reminder.frequency}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>🕐</span>
          <span>{reminder.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>📅</span>
          <span>{reminder.duration} days</span>
        </div>
        {reminder.notes && (
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <span>📝</span>
            <span className="flex-1">{reminder.notes}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(reminder)}
          className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-all"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(reminder.id)}
          className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// Medicine Modal Component
function MedicineModal({ reminder, onClose, onSave }) {
  const [formData, setFormData] = useState({
    medicineName: reminder?.medicineName || '',
    dosage: reminder?.dosage || '',
    frequency: reminder?.frequency || 'Daily',
    time: reminder?.time || '',
    duration: reminder?.duration || '',
    notes: reminder?.notes || ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.medicineName.trim()) newErrors.medicineName = 'Medicine name is required';
    if (!formData.dosage.trim()) newErrors.dosage = 'Dosage is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Duration must be positive';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      if (reminder) {
        await updateMedicineReminderApi(reminder.id, formData);
        toast.success('Medicine reminder updated successfully!');
      } else {
        await createMedicineReminderApi(formData);
        toast.success('Medicine reminder created successfully! You will receive email notifications.');
      }
      onSave();
    } catch (error) {
      console.error('Error saving reminder:', error);
      toast.error('Failed to save reminder. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#0F4F52] mb-6">
          {reminder ? 'Edit Medicine Reminder' : 'Add Medicine Reminder'}
        </h2>

        <div className="space-y-4">
          {/* Medicine Name */}
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">
              Medicine Name *
            </label>
            <input
              type="text"
              value={formData.medicineName}
              onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
              placeholder="e.g., Paracetamol"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all
                ${errors.medicineName ? 'border-red-300' : 'border-[#D3F0ED] focus:border-[#18AAB0]'}
              `}
            />
            {errors.medicineName && <p className="text-red-500 text-xs mt-1">{errors.medicineName}</p>}
          </div>

          {/* Dosage */}
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">
              Dosage *
            </label>
            <input
              type="text"
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              placeholder="e.g., 500mg, 2 tablets"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all
                ${errors.dosage ? 'border-red-300' : 'border-[#D3F0ED] focus:border-[#18AAB0]'}
              `}
            />
            {errors.dosage && <p className="text-red-500 text-xs mt-1">{errors.dosage}</p>}
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">
              Frequency *
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[#D3F0ED] rounded-xl outline-none focus:border-[#18AAB0] transition-all"
            >
              <option value="Daily">Daily</option>
              <option value="Twice Daily">Twice Daily</option>
              <option value="Three Times Daily">Three Times Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="As Needed">As Needed</option>
            </select>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">
              Time *
            </label>
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

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">
              Duration (days) *
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., 7, 14, 30"
              min="1"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all
                ${errors.duration ? 'border-red-300' : 'border-[#D3F0ED] focus:border-[#18AAB0]'}
              `}
            />
            {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional instructions..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-[#D3F0ED] rounded-xl outline-none focus:border-[#18AAB0] transition-all resize-none"
            />
          </div>
        </div>

        {/* Buttons */}
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