
// change edit button with role
import { useState } from "react";
import { BookOpen, Clock, User, Edit2, ArrowRight } from "lucide-react";
import { useNavigate,useParams } from "react-router-dom";

export default function ClinicBookCard({ book, onEdit, onView }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { patientId } = useParams();

  

  const rawRole = localStorage.getItem("role");
   const role = rawRole?.toUpperCase();
  const handleGoInside = () => {
  if (role === "PATIENT") {
    navigate(`/patient/medical-reports/clinic-book/${book.id}/pages`);
  } else if (role === "DOCTOR") {
    navigate(`/doctor/${patientId}/medical-reports/clinic-book/${book.id}/pages`);
  }
};
const canEdit = role === "DOCTOR";
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="
        relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
        rounded-2xl p-6 overflow-hidden
        border border-slate-700/60
        transition-all duration-500 hover:-translate-y-2
      "
      style={{
        boxShadow: hovered
          ? "0 25px 50px -12px rgba(134,196,67,0.25)"
          : "none",
      }}
    >
      {/* EDIT (DOCTOR ONLY) */}
      {canEdit && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(book);
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-800/80
                     border border-slate-700 text-slate-400 hover:text-[#86c443]"
        >
          <Edit2 size={14} />
        </button>
      )}

      {/* HEADER */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className="p-3 rounded-xl"
          style={{ background: "linear-gradient(135deg,#86c443,#18AAB0)" }}
        >
          <BookOpen className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1">
          <span className="text-xs px-3 py-1 rounded-full border
                           border-[#86c443]/40 text-[#86c443]">
            CLINIC BOOK
          </span>

          <h3 className="text-lg font-bold text-white mt-2">
            Dr. {book.doctorName}
          </h3>
          <p className="text-sm text-slate-400">{book.doctorNo}</p>
          <p className="text-xs text-slate-400">{book.access}</p>
          <p className="text-sm text-[#18AAB0]">{book.specialization}</p>
        </div>
      </div>

      {/* PURPOSE */}
      <div className="mb-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700">
        <p className="text-sm text-slate-300">
          🩺 {book.medicationPurpose}
        </p>
      </div>

      {/* META */}
      <div className="flex gap-9 text-xs text-slate-400 mb-6">
        <div className="flex items-center gap-1 flex-col items-start">
          <Clock size={14} className="text-[#86c443]" />
         <p>Last Updated:</p> {new Date(book.lastUpdated).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-1 flex-col items-start">
          <User size={14} className="text-[#86c443]" />
            <p>last updated by </p>
           <p> Dr. {book.lastUpdatedBy}</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button
          onClick={() => onView(book)}
          className="flex-1 px-4 py-2 rounded-xl
                     bg-slate-800 border border-slate-700
                     text-slate-300 hover:text-white"
        >
          View Book
        </button>

        <button
          className="flex-1 px-4 py-2 rounded-xl
                    bg-gradient-to-r from-[#86c443] to-[#18AAB0]
                    text-white flex items-center justify-center gap-2"
          onClick={handleGoInside}
        >
          Go Inside
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
