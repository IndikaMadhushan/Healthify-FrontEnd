import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  getPatientProfileApi,
  getPatientBmiApi,
  getMedicineRemindersApi,
  getAppointmentRemindersApi,
  getPeriodRemindersApi,
  getOtherRemindersApi,
  getPatientMetricGraphApi
} from "../../api/PatientApi";

export default function SummaryPage() {
  const [greeting, setGreeting] = useState("");
  const [patient, setPatient] = useState(null);
  const [bmiInfo, setBmiInfo] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);

  const [metrics, setMetrics] = useState({
    weight: [],
    height: [],
    sugar: [],
    cholesterol: []
  });

  const [reminders, setReminders] = useState({
    medicines: [],
    appointments: [],
    period: [],
    other: []
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const loadSummary = async () => {
      try {
        const profileRes = await getPatientProfileApi();
        const patientData = profileRes.data;
        setPatient(patientData);

        const patientId = patientData.id;

        const [
          bmiRes,
          medicineRes,
          appointmentRes,
          periodRes,
          otherRes,
          weightRes,
          heightRes,
          sugarRes,
          cholesterolRes
        ] = await Promise.all([
          getPatientBmiApi(patientId),
          getMedicineRemindersApi(patientId),
          getAppointmentRemindersApi(patientId),
          getPeriodRemindersApi(patientId),
          getOtherRemindersApi(patientId),

          getPatientMetricGraphApi(patientId, "WEIGHT"),
          getPatientMetricGraphApi(patientId, "HEIGHT"),
          getPatientMetricGraphApi(patientId, "BLOOD_SUGAR"),
          getPatientMetricGraphApi(patientId, "CHOLESTEROL")
        ]);

        setBmiInfo(bmiRes.data);

        setReminders({
          medicines: medicineRes.data || [],
          appointments: appointmentRes.data || [],
          period: periodRes.data || [],
          other: otherRes.data || []
        });

        setMetrics({
          weight: formatMetricData(weightRes.data),
          height: formatMetricData(heightRes.data),
          sugar: formatMetricData(sugarRes.data),
          cholesterol: formatMetricData(cholesterolRes.data)
        });

        if (bmiRes.data?.bmi) {
          const bmi = bmiRes.data.bmi;

          if (bmi >= 18.5 && bmi <= 24.9) {
            setHealthStatus({
              message: "🎉 Excellent! Your BMI is in the healthy range.",
              color: "bg-green-50 border-green-200 text-green-800"
            });
          } else if (bmi < 18.5) {
            setHealthStatus({
              message: "⚠️ You are underweight. Consider consulting a doctor.",
              color: "bg-yellow-50 border-yellow-200 text-yellow-800"
            });
          } else {
            setHealthStatus({
              message:
                "⚠️ Your BMI indicates overweight. Lifestyle changes are recommended.",
              color: "bg-red-50 border-red-200 text-red-800"
            });
          }
        }
      } catch (err) {
        console.error("Failed to load summary data", err);
      }
    };

    loadSummary();
  }, []);

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading summary...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2FBFA] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-[#18AAB0] to-[#86C443] rounded-3xl shadow-lg p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {greeting}, {patient.fullName.split(" ")[0]} 👋
              </h1>
              <p className="text-sm">
                {patient.age ?? "—"} years • {patient.gender} • ID:{" "}
                {patient.patientId}
              </p>
              <p className="text-xs mt-1">📧 {patient.email}</p>
            </div>

            <div className="bg-white/20 rounded-2xl px-6 py-4 border border-white/30">
              <p className="text-xs uppercase mb-1">Current BMI</p>
              <p className="text-4xl font-bold">
                {bmiInfo?.bmi?.toFixed(1) ?? "—"}
              </p>
              <p className="text-xs mt-1">
                {bmiInfo?.category ?? "Not available"}
              </p>
            </div>
          </div>

          {healthStatus && (
            <div
              className={`mt-4 rounded-xl p-4 border ${healthStatus.color}`}
            >
              <p className="text-sm font-medium">{healthStatus.message}</p>
            </div>
          )}

          {bmiInfo?.tip && (
            <div className="mt-6 rounded-xl p-4 bg-white/20 border border-white/30">
              <p className="text-sm">{bmiInfo.tip}</p>
            </div>
          )}
        </div>

        {/* Health Metrics Graphs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MetricCard title="Weight Trend" data={metrics.weight} unit="kg" />
          <MetricCard title="Height Tracking" data={metrics.height} unit="cm" />
          <MetricCard
            title="Blood Sugar Levels"
            data={metrics.sugar}
            unit="mg/dL"
          />
          <MetricCard
            title="Cholesterol Levels"
            data={metrics.cholesterol}
            unit="mg/dL"
          />
        </div>

        {/* Reminders */}
        <div className="bg-white rounded-3xl shadow-sm p-6 lg:p-8">
          <h2 className="text-2xl font-semibold mb-6">
            🔔 Today’s Reminders
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReminderSection
              title="Appointments"
              icon="📅"
              items={reminders.appointments}
              empty="No appointments today"
              render={(a) => (
                <>
                  <p className="font-medium text-sm">{a.doctorName}</p>
                  <p className="text-xs text-gray-500">🏥 {a.hospital}</p>
                  <p className="text-xs text-gray-500">
                    🕐 {a.appointmentTime}
                  </p>
                </>
              )}
            />

            <ReminderSection
              title="Medicines"
              icon="💊"
              items={reminders.medicines}
              empty="No medicine reminders"
              render={(m) => (
                <>
                  <p className="font-medium text-sm">{m.medicineName}</p>
                  <p className="text-xs text-gray-500">🕐 {m.time}</p>
                </>
              )}
            />

            {patient.gender === "Female" && (
              <ReminderSection
                title="Period Tracker"
                icon="🌸"
                items={reminders.period}
                empty="No period reminders"
                render={(p) => (
                  <p className="text-sm">
                    Next cycle expected around {p.nextPeriodDate}
                  </p>
                )}
              />
            )}

            <ReminderSection
              title="Other Reminders"
              icon="📌"
              items={reminders.other}
              empty="No other reminders"
              render={(o) => (
                <>
                  <p className="font-medium text-sm">{o.note}</p>
                  <p className="text-xs text-gray-500">🕐 {o.time}</p>
                </>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */
const formatMetricData = (data) =>
  (data || []).map((m) => ({
    date: new Date(m.recordedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    }),
    value: m.value
  }));

/* ---------- Metric Card ---------- */
function MetricCard({ title, data, unit }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h3 className="font-semibold mb-4">{title}</h3>

      {data.length === 0 ? (
        <p className="text-sm text-gray-400 text-center">
          No data available
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#18AAB0"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      <p className="text-xs text-gray-500 mt-2 text-right">{unit}</p>
    </div>
  );
}

/* ---------- Reminder Section ---------- */
function ReminderSection({ title, icon, items, empty, render }) {
  return (
    <div className="bg-[#F7FCFB] border border-[#D3F0ED] rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span>{icon}</span>
        <h3 className="font-semibold">{title}</h3>
        <span className="ml-auto bg-[#18AAB0] text-white text-xs px-2 py-1 rounded-full">
          {items.length}
        </span>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-gray-400 italic text-center">
            {empty}
          </p>
        ) : (
          items.map((item, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border">
              {render(item)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
