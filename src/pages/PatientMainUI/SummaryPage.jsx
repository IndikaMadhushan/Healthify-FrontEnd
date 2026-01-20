import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data - replace with actual API calls later
const mockPatient = {
  fullName: "Parindya Hewage",
  age: 23,
  patientId: "PAT-2026-0001",
  email: "parindya@gmail.com",
  gender: "Female"
};

const mockHealthData = {
  weight: [
    { date: "2025-11", value: 58 },
    { date: "2025-12", value: 59 },
    { date: "2026-01", value: 60 }
  ],
  height: [
    { date: "2025-11", value: 165 },
    { date: "2025-12", value: 165 },
    { date: "2026-01", value: 165 }
  ],
  bloodSugar: [
    { date: "2025-11", value: 95 },
    { date: "2025-12", value: 98 },
    { date: "2026-01", value: 92 }
  ],
  cholesterol: [
    { date: "2025-11", value: 180 },
    { date: "2025-12", value: 175 },
    { date: "2026-01", value: 170 }
  ]
};

const mockReminders = {
  appointments: [
    { id: 1, title: "Dr. Silva - General Checkup", time: "10:00 AM", location: "Main Clinic" },
    { id: 2, title: "Blood Test", time: "2:30 PM", location: "Lab Center" }
  ],
  medicines: [
    { id: 1, name: "Vitamin D", dosage: "1 tablet", time: "8:00 AM" },
    { id: 2, name: "Calcium", dosage: "1 tablet", time: "8:00 PM" }
  ],
  period: [
    { id: 1, note: "Expected in 5 days", date: "Jan 23, 2026" }
  ],
  other: [
    { id: 1, title: "Drink 8 glasses of water", time: "Throughout the day" }
  ]
};

