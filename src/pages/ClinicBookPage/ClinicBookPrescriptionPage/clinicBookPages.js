export const prescriptions = [
  /* =========================
     CLINIC BOOK : CB001 (5)
     ========================= */

  {
    id: "RX001",
    clinicBookId: "CB001",
    createdAt: "2026-01-06",
    reason: "Chest pain",

    doctor: {
      name: "Dr. Sarah Johnson",
      email: "dr.sarah@hospital.lk",
      slmc: "SLMC-45678",
    },

    patient: {
      name: "Parindya Hewage",
      age: 23,
      gender: "Female",
    },

    vitals: {
      bp: "120/80",
      HeartRate: "72",
      temp: "36.8°C",
      weight: "55kg",
      BloodSugar: "110",
    },

    medications: [
      { name: "Paracetamol", dose: "500mg", freq: "M-A-N", days: "5 days" },
      { name: "Amoxicillin", dose: "250mg", freq: "M-A-N", days: "7 days" },
    ],

    examine: "Mild chest discomfort",
    tests: "ECG",
  },

  {
    id: "RX002",
    clinicBookId: "CB001",
    createdAt: "2026-01-08",
    reason: "Gastric pain",

    doctor: {
      name: "Dr. Sarah Johnson",
      email: "dr.sarah@hospital.lk",
      slmc: "SLMC-45678",
    },

    patient: {
      name: "Parindya Hewage",
      age: 23,
      gender: "Female",
    },

    vitals: {
      bp: "118/78",
      HeartRate: "70",
      temp: "36.7°C",
      weight: "54kg",
      BloodSugar: "108",
    },

    medications: [
      { name: "Omeprazole", dose: "20mg", freq: "M", days: "14 days" },
    ],

    examine: "Epigastric tenderness",
    tests: "H. pylori test",
  },

  {
    id: "RX003",
    clinicBookId: "CB001",
    createdAt: "2026-01-10",
    reason: "Follow-up visit",

    doctor: {
      name: "Dr. Sarah Johnson",
      email: "dr.sarah@hospital.lk",
      slmc: "SLMC-45678",
    },

    patient: {
      name: "Parindya Hewage",
      age: 23,
      gender: "Female",
    },

    vitals: {
      bp: "120/82",
      HeartRate: "74",
      temp: "36.9°C",
      weight: "55kg",
      BloodSugar: "109",
    },

    medications: [
      { name: "Antacid", dose: "10ml", freq: "TDS", days: "7 days" },
    ],

    examine: "Symptoms improving",
    tests: "None",
  },

  {
    id: "RX004",
    clinicBookId: "CB001",
    createdAt: "2026-01-15",
    reason: "Abdominal discomfort",

    doctor: {
      name: "Dr. Sarah Johnson",
      email: "dr.sarah@hospital.lk",
      slmc: "SLMC-45678",
    },

    patient: {
      name: "Parindya Hewage",
      age: 23,
      gender: "Female",
    },

    vitals: {
      bp: "117/76",
      HeartRate: "69",
      temp: "36.6°C",
      weight: "54kg",
      BloodSugar: "107",
    },

    medications: [
      { name: "Domperidone", dose: "10mg", freq: "BD", days: "5 days" },
    ],

    examine: "No guarding",
    tests: "Ultrasound abdomen",
  },

  {
    id: "RX005",
    clinicBookId: "CB001",
    createdAt: "2026-01-20",
    reason: "Routine follow-up",

    doctor: {
      name: "Dr. kamal",
      email: "dr.sarah@hospital.lk",
      slmc: "SLMC-45678",
    },

    patient: {
      name: "Parindya Hewage",
      age: 23,
      gender: "Female",
    },

    vitals: {
      bp: "119/80",
      HeartRate: "71",
      temp: "36.8°C",
      weight: "55kg",
      BloodSugar: "106",
    },

    medications: [
      { name: "Vitamin B Complex", dose: "1 tab", freq: "OD", days: "30 days" },
    ],

    examine: "Stable condition",
    tests: "None",
  },

  /* =========================
     CLINIC BOOK : CB002 (3)
     ========================= */

  {
    id: "RX006",
    clinicBookId: "CB002",
    createdAt: "2026-01-10",
    reason: "Routine checkup",

    doctor: {
      name: "Dr. Silva",
      email: "dr.silva@hospital.lk",
      slmc: "SLMC-45872",
    },

    patient: {
      name: "Parindya Hewage",
      age: 23,
      gender: "Female",
    },

    vitals: {
      bp: "118/78",
      HeartRate: "70",
      temp: "36.7°C",
      weight: "56kg",
      BloodSugar: "105",
    },

    medications: [
      { name: "Vitamin C", dose: "500mg", freq: "OD", days: "10 days" },
    ],

    examine: "Normal examination",
    tests: "None",
  },

  {
    id: "RX007",
    clinicBookId: "CB002",
    createdAt: "2026-01-14",
    reason: "Headache",

    doctor: {
      name: "Dr. ranii",
      email: "dr.silva@hospital.lk",
      slmc: "SLMC-45872",
    },

    patient: {
      name: "Parindya Hewage",
      age: 23,
      gender: "Female",
    },

    vitals: {
      bp: "116/75",
      HeartRate: "68",
      temp: "36.6°C",
      weight: "56kg",
      BloodSugar: "104",
    },

    medications: [
      { name: "Paracetamol", dose: "500mg", freq: "SOS", days: "3 days" },
    ],

    examine: "Tension headache",
    tests: "None",
  },

  {
    id: "RX008",
    clinicBookId: "CB002",
    createdAt: "2026-01-18",
    reason: "Follow-up visit",

    doctor: {
      name: "Dr. Silva",
      email: "dr.silva@hospital.lk",
      slmc: "SLMC-45872",
    },

    patient: {
      name: "Parindya Hewage",
      age: 23,
      gender: "Female",
    },

    vitals: {
      bp: "117/76",
      HeartRate: "69",
      temp: "36.7°C",
      weight: "56kg",
      BloodSugar: "103",
    },

    medications: [
      { name: "Multivitamin", dose: "1 tab", freq: "OD", days: "15 days" },
    ],

    examine: "Stable",
    tests: "None",
  },
];