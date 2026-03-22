import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  getOtherRemindersApi,
  createOtherReminderApi,
  updateOtherReminderApi,
  deleteOtherReminderApi
} from '../../../api/RemindersApi';
import { confirmDeletion } from '../../../utils/deleteConfirmation';

export default function OtherReminders() {
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
      const data = await getOtherRemindersApi();
      setReminders(data);
    } catch (error) {
      console.error('Error fetching other reminders:', error);
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
    const confirmed = await confirmDeletion({
      title: 'Delete reminder?',
      message: 'This custom reminder will be removed permanently.',
      confirmLabel: 'Delete Reminder',
    });
    if (!confirmed) return;
    
    try {
      await deleteOtherReminderApi(id);
      await fetchReminders();
      toast.success('Reminder deleted successfully!');
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
            <span className="text-3xl">📌</span>
            Other Reminders
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Add custom reminders for anything you need
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          + Add Reminder
        </button>
      </div>

      {/* Reminders List */}
      {reminders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📌</div>
          <p className="text-gray-500 mb-4">No custom reminders yet</p>
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-[#18AAB0] text-white rounded-xl font-semibold hover:bg-[#86C443] transition-all"
          >
            Create Your First Reminder
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reminders.map((reminder) => (
            <ReminderCard
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
        <ReminderModal
          reminder={editingReminder}
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

// Reminder Card Component
function ReminderCard({ reminder, onEdit, onDelete }) {
  const reminderDate = new Date(reminder.reminderDate);
  const isPast = reminderDate < new Date();
  const isToday = reminderDate.toDateString() === new Date().toDateString();

  return (
    <div className={`border-2 rounded-2xl p-5 hover:shadow-lg transition-all
      ${isPast 
        ? 'bg-gray-50 border-gray-300' 
        : isToday 
          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300' 
          : 'bg-gradient-to-br from-[#F7FCFB] to-white border-[#D3F0ED]'
      }
    `}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-start gap-2 mb-2">
            <span className="text-2xl">{reminder.icon || '📌'}</span>
            <h3 className="text-lg font-bold text-[#0F4F52]">{reminder.title}</h3>
          </div>
          {reminder.category && (
            <span className="inline-block px-3 py-1 bg-[#18AAB0] text-white text-xs rounded-full font-semibold">
              {reminder.category}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>📅</span>
          <span>
            {reminderDate.toLocaleDateString()} 
            {isToday && <span className="ml-2 text-orange-600 font-semibold">• Today</span>}
            {isPast && !isToday && <span className="ml-2 text-gray-400">• Past</span>}
          </span>
        </div>
        {reminder.time && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>🕐</span>
            <span>{reminder.time}</span>
          </div>
        )}
        {reminder.description && (
          <div className="flex items-start gap-2 text-sm text-gray-600 mt-3">
            <span>📝</span>
            <span className="flex-1">{reminder.description}</span>
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

// Reminder Modal Component
function ReminderModal({ reminder, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: reminder?.title || '',
    category: reminder?.category || '',
    reminderDate: reminder?.reminderDate || '',
    time: reminder?.time || '',
    description: reminder?.description || '',
    icon: reminder?.icon || '📌'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Health',
    'Fitness',
    'Nutrition',
    'Hydration',
    'Sleep',
    'Exercise',
    'Therapy',
    'Wellness',
    'Personal',
    'Other'
  ];

  const icons = ['📌', '💊', '🏃', '🥗', '💧', '😴', '🧘', '💪', '🩺', '📝', '⚡', '🎯', '✨'];

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.reminderDate) newErrors.reminderDate = 'Date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      if (reminder) {
        await updateOtherReminderApi(reminder.id, formData);
        toast.success('Reminder updated successfully!');
      } else {
        await createOtherReminderApi(formData);
        toast.success('Reminder created successfully! You will receive email notifications.');
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
          {reminder ? 'Edit Reminder' : 'Add New Reminder'}
        </h2>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Drink water, Take vitamins"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all
                ${errors.title ? 'border-red-300' : 'border-[#D3F0ED] focus:border-[#18AAB0]'}
              `}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[#D3F0ED] rounded-xl outline-none focus:border-[#18AAB0] transition-all"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">
              Icon
            </label>
            <div className="flex flex-wrap gap-2">
              {icons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`w-12 h-12 text-2xl rounded-xl border-2 transition-all
                    ${formData.icon === icon 
                      ? 'border-[#18AAB0] bg-[#F7FCFB] scale-110' 
                      : 'border-gray-200 hover:border-[#18AAB0]'
                    }
                  `}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0F4F52] mb-2">
                Date *
              </label>
              <input
                type="date"
                value={formData.reminderDate}
                onChange={(e) => setFormData({ ...formData, reminderDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all
                  ${errors.reminderDate ? 'border-red-300' : 'border-[#D3F0ED] focus:border-[#18AAB0]'}
                `}
              />
              {errors.reminderDate && <p className="text-red-500 text-xs mt-1">{errors.reminderDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F4F52] mb-2">
                Time (Optional)
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[#D3F0ED] rounded-xl outline-none focus:border-[#18AAB0] transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add any additional details or notes..."
              rows={4}
              className="w-full px-4 py-3 border-2 border-[#D3F0ED] rounded-xl outline-none focus:border-[#18AAB0] transition-all resize-none"
            />
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              📧 <strong>Email Reminder:</strong> We'll send you an email at the scheduled date and time.
            </p>
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
