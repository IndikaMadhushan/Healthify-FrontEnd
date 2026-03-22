import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getCachedPatientProfile,
  getPatientProfileApi,
  getPatientBmiApi,
  getPatientMetricGraphApi,
  addPatientMetricApi,
} from "../../api/PatientApi";

import {
  getMedicineRemindersApi,
  getAppointmentRemindersApi,
  getPeriodTrackerApi,
  getOtherRemindersApi,
} from "../../api/RemindersApi";
import { getNameParts } from "../../utils/nameUtils";

const BMI_STATUS_STYLES = {
  NORMAL: "bg-green-50 border-green-200 text-green-800",
  UNDERWEIGHT: "bg-yellow-50 border-yellow-200 text-yellow-800",
  OVERWEIGHT: "bg-red-50 border-red-200 text-red-800",
  OBESE: "bg-red-50 border-red-200 text-red-800",
};

const POSITIVE_NUMBER_PATTERN = /^\d*\.?\d*$/;

const formatMetricData = (data) =>
  (data || []).map((m) => ({
    date: new Date(m.recordedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    value: m.value,
  }));

const getHealthStatusFromBmi = (bmiData) => {
  if (!bmiData?.bmi) return null;

  return {
    message:
      bmiData.healthTip || "BMI data is available from your latest measurements.",
    color:
      BMI_STATUS_STYLES[bmiData.category] ||
      "bg-blue-50 border-blue-200 text-blue-800",
  };
};

export default function SummaryPage() {
  const [greeting, setGreeting] = useState("");
  const [patient, setPatient] = useState(() => getCachedPatientProfile());
  const [isLoading, setIsLoading] = useState(() => !getCachedPatientProfile());
  const [loadError, setLoadError] = useState(false);
  const [bmiInfo, setBmiInfo] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);
  const [metrics, setMetrics] = useState({
    weight: [],
    height: [],
    sugar: [],
    cholesterol: [],
  });
  const [entry, setEntry] = useState({
    weight: "",
    height: "",
    sugar: "",
    cholesterol: "",
  });
  const [entryError, setEntryError] = useState("");
  const [isSavingEntry, setIsSavingEntry] = useState(false);
  const [reminders, setReminders] = useState({
    medicines: [],
    appointments: [],
    period: [],
    other: [],
  });

  const todayString = new Date().toDateString();

  const isSameDay = (dateValue) => {
    if (!dateValue) return false;
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return false;
    return date.toDateString() === todayString;
  };

  const todayAppointments = reminders.appointments.filter((a) =>
    isSameDay(a.appointmentDate)
  );
  const todayMedicines = reminders.medicines;
  const todayOtherReminders = reminders.other.filter((o) =>
    isSameDay(o.reminderDate)
  );

  const periodTracker = reminders.period?.[0];

  const computeNextPeriodDate = (tracker) => {
    if (!tracker?.lastPeriodDate || !tracker?.cycleLength) return null;
    const lastPeriod = new Date(tracker.lastPeriodDate);
    if (Number.isNaN(lastPeriod.getTime())) return null;
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + Number(tracker.cycleLength));
    return nextPeriod;
  };

  const nextPeriodDate = periodTracker?.nextPeriodDate
    ? new Date(periodTracker.nextPeriodDate)
    : computeNextPeriodDate(periodTracker);

  const daysUntilNextPeriod = nextPeriodDate
    ? Math.ceil((nextPeriodDate - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  useEffect(() => {
    let isMounted = true;
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const loadSummary = async () => {
      try {
        setLoadError(false);
        if (!getCachedPatientProfile()) {
          setIsLoading(true);
        }

        const profileRes = await getPatientProfileApi();
        const patientData = profileRes.data;
        if (!isMounted) return;
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
          cholesterolRes,
        ] = await Promise.all([
          getPatientBmiApi(patientId),
          getMedicineRemindersApi(),
          getAppointmentRemindersApi(),
          getPeriodTrackerApi(),
          getOtherRemindersApi(),
          getPatientMetricGraphApi(patientId, "WEIGHT"),
          getPatientMetricGraphApi(patientId, "HEIGHT"),
          getPatientMetricGraphApi(patientId, "BLOOD_SUGAR"),
          getPatientMetricGraphApi(patientId, "CHOLESTEROL"),
        ]);

        if (!isMounted) return;

        setBmiInfo(bmiRes.data);
        setHealthStatus(getHealthStatusFromBmi(bmiRes.data));

        setReminders({
          medicines: medicineRes || [],
          appointments: appointmentRes || [],
          period: periodRes ? [periodRes] : [],
          other: otherRes || [],
        });

        setMetrics({
          weight: formatMetricData(weightRes.data),
          height: formatMetricData(heightRes.data),
          sugar: formatMetricData(sugarRes.data),
          cholesterol: formatMetricData(cholesterolRes.data),
        });
      } catch (err) {
        console.error("Failed to load summary data", err);
        if (isMounted) {
          setLoadError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadSummary();

    return () => {
      isMounted = false;
    };
  }, []);

  const METRIC_TYPES = {
    weight: "WEIGHT",
    height: "HEIGHT",
    sugar: "BLOOD_SUGAR",
    cholesterol: "CHOLESTEROL",
  };

  const METRIC_KEYS_BY_TYPE = {
    WEIGHT: "weight",
    HEIGHT: "height",
    BLOOD_SUGAR: "sugar",
    CHOLESTEROL: "cholesterol",
  };

  const refreshMetricGraphs = async (patientId, metricTypes) => {
    const results = await Promise.all(
      metricTypes.map((type) => getPatientMetricGraphApi(patientId, type))
    );

    setMetrics((prev) => {
      const next = { ...prev };
      metricTypes.forEach((type, index) => {
        const key = METRIC_KEYS_BY_TYPE[type];
        next[key] = formatMetricData(results[index].data);
      });
      return next;
    });
  };

  const handleEntryChange = (field) => (e) => {
    const { value } = e.target;
    if (value !== "" && !POSITIVE_NUMBER_PATTERN.test(value)) {
      return;
    }

    setEntry((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (entryError) setEntryError("");
  };

  const calculateBmi = (weightValue, heightValue) => {
    const weightKg = Number(weightValue);
    const heightCm = Number(heightValue);

    if (!Number.isFinite(weightKg) || !Number.isFinite(heightCm)) return;
    if (weightKg <= 0 || heightCm <= 0) return;

    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
  };

  const handleEntrySubmit = async (e) => {
    e.preventDefault();

    const hasAny = Object.values(entry).some((val) => val.trim());
    if (!hasAny) {
      setEntryError("Enter at least one value to update the graphs.");
      return;
    }

    if (!patient?.id) {
      setEntryError("Patient details not loaded yet.");
      return;
    }

    const metricInputs = Object.entries(entry)
      .filter(([, value]) => value.trim())
      .map(([key, value]) => ({
        type: METRIC_TYPES[key],
        value: Number(value),
      }))
      .filter((item) => Number.isFinite(item.value) && item.value > 0);

    if (metricInputs.length === 0) {
      setEntryError("Please enter valid numeric values.");
      return;
    }

    setIsSavingEntry(true);

    try {
      await Promise.all(
        metricInputs.map((item) =>
          addPatientMetricApi(patient.id, item.type, item.value)
        )
      );

      const bmiValue = calculateBmi(entry.weight, entry.height);
      if (Number.isFinite(bmiValue)) {
        await addPatientMetricApi(patient.id, "BMI", bmiValue);
      }

      await refreshMetricGraphs(
        patient.id,
        metricInputs.map((item) => item.type)
      );

      if (Number.isFinite(bmiValue)) {
        const bmiRes = await getPatientBmiApi(patient.id);
        setBmiInfo(bmiRes.data);
        setHealthStatus(getHealthStatusFromBmi(bmiRes.data));
      }

      setEntry({
        weight: "",
        height: "",
        sugar: "",
        cholesterol: "",
      });

      toast.success("Metrics saved. Charts updated.");
    } catch (err) {
      console.error("Failed to save metrics", err);
      toast.error("Failed to save metrics. Please try again.");
    } finally {
      setIsSavingEntry(false);
    }
  };

  if (isLoading && !patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading summary...</p>
      </div>
    );
  }

  if (loadError && !patient) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="rounded-2xl border border-red-100 bg-white px-6 py-5 text-center shadow-sm">
          <p className="font-semibold text-red-600">Unable to load summary</p>
          <p className="mt-2 text-sm text-gray-500">
            Please try again from the dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2FBFA] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-br from-[#18AAB0] to-[#86C443] rounded-3xl shadow-lg p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {greeting}, {getNameParts(patient).secondName || "there"} 👋
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
                {bmiInfo?.bmi?.toFixed(2) ?? "—"}
              </p>
              <p className="text-xs mt-1">
                {bmiInfo?.category ?? "Not available"}
              </p>
            </div>
          </div>

          {healthStatus && (
            <div className={`mt-4 rounded-xl p-4 border ${healthStatus.color}`}>
              <p className="text-sm font-medium">{healthStatus.message}</p>
            </div>
          )}

        </div>

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

        <div className="bg-white rounded-3xl shadow-sm p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">🧾 Add Current Metrics</h2>
            <span className="text-xs text-gray-500">Updates charts above</span>
          </div>

          <form onSubmit={handleEntrySubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricInput
                label="Weight (kg)"
                value={entry.weight}
                onChange={handleEntryChange("weight")}
                placeholder="e.g., 62.5"
              />
              <MetricInput
                label="Height (cm)"
                value={entry.height}
                onChange={handleEntryChange("height")}
                placeholder="e.g., 170"
              />
              <MetricInput
                label="Sugar (mg/dL)"
                value={entry.sugar}
                onChange={handleEntryChange("sugar")}
                placeholder="e.g., 98"
              />
              <MetricInput
                label="Cholesterol (mg/dL)"
                value={entry.cholesterol}
                onChange={handleEntryChange("cholesterol")}
                placeholder="e.g., 180"
              />
            </div>

            {entryError && <p className="text-sm text-red-600">{entryError}</p>}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSavingEntry}
                className="px-6 py-2 rounded-full bg-secondary text-white text-sm font-semibold hover:bg-secondary/90 transition"
              >
                {isSavingEntry ? "Saving..." : "Add to Charts"}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 lg:p-8">
          <h2 className="text-2xl font-semibold mb-6">🔔 Today&apos;s Reminders</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReminderSection
              title="Appointments"
              icon="📅"
              items={todayAppointments}
              empty="No appointments today"
              render={(a) => (
                <>
                  <p className="font-medium text-sm">{a.title || "Appointment"}</p>
                  <p className="text-xs text-gray-500">
                    🏥 {a.location || a.hospital || "Location not set"}
                  </p>
                  <p className="text-xs text-gray-500">
                    🕐 {a.time || a.appointmentTime || "Time not set"}
                  </p>
                  {(a.doctor || a.doctorName) && (
                    <p className="text-xs text-gray-500">
                      👨‍⚕️ {a.doctor || a.doctorName}
                    </p>
                  )}
                  {a.reason && (
                    <p className="text-xs text-gray-500">📝 {a.reason}</p>
                  )}
                </>
              )}
            />

            <ReminderSection
              title="Medicines"
              icon="💊"
              items={todayMedicines}
              empty="No medicine reminders"
              render={(m) => (
                <>
                  <p className="font-medium text-sm">{m.medicineName}</p>
                  <p className="text-xs text-gray-500">
                    💊 {m.dosage || "Dosage not set"}
                  </p>
                  <p className="text-xs text-gray-500">
                    🔁 {m.frequency || "Frequency not set"}
                  </p>
                  <p className="text-xs text-gray-500">🕐 {m.time}</p>
                  {m.duration && (
                    <p className="text-xs text-gray-500">📆 {m.duration} days</p>
                  )}
                  {m.notes && <p className="text-xs text-gray-500">📝 {m.notes}</p>}
                </>
              )}
            />

            {patient.gender === "Female" && (
              <ReminderSection
                title="Period Tracker"
                icon="🌸"
                items={periodTracker ? [periodTracker] : []}
                empty="No period reminders"
                render={(p) => (
                  <>
                    <p className="text-sm">
                      Next cycle expected around{" "}
                      {nextPeriodDate
                        ? nextPeriodDate.toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Not available"}
                    </p>
                    {daysUntilNextPeriod !== null && (
                      <p className="text-xs text-gray-500">
                        ⏳ {daysUntilNextPeriod} days remaining
                      </p>
                    )}
                    {p.notes && <p className="text-xs text-gray-500">📝 {p.notes}</p>}
                  </>
                )}
              />
            )}

            <ReminderSection
              title="Other Reminders"
              icon="📌"
              items={todayOtherReminders}
              empty="No other reminders"
              render={(o) => (
                <>
                  <p className="font-medium text-sm">{o.title}</p>
                  {o.category && (
                    <p className="text-xs text-gray-500">🏷️ {o.category}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    📅 {new Date(o.reminderDate).toLocaleDateString("en-US")}
                  </p>
                  {o.time && <p className="text-xs text-gray-500">🕐 {o.time}</p>}
                  {o.description && (
                    <p className="text-xs text-gray-500">📝 {o.description}</p>
                  )}
                </>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricInput({ label, value, onChange, placeholder }) {
  const handleKeyDown = (e) => {
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="number"
        min="0"
        step="0.1"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        inputMode="decimal"
        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-secondary focus:ring-2 focus:ring-secondary/20"
        placeholder={placeholder}
      />
    </div>
  );
}

function MetricCard({ title, data, unit }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h3 className="font-semibold mb-4">{title}</h3>

      {data.length === 0 ? (
        <p className="text-sm text-gray-400 text-center">No data available</p>
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
          <p className="text-sm text-gray-400 italic text-center">{empty}</p>
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