export default function SummaryPage() {
  const [greeting, setGreeting] = useState('');
  const [currentBMI, setCurrentBMI] = useState(null);
  const [healthStatus, setHealthStatus] = useState({ message: '', color: '' });

  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // Calculate BMI from latest weight and height
    const latestWeight = mockHealthData.weight[mockHealthData.weight.length - 1].value;
    const latestHeight = mockHealthData.height[mockHealthData.height.length - 1].value / 100; // convert to meters
    const bmi = (latestWeight / (latestHeight * latestHeight)).toFixed(1);
    setCurrentBMI(bmi);

    // Determine health status
    const latestSugar = mockHealthData.bloodSugar[mockHealthData.bloodSugar.length - 1].value;
    
    if (bmi >= 18.5 && bmi <= 24.9 && latestSugar >= 70 && latestSugar <= 100) {
      setHealthStatus({ 
        message: '🎉 Excellent! Your health metrics are in the healthy range. Keep up the great work!', 
        color: 'bg-green-50 border-green-200 text-green-800' 
      });
    } else if (bmi < 18.5 || bmi > 29.9 || latestSugar < 70 || latestSugar > 140) {
      setHealthStatus({ 
        message: '⚠️ Alert: Some of your health metrics need attention. Please consult your doctor.', 
        color: 'bg-red-50 border-red-200 text-red-800' 
      });
    } else {
      setHealthStatus({ 
        message: '💡 Notice: Your health metrics are slightly off target. Consider lifestyle adjustments.', 
        color: 'bg-yellow-50 border-yellow-200 text-yellow-800' 
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F2FBFA] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-[#18AAB0] to-[#86C443] rounded-3xl shadow-lg p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {greeting}, {mockPatient.fullName.split(' ')[0]}! 👋
              </h1>
              <p className="text-white/90 text-sm md:text-base">
                {mockPatient.age} years • {mockPatient.gender} • ID: {mockPatient.patientId}
              </p>
              <p className="text-white/80 text-xs md:text-sm mt-1">
                📧 {mockPatient.email}
              </p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/30">
              <p className="text-xs uppercase tracking-wide text-white/80 mb-1">Current BMI</p>
              <p className="text-4xl font-bold">{currentBMI}</p>
              <p className="text-xs text-white/90 mt-1">
                {currentBMI < 18.5 ? 'Underweight' : currentBMI <= 24.9 ? 'Normal' : currentBMI <= 29.9 ? 'Overweight' : 'Obese'}
              </p>
            </div>
          </div>

          {/* Health Status Note */}
          <div className={`mt-6 rounded-xl p-4 border ${healthStatus.color}`}>
            <p className="text-sm font-medium">{healthStatus.message}</p>
          </div>
        </div>

        {/* Health Metrics Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Weight Chart */}
          <MetricCard 
            title="Weight Trend" 
            icon="⚖️" 
            data={mockHealthData.weight}
            dataKey="value"
            color="#18AAB0"
            unit="kg"
            latestValue={mockHealthData.weight[mockHealthData.weight.length - 1].value}
          />

          {/* Height Chart */}
          <MetricCard 
            title="Height Tracking" 
            icon="📏" 
            data={mockHealthData.height}
            dataKey="value"
            color="#86C443"
            unit="cm"
            latestValue={mockHealthData.height[mockHealthData.height.length - 1].value}
          />

          {/* Blood Sugar Chart */}
          <MetricCard 
            title="Blood Sugar Levels" 
            icon="💉" 
            data={mockHealthData.bloodSugar}
            dataKey="value"
            color="#F59E0B"
            unit="mg/dL"
            latestValue={mockHealthData.bloodSugar[mockHealthData.bloodSugar.length - 1].value}
          />

          {/* Cholesterol Chart */}
          <MetricCard 
            title="Cholesterol Levels" 
            icon="❤️" 
            data={mockHealthData.cholesterol}
            dataKey="value"
            color="#EF4444"
            unit="mg/dL"
            latestValue={mockHealthData.cholesterol[mockHealthData.cholesterol.length - 1].value}
          />
        </div>

        {/* Today's Reminders Section */}
        <div className="bg-white rounded-3xl shadow-sm p-6 lg:p-8">
          <h2 className="text-2xl font-semibold text-[#0F4F52] mb-6 flex items-center gap-2">
            <span className="text-[#18AAB0] text-xl">🔔</span>
            Today's Reminders
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Appointments */}
            <ReminderSection
              title="Appointments"
              icon="📅"
              items={mockReminders.appointments}
              emptyMessage="No appointments scheduled for today"
              renderItem={(item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#18AAB0] mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-[#0F4F52] text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">🕐 {item.time}</p>
                    <p className="text-xs text-gray-500">📍 {item.location}</p>
                  </div>
                </div>
              )}
            />

            {/* Medicines */}
            <ReminderSection
              title="Medicines"
              icon="💊"
              items={mockReminders.medicines}
              emptyMessage="No medicine reminders for today"
              renderItem={(item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#86C443] mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-[#0F4F52] text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">💊 {item.dosage}</p>
                    <p className="text-xs text-gray-500">🕐 {item.time}</p>
                  </div>
                </div>
              )}
            />

            {/* Period Tracker */}
            {mockPatient.gender === "Female" && (
              <ReminderSection
                title="Period Tracker"
                icon="🌸"
                items={mockReminders.period}
                emptyMessage="No period reminders"
                renderItem={(item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-[#0F4F52] text-sm">{item.note}</p>
                      <p className="text-xs text-gray-500 mt-1">📅 {item.date}</p>
                    </div>
                  </div>
                )}
              />
            )}

            {/* Other Reminders */}
            <ReminderSection
              title="Other Reminders"
              icon="📌"
              items={mockReminders.other}
              emptyMessage="No other reminders"
              renderItem={(item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-[#0F4F52] text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">🕐 {item.time}</p>
                  </div>
                </div>
              )}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

// Reusable Metric Card Component
function MetricCard({ title, icon, data, dataKey, color, unit, latestValue }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F7FCFB] border border-[#D3F0ED] flex items-center justify-center text-[#18AAB0]">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-[#0F4F52]">{title}</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#0F4F52]">{latestValue}</p>
          <p className="text-xs text-gray-500">{unit}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            stroke="#D1D5DB"
          />
          <YAxis 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            stroke="#D1D5DB"
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #D3F0ED',
              borderRadius: '12px',
              fontSize: '12px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={3}
            dot={{ fill: color, r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Reusable Reminder Section Component
function ReminderSection({ title, icon, items, emptyMessage, renderItem }) {
  return (
    <div className="bg-[#F7FCFB] border border-[#D3F0ED] rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-[#18AAB0]">{icon}</div>
        <h3 className="font-semibold text-[#0F4F52]">{title}</h3>
        <span className="ml-auto bg-[#18AAB0] text-white text-xs px-2 py-1 rounded-full">
          {items.length}
        </span>
      </div>

      <div className="space-y-3">
        {items.length > 0 ? (
          items.map(renderItem)
        ) : (
          <p className="text-sm text-gray-400 italic text-center py-4">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}