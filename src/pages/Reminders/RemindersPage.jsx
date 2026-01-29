import { useState } from 'react';
import MedicineReminders from './components/MedicineReminders';
import AppointmentReminders from './components/AppointmentReminders';
import PeriodTracker from './components/PeriodTracker';
import OtherReminders from './components/OtherReminders';

// Mock patient data - replace with actual logged-in patient data
const mockPatient = {
  gender: "Female", // Change to "Male" to hide period tracker
  name: "Parindya Hewage"
};

export default function RemindersPage() {
  const [activeTab, setActiveTab] = useState('medicines');

  return (
    <div className="min-h-screen bg-[#F2FBFA] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F4F52] mb-2">
            My Reminders 🔔
          </h1>
          <p className="text-gray-600">
            Manage your medicines, appointments, and health reminders
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
          <TabButton
            active={activeTab === 'medicines'}
            onClick={() => setActiveTab('medicines')}
            icon="💊"
          >
            Medicines
          </TabButton>
          
          <TabButton
            active={activeTab === 'appointments'}
            onClick={() => setActiveTab('appointments')}
            icon="📅"
          >
            Appointments
          </TabButton>
          
          {/* Only show Period Tracker for female patients */}
          {mockPatient.gender === "Female" && (
            <TabButton
              active={activeTab === 'period'}
              onClick={() => setActiveTab('period')}
              icon="🌸"
            >
              Period Tracker
            </TabButton>
          )}
          
          <TabButton
            active={activeTab === 'other'}
            onClick={() => setActiveTab('other')}
            icon="📌"
          >
            Other Reminders
          </TabButton>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-sm p-6 lg:p-8 border border-[#D3F0ED]">
          {activeTab === 'medicines' && <MedicineReminders />}
          {activeTab === 'appointments' && <AppointmentReminders />}
          {activeTab === 'period' && mockPatient.gender === "Female" && <PeriodTracker />}
          {activeTab === 'other' && <OtherReminders />}
        </div>

      </div>
    </div>
  );
}

// Tab Button Component
function TabButton({ active, onClick, icon, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap
        ${active
          ? 'bg-gradient-to-r from-[#18AAB0] to-[#86C443] text-white shadow-lg scale-105'
          : 'bg-white text-gray-600 hover:bg-[#F7FCFB] border-2 border-[#D3F0ED] hover:border-[#18AAB0]'
        }
      `}
    >
      <span className="text-xl">{icon}</span>
      <span>{children}</span>
    </button>
  );
}