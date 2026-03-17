import { useEffect, useState } from "react";
import { getPatientProfileApi } from "../../api/PatientApi";
import { User, X } from "lucide-react";
import { getDisplayName } from "../../utils/nameUtils";

/* ---------- DUMMY DATA ---------- */
const DUMMY_PATIENT = {
  fullName: "John Michael Doe",
  email: "parindyahewage7@gmail.com",
  patientId: "PAT-000123",
  dateOfBirth: "1995-08-14",
  age: 29,
  gender: "Male",
  photoUrl: "/profilePic.png",
};

export default function PatientDataComponent() {
  const [patient, setPatient] = useState(DUMMY_PATIENT);
  const [open, setOpen] = useState(false); // mobile toggle

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const cached = localStorage.getItem("patient_me_cache");
        if (cached) {
          setPatient({ ...DUMMY_PATIENT, ...JSON.parse(cached) });
          return;
        }

        const res = await getPatientProfileApi();
        setPatient({ ...DUMMY_PATIENT, ...res.data });
        localStorage.setItem("patient_me_cache", JSON.stringify(res.data));
      } catch (err) {
        console.error("Failed to load patient data, using dummy data", err);
        setPatient(DUMMY_PATIENT);
      }
    };

    loadProfile();
  }, []);

  if (!patient) return null;
  const patientDisplayName = getDisplayName(patient);

  return (
    <>
      {/* 🔘 MOBILE USER ICON (HIDDEN WHEN SIDEBAR IS OPEN) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="md:hidden fixed bottom-5 left-5 z-50 bg-[#18AAB0] text-white p-3 rounded-full shadow-lg"
        >
          <User size={20} />
        </button>
      )}

      {/* 🩺 PATIENT SIDEBAR */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          h-screen md:h-auto
          w-80
          bg-white
          border-r border-gray-200
          px-6 md:px-8
          py-6 md:py-10
          flex flex-col
          z-40
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* ❌ CLOSE BUTTON (MOBILE ONLY) */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setOpen(false)}>
            <X size={22} className="text-gray-600" />
          </button>
        </div>

        {/* PROFILE HEADER */}
        <div className="flex flex-col items-center text-center mb-10">
          <img
            src={patient.photoUrl || "/profilePic.png"}
            alt={patientDisplayName}
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
          />

          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            {patient.patientId}
          </h3>

          <p className="text-xs text-gray-500 mt-1 tracking-wide">
            {patientDisplayName}
          </p>

          <p className="text-xs text-gray-500 mt-1 tracking-wide break-all">
            {patient.email}
          </p>
        </div>

        {/* PERSONAL INFORMATION */}
        <section className="flex-1 overflow-y-auto">
          <h2 className="text-sm font-semibold text-gray-800 mb-6 uppercase tracking-wide">
            Personal Information
          </h2>

          <div className="space-y-4">
            <Info label="Full Name" value={patientDisplayName} />
            <Info label="Date of Birth" value={patient.dateOfBirth} />
            <Info label="Age" value={patient.age} />
            <Info label="Gender" value={patient.gender} />
          </div>
        </section>

        {/* MORE INFO */}
        <div className="pt-6 border-t border-gray-200">
          <button className="text-sm font-medium text-[#18AAB0] hover:text-[#0F7F84] transition">
            More Information →
          </button>
        </div>
      </aside>
    </>
  );
}

/* ---------- INFO ROW ---------- */
function Info({ label, value }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm font-medium text-gray-900 text-right">
        {value || "-"}
      </span>
    </div>
  );
}
