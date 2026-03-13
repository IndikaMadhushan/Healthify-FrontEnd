import { useState, useEffect, useRef } from "react";

// EDIT YOUR DOCTOR DATA HERE

const DOCTOR = {
  name: "Dr. Charuka Anjalee",
  gender: "Female",
  nic: "200012345678",
  dob: "1992-05-14",
  specialization: "Neurology",
  qualification: "MBBS, MD (Neurology), FRCP",
  hospital: "National Hospital Colombo",
  yearsExperience: 12,
  licenseNumber: "SLMC2345",
  email: "example@gmail.com",
  phone: "+94 77 234 5678",
  bio: "Dr. Charuka Anjalee is a board-certified neurologist with over 12 years of clinical experience specializing in complex neurological conditions. She completed her medical degree at the University of Colombo and pursued advanced training in Neurology at the postgraduate level.",
  summary:
    "With a deep commitment to evidence-based medicine, Dr. Anjalee has led numerous clinical trials and research initiatives focusing on early intervention strategies for stroke and epilepsy. She is a fellow of the Royal College of Physicians and an active contributor to the Sri Lanka Medical Journal.",

  languages: ["English", "Sinhala"],
  expertise: ["Migraine Disorders", "Parkinson's Disease"],
  availableDays: ["Monday", "Wednesday", "Friday"],
  consultationTime: "00:00 AM – 00:00 PM",
  stats: {
    totalPatients: 1284,
    activePatients: 47,
    feedbackGiven: 312,
    avgRating: 4.8,
  },

  verified: true,
};

// SKELETON — shown while data loads

