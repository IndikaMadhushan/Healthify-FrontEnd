import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  getPeriodTrackerApi,
  updatePeriodTrackerApi,
  deletePeriodTrackerApi
} from '../../../api/RemindersApi';

export default function PeriodTracker() {
  const [tracker, setTracker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTracker();
  }, []);

  const fetchTracker = async () => {
    try {
      setLoading(true);
      const data = await getPeriodTrackerApi();
      setTracker(data);
    } catch (error) {
      console.error('Error fetching period tracker:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete period tracking data?')) return;
    
    try {
      await deletePeriodTrackerApi(tracker.id);
      await fetchTracker();
      toast.success('Period tracker deleted successfully!');
    } catch (error) {
      console.error('Error deleting tracker:', error);
      toast.error('Failed to delete tracker.');
    }
  };

  const calculateNextPeriod = () => {
    if (!tracker) return null;
    
    const lastPeriod = new Date(tracker.lastPeriodDate);
    const cycleLength = tracker.cycleLength || 28;
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
    
    return nextPeriod;
  };

  const getDaysUntilNext = () => {
    const nextPeriod = calculateNextPeriod();
    if (!nextPeriod) return null;
    
    const today = new Date();
    const diffTime = nextPeriod - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#18AAB0] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const nextPeriod = calculateNextPeriod();
  const daysUntil = getDaysUntilNext();

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0F4F52] flex items-center gap-2">
            <span className="text-3xl">🌸</span>
            Period Tracker
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Track your menstrual cycle and get reminders
          </p>
        </div>
        {tracker ? (
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Start Tracking
          </button>
        )}
      </div>

      {!tracker ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌸</div>
          <h3 className="text-xl font-bold text-[#0F4F52] mb-2">
            Start Tracking Your Cycle
          </h3>
          <p className="text-gray-500 mb-6">
            Get notifications 2-3 days before your next period
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-[#18AAB0] text-white rounded-xl font-semibold hover:bg-[#86C443] transition-all"
          >
            Set Up Period Tracker
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cycle Overview Card */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-3xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Next Period Expected</h3>
              <div className="text-4xl font-bold text-[#0F4F52] mb-2">
                {nextPeriod ? nextPeriod.toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                }) : 'N/A'}
              </div>
              {daysUntil !== null && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                  <span className="text-2xl">📅</span>
                  <span className="font-semibold text-[#18AAB0]">
                    {daysUntil > 0 
                      ? `${daysUntil} days to go` 
                      : daysUntil === 0 
                        ? 'Expected today' 
                        : `${Math.abs(daysUntil)} days overdue`
                    }
                  </span>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            {daysUntil !== null && daysUntil > 0 && (
              <div className="mt-6">
                <div className="w-full bg-white rounded-full h-3 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-pink-400 to-purple-400 h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.max(0, Math.min(100, ((tracker.cycleLength - daysUntil) / tracker.cycleLength) * 100))}%` 
                    }}
                  />
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Day {tracker.cycleLength - daysUntil} of {tracker.cycleLength}
                </p>
              </div>
            )}
          </div>

          {/* Cycle Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-[#D3F0ED] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Period</p>
                  <p className="text-lg font-bold text-[#0F4F52]">
                    {new Date(tracker.lastPeriodDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#D3F0ED] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔄</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cycle Length</p>
                  <p className="text-lg font-bold text-[#0F4F52]">
                    {tracker.cycleLength} days
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#D3F0ED] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Period Duration</p>
                  <p className="text-lg font-bold text-[#0F4F52]">
                    {tracker.periodDuration || 'Not set'} {tracker.periodDuration && 'days'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#D3F0ED] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔔</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Reminder</p>
                  <p className="text-lg font-bold text-[#0F4F52]">
                    2-3 days before
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {tracker.notes && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📝</span>
                <div>
                  <p className="font-semibold text-[#0F4F52] mb-1">Notes</p>
                  <p className="text-gray-700">{tracker.notes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 px-6 py-3 bg-blue-50 text-blue-600 border-2 border-blue-200 rounded-xl font-semibold hover:bg-blue-100 transition-all"
            >
              Edit Tracker
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 px-6 py-3 bg-red-50 text-red-600 border-2 border-red-200 rounded-xl font-semibold hover:bg-red-100 transition-all"
            >
              Delete Tracker
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <PeriodTrackerModal
          tracker={tracker}
          onClose={() => setShowModal(false)}
          onSave={() => {
            fetchTracker();
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

function PeriodTrackerModal({ tracker, onClose, onSave }) {
  const [formData, setFormData] = useState({
    lastPeriodDate: tracker?.lastPeriodDate || '',
    cycleLength: tracker?.cycleLength || 28,
    periodDuration: tracker?.periodDuration || 5,
    notes: tracker?.notes || ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.lastPeriodDate) newErrors.lastPeriodDate = 'Last period date is required';
    if (!formData.cycleLength || formData.cycleLength < 21 || formData.cycleLength > 35) {
      newErrors.cycleLength = 'Cycle length must be between 21-35 days';
    }
    if (formData.periodDuration && (formData.periodDuration < 1 || formData.periodDuration > 10)) {
      newErrors.periodDuration = 'Period duration must be between 1-10 days';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await updatePeriodTrackerApi(formData);
      toast.success('Period tracker saved! You will receive email reminders 2-3 days before your next period.');
      onSave();
    } catch (error) {
      console.error('Error saving tracker:', error);
      toast.error('Failed to save tracker.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#0F4F52] mb-6">
          {tracker ? 'Update Period Tracker' : 'Set Up Period Tracker'}
        </h2>

        <div className="space-y-4">
          {/* Last Period Date */}
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">
              Last Period Start Date *
            </label>
            <input
              type="date"
              value={formData.lastPeriodDate}
              onChange={(e) => setFormData({ ...formData, lastPeriodDate: e.target.value })}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all
                ${errors.lastPeriodDate ? 'border-red-300' : 'border-[#D3F0ED] focus:border-[#18AAB0]'}
              `}
            />
            {errors.lastPeriodDate && <p className="text-red-500 text-xs mt-1">{errors.lastPeriodDate}</p>}
          </div>

          {/* Cycle Length */}
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">
              Average Cycle Length (days) *
            </label>
            <input
              type="number"
              value={formData.cycleLength}
              onChange={(e) => setFormData({ ...formData, cycleLength: parseInt(e.target.value) })}
              min="21"
              max="35"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all
                ${errors.cycleLength ? 'border-red-300' : 'border-[#D3F0ED] focus:border-[#18AAB0]'}
              `}
            />
            <p className="text-xs text-gray-500 mt-1">Typical range: 21-35 days (average is 28)</p>
            {errors.cycleLength && <p className="text-red-500 text-xs mt-1">{errors.cycleLength}</p>}
          </div>

          {/* Period Duration */}
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">
              Period Duration (days)
            </label>
            <input
              type="number"
              value={formData.periodDuration}
              onChange={(e) => setFormData({ ...formData, periodDuration: parseInt(e.target.value) })}
              min="1"
              max="10"
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all
                ${errors.periodDuration ? 'border-red-300' : 'border-[#D3F0ED] focus:border-[#18AAB0]'}
              `}
            />
            <p className="text-xs text-gray-500 mt-1">How many days does your period typically last?</p>
            {errors.periodDuration && <p className="text-red-500 text-xs mt-1">{errors.periodDuration}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[#0F4F52] mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any symptoms, patterns, or notes to track..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-[#D3F0ED] rounded-xl outline-none focus:border-[#18AAB0] transition-all resize-none"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              📧 <strong>Email Reminders:</strong> We'll send you an email 2-3 days before your expected period date to help you prepare.
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
            {loading ? 'Saving...' : tracker ? 'Update' : 'Start Tracking'}
          </button>
        </div>
      </div>
    </div>
  );
}