function Skeleton() {
  return (
    <div className="animate-pulse space-y-5 p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
        <div className="h-28 bg-slate-200" />
        <div className="px-6 pb-6 flex gap-5 -mt-10">
          <div className="w-24 h-24 rounded-2xl bg-slate-300 border-4 border-white shrink-0" />
          <div className="flex-1 pt-12 space-y-2">
            <div className="h-5 bg-slate-200 rounded w-52" />
            <div className="h-3 bg-slate-100 rounded w-36" />
            <div className="h-3 bg-slate-100 rounded w-48" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-slate-200 rounded-2xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3"
            >
              <div className="h-4 bg-slate-200 rounded w-40" />
              <div className="h-3 bg-slate-100 rounded w-full" />
              <div className="h-3 bg-slate-100 rounded w-5/6" />
              <div className="h-3 bg-slate-100 rounded w-4/6" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3">
          <div className="h-4 bg-slate-200 rounded w-32" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-3 bg-slate-100 rounded w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

// PROFILE HEADER CARD

function ProfileHeader({ doctor, onAvatarChange, isEditing, draft, onChange }) {
  const fileRef = useRef(null);
  const initials = doctor.name
    .replace("Dr. ", "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) onAvatarChange(URL.createObjectURL(file));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Banner */}
      <div className="h-28 bg-linear-to-r from-teal-500 to-green-300 relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
          {/* Avatar */}
          <div className="relative shrink-0 group w-24 h-24">
            {doctor.avatarUrl ? (
              <img
                src={doctor.avatarUrl}
                alt={doctor.name}
                className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg bg-linear-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {initials}
                </span>
              </div>
            )}
            {/* Upload overlay — always available */}
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 border-4 border-white cursor-pointer"
              title="Upload photo"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-[10px] font-bold text-white tracking-wider">
                CHANGE
              </span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
          </div>

          {/* Name & meta — editable when isEditing */}
          <div className="flex-1 sm:pb-1 space-y-1">
            {isEditing ? (
              /* ── EDIT MODE ── */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4">
                {/* Full Name */}
                <input
                  value={draft.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  placeholder="Full name"
                  className="col-span-2 px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 font-semibold text-slate-800"
                />

                <div className="col-span-2 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest w-28 shrink-0">
                    Gender
                  </span>
                  <div className="flex items-center gap-5">
                    {["Male", "Female", "Other"].map((g) => (
                      <label
                        key={g}
                        className="flex items-center gap-1.5 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={draft.gender === g}
                          onChange={() => onChange("gender", g)}
                          className="w-4 h-4 accent-teal-600 cursor-pointer"
                        />
                        <span className="text-sm text-slate-700 group-hover:text-teal-700 transition-colors">
                          {g}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest w-28 shrink-0">
                    NIC Number
                  </span>
                  <input
                    value={draft.nic}
                    onChange={(e) => onChange("nic", e.target.value)}
                    placeholder="e.g. 200012345678"
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
                  />
                </div>

                <div className="col-span-2 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest w-28 shrink-0">
                    Date of Birth
                  </span>
                  <input
                    type="date"
                    value={draft.dob}
                    onChange={(e) => onChange("dob", e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 text-slate-700"
                  />
                </div>

                {/* Specialization */}
                <input
                  value={draft.specialization}
                  onChange={(e) => onChange("specialization", e.target.value)}
                  placeholder="Specialization"
                  className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
                />

                {/* Qualification */}
                <input
                  value={draft.qualification}
                  onChange={(e) => onChange("qualification", e.target.value)}
                  placeholder="Qualification"
                  className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
                />

                {/* Hospital */}
                <input
                  value={draft.hospital}
                  onChange={(e) => onChange("hospital", e.target.value)}
                  placeholder="Hospital / Clinic"
                  className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
                />

                {/* Years of Experience */}
                <input
                  type="number"
                  value={draft.yearsExperience}
                  onChange={(e) =>
                    onChange("yearsExperience", Number(e.target.value))
                  }
                  placeholder="Years of experience"
                  className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400"
                />
              </div>
            ) : (
              /* ── VIEW MODE ── */
              <>
                <div className="flex flex-wrap items-center gap-2 pt-4">
                  <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                    {doctor.name}
                  </h1>
                  {doctor.verified && (
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified Doctor
                    </span>
                  )}
                </div>

                <p className="text-teal-600 font-semibold text-sm">
                  {doctor.specialization}
                </p>
                <p className="text-slate-500 text-sm">{doctor.qualification}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {doctor.gender && (
                    <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 border border-purple-100 text-xs font-semibold px-2.5 py-1 rounded-lg">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {doctor.gender}
                    </span>
                  )}
                  {doctor.nic && (
                    <span className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-600 border border-slate-200 text-xs font-semibold px-2.5 py-1 rounded-lg font-mono tracking-wide">
                      <svg
                        className="w-3.5 h-3.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2"
                        />
                      </svg>
                      NIC: {doctor.nic}
                    </span>
                  )}
                  {doctor.dob && (
                    <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold px-2.5 py-1 rounded-lg">
                      <svg
                        className="w-3.5 h-3.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(doctor.dob).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 mt-1 text-slate-500 text-sm">
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-teal-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    {doctor.hospital}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4 text-teal-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {doctor.yearsExperience} years of experience
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ABOUT SECTION

function AboutSection({ doctor, isEditing, draft, onChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2">
        About
      </h2>

      <div className="space-y-5">
        {/* Biography */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Biography
          </p>
          {isEditing ? (
            <textarea
              rows={4}
              value={draft.bio}
              onChange={(e) => onChange("bio", e.target.value)}
              className="w-full px-3 py-2.5 text-sm text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 resize-none leading-relaxed transition-all"
            />
          ) : (
            <p className="text-sm text-slate-600 leading-relaxed">
              {doctor.bio}
            </p>
          )}
        </div>

        <div className="border-t border-slate-50 pt-5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Professional Summary
          </p>
          {isEditing ? (
            <textarea
              rows={4}
              value={draft.summary}
              onChange={(e) => onChange("summary", e.target.value)}
              className="w-full px-3 py-2.5 text-sm text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 resize-none leading-relaxed transition-all"
            />
          ) : (
            <p className="text-sm text-slate-600 leading-relaxed">
              {doctor.summary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// PROFESSIONAL DETAILS SIDEBAR

function TagList({ tags, onRemove, onAdd, chipCls, editing }) {
  const [input, setInput] = useState("");
  const add = () => {
    const t = input.trim();
    if (t && !tags.includes(t)) onAdd(t);
    setInput("");
  };
  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border ${chipCls}`}
        >
          {tag}
          {editing && (
            <button
              onClick={() => onRemove(tag)}
              className="ml-0.5 hover:opacity-60"
            >
              <svg
                className="w-2.5 h-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </span>
      ))}
      {editing && (
        <div className="flex gap-1 mt-0.5">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="Add…"
            className="w-20 text-xs border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition-all"
          />
          <button
            onClick={add}
            className="text-xs px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-lg font-bold transition-colors"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

// Expertise suggestions list
const EXPERTISE_SUGGESTIONS = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Psychiatry",
  "Oncology",
  "Radiology",
  "Endocrinology",
  "Gastroenterology",
  "Nephrology",
  "Pulmonology",
  "Urology",
  "Ophthalmology",
  "ENT (Otolaryngology)",
  "Rheumatology",
  "General Medicine",
  "Family Medicine",
  "Gynecology",
  "Emergency Medicine",
];

// Expertise tag input with dropdown autocomplete suggestions
function ExpertiseTagList({ tags, onAdd, onRemove, editing }) {
  const [input, setInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  // Filter suggestions: match input text, exclude already-added tags
  const filtered = EXPERTISE_SUGGESTIONS.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s),
  );

  const addTag = (value) => {
    const t = value.trim();
    if (t && !tags.includes(t)) onAdd(t);
    setInput("");
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {/* Existing tags */}
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border bg-teal-50 text-teal-700 border-teal-100"
        >
          {tag}
          {editing && (
            <button
              onClick={() => onRemove(tag)}
              className="ml-0.5 hover:opacity-60"
            >
              <svg
                className="w-2.5 h-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </span>
      ))}

      {/* Input + dropdown */}
      {editing && (
        <div ref={wrapperRef} className="relative mt-0.5">
          <div className="flex gap-1">
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // Pick first filtered suggestion or use raw input
                  addTag(filtered.length > 0 ? filtered[0] : input);
                }
                if (e.key === "Escape") setShowDropdown(false);
              }}
              placeholder="Add…"
              className="w-36 text-xs border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 transition-all"
            />
            <button
              onClick={() =>
                addTag(filtered.length > 0 && input ? filtered[0] : input)
              }
              className="text-xs px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-lg font-bold transition-colors"
            >
              +
            </button>
          </div>

          {/* Dropdown */}
          {showDropdown && filtered.length > 0 && (
            <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden w-56">
              <ul className="max-h-48 overflow-y-auto py-1">
                {filtered.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault(); // prevent input blur before click fires
                        addTag(suggestion);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProfessionalDetails({ doctor, isEditing, draft, onChange }) {
  // helpers for tag arrays
  const addExpertise = (t) => onChange("expertise", [...draft.expertise, t]);
  const rmExpertise = (t) =>
    onChange(
      "expertise",
      draft.expertise.filter((x) => x !== t),
    );
  const addLanguage = (t) => onChange("languages", [...draft.languages, t]);
  const rmLanguage = (t) =>
    onChange(
      "languages",
      draft.languages.filter((x) => x !== t),
    );

  const toggleDay = (day) => {
    const days = draft.availableDays.includes(day)
      ? draft.availableDays.filter((d) => d !== day)
      : [...draft.availableDays, day];
    onChange("availableDays", days);
  };

  const ALL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const FULL_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2">
        Professional Details
      </h2>

      <div className="space-y-4">
        {/* License */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            License Number
          </p>
          {isEditing ? (
            <input
              value={draft.licenseNumber}
              onChange={(e) => onChange("licenseNumber", e.target.value)}
              placeholder="SLMC number"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 transition-all"
            />
          ) : (
            <span className="font-mono bg-teal-50 text-teal-700 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider">
              {doctor.licenseNumber}
            </span>
          )}
        </div>

        {/* Expertise */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Areas of Expertise
          </p>
          <ExpertiseTagList
            tags={isEditing ? draft.expertise : doctor.expertise}
            onAdd={addExpertise}
            onRemove={rmExpertise}
            editing={isEditing}
          />
        </div>

        {/* Languages */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Languages
          </p>
          <TagList
            tags={isEditing ? draft.languages : doctor.languages}
            onAdd={addLanguage}
            onRemove={rmLanguage}
            chipCls="bg-blue-50 text-blue-700 border-blue-100"
            editing={isEditing}
          />
        </div>

        {/* Available Days */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Available Days
          </p>
          {isEditing ? (
            <div className="flex flex-wrap gap-1.5">
              {FULL_DAYS.map((day, i) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                    draft.availableDays.includes(day)
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {ALL_DAYS[i]}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {doctor.availableDays.map((day) => (
                <span
                  key={day}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100"
                >
                  {day.slice(0, 3)}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Consultation Time */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Consultation Hours
          </p>
          {isEditing ? (
            <div className="flex gap-2">
              <select
                value={draft.startTime}
                onChange={(e) => onChange("startTime", e.target.value)}
                className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 transition-all"
              >
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = i % 12 === 0 ? 12 : i % 12;
                  const ampm = i < 12 ? "AM" : "PM";
                  return (
                    <option key={i} value={`${hour}:00 ${ampm}`}>
                      {hour}:00 {ampm}
                    </option>
                  );
                })}
              </select>
              <span className="self-center text-slate-500">–</span>
              <select
                value={draft.endTime}
                onChange={(e) => onChange("endTime", e.target.value)}
                className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 transition-all"
              >
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = i % 12 === 0 ? 12 : i % 12;
                  const ampm = i < 12 ? "AM" : "PM";
                  return (
                    <option key={i} value={`${hour}:00 ${ampm}`}>
                      {hour}:00 {ampm}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : (
            <p className="text-sm text-slate-700 font-medium">
              {doctor.consultationTime}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Email
          </p>
          {isEditing ? (
            <input
              type="email"
              value={draft.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="email@example.com"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 transition-all"
            />
          ) : (
            <a
              href={`mailto:${doctor.email}`}
              className="text-sm text-teal-600 hover:underline"
            >
              {doctor.email}
            </a>
          )}
        </div>

        {/* Phone */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
            Phone
          </p>
          {isEditing ? (
            <input
              type="tel"
              value={draft.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="+94 77 000 0000"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 transition-all"
            />
          ) : (
            <a
              href={`tel:${doctor.phone}`}
              className="text-sm text-teal-600 hover:underline"
            >
              {doctor.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// TOAST NOTIFICATION

function Toast({ message, visible }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-800 text-white px-4 py-3 rounded-xl shadow-2xl text-sm font-semibold transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg
        className="w-4 h-4 text-emerald-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 13l4 4L19 7"
        />
      </svg>
      {message}
    </div>
  );
}

// ROOT COMPONENT

export default function DoctorProfile() {
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState(null); // committed data
  const [draft, setDraft] = useState(null); // in-edit copy
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const toastTimer = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setDoctor(DOCTOR);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  const showToast = (message) => {
    setToast({ visible: true, message });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setToast({ visible: false, message: "" }),
      2500,
    );
  };

  const startEditing = () => {
    setDraft({ ...doctor });
    setIsEditing(true);
  };

  const handleDraftChange = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setDoctor({ ...draft });
    setIsEditing(false);
    showToast("Profile saved successfully!");
  };

  const handleCancel = () => {
    setDraft(null);
    setIsEditing(false);
  };

  const handleAvatarChange = (url) => {
    setDoctor((prev) => ({ ...prev, avatarUrl: url }));
    if (isEditing) setDraft((prev) => ({ ...prev, avatarUrl: url }));
    showToast("Profile photo updated!");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 pt-16">
        <Skeleton />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* <Navbar doctor={doctor} /> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
        {/* ── Page title + Edit / Save / Cancel bar ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">My Profile</h1>
            <p className="text-sm text-slate-400 mt-0.5">
              {isEditing
                ? "You are in edit mode — update your details and save."
                : "View and manage your professional profile."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={startEditing}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Edit mode banner */}
        {isEditing && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-3 sm:px-4 flex items-start sm:items-center gap-3 text-amber-700 text-sm font-medium transition-all">
            <svg
              className="w-5 h-5 sm:w-4 sm:h-4 shrink-0 text-amber-500 mt-0.5 sm:mt-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>

            <p className="leading-relaxed sm:leading-normal">
              Edit mode is active. All fields below are now editable.
              <span className="block sm:inline mt-1 sm:mt-0">
                Click <strong className="mx-0.5">Save Changes</strong> to apply
                or
                <strong className="mx-0.5">Cancel</strong> to discard.
              </span>
            </p>
          </div>
        )}

        {/* Profile Header Card */}
        <ProfileHeader
          doctor={doctor}
          onAvatarChange={handleAvatarChange}
          isEditing={isEditing}
          draft={draft || doctor}
          onChange={handleDraftChange}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <AboutSection
              doctor={doctor}
              isEditing={isEditing}
              draft={draft || doctor}
              onChange={handleDraftChange}
            />
          </div>

          <div>
            <ProfessionalDetails
              doctor={doctor}
              isEditing={isEditing}
              draft={draft || doctor}
              onChange={handleDraftChange}
            />
          </div>
        </div>
      </main>

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
