// import { useNavigate } from "react-router-dom";
// import { FaBookMedical } from "react-icons/fa";
// import { FiClock, FiUser, FiEdit, FiArrowRight } from "react-icons/fi";

// export default function ClinicBookCard({ book }) {
//   const navigate = useNavigate();

//   const openBook = () => {
//     navigate(`/clinic-book/${book.id}`);
//   };

//   const goInside = () => {
//     navigate(`/clinic-book/${book.id}/pages`);
//   };

//   const editBook = (e) => {
//     e.stopPropagation();
//     navigate(`/clinic-book/${book.id}/edit`);
//   };

//   return (
//     <div
//       className="
//         group relative bg-white rounded-3xl
//         p-6 flex gap-6 items-center
//         shadow-lg hover:shadow-2xl
//         transition-all duration-300
//         hover:-translate-y-2
//         overflow-hidden
//       "
//     >
//       {/* COLOR STRIPE */}
//       <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-[#7C3AED] via-[#18AAB0] to-[#86C443]" />

//       {/* EDIT (SMALL) */}
//       <button
//         onClick={editBook}
//         className="
//           absolute top-4 right-4
//           flex items-center gap-1
//           text-xs text-gray-500
//           hover:text-[#18AAB0]
//           transition
//         "
//       >
//         <FiEdit size={14} />
//         Edit
//       </button>

//       {/* BOOK COVER */}
//       <div className="relative w-24 h-32 rounded-xl overflow-hidden shadow-xl">
//         <div className="absolute left-0 top-0 h-full w-2 bg-black/20" />
//         <div className="h-full w-full bg-gradient-to-br from-primary via-[#18AAB0] to-[#86C443]
//                         flex flex-col items-center justify-center text-white">
//           <FaBookMedical className="text-4xl mb-2" />
//           <span className="text-[11px] font-semibold tracking-wide">
//             CLINIC BOOK
//           </span>
//         </div>
//       </div>

//       {/* DETAILS */}
//       <div className="flex-1">
//         <h3 className="text-xl font-bold text-[#0F4F52]">
//           Dr. {book.doctorName}
//         </h3>

//         <p className="text-sm text-gray-600">{book.doctorNo}</p>

//         <p className="text-xs text-gray-500 uppercase tracking-wide">
//           {book.specialization}
//         </p>

//         {/* MEDICATION PURPOSE */}
//         <p className="mt-3 text-sm font-medium text-[#0F4F52]">
//           🩺 {book.medicationPurpose}
//         </p>

//         {/* META */}
//         <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-gray-600">
//           <div className="flex items-center gap-1">
//             <FiClock />
//             {new Date(book.lastUpdated).toLocaleDateString()}
//           </div>
//           <div className="flex items-center gap-1">
//             <FiUser />
//             Updated by Dr. {book.lastUpdatedBy}
//           </div>
//         </div>

//         {/* ACTION BUTTONS */}
//         <div className="mt-6 flex gap-3">
//           {/* PRIMARY */}
//           <button
//             onClick={openBook}
//             className="
//               flex items-center gap-2
//               px-6 py-2.5 rounded-xl
//               bg-gradient-to-r from-primary to-[#18AAB0]
//               text-white text-sm font-semibold
//               shadow-md hover:shadow-lg
//               transition
//             "
//           >
//             View Clinic Book
//           </button>

//           {/* SECONDARY */}
//           <button
//             onClick={goInside}
//             className="
//               flex items-center gap-2
//               px-5 py-2.5 rounded-xl
//               border border-[#18AAB0]/40
//               text-[#0F4F52] text-sm font-semibold
//               hover:bg-[#18AAB0]/10
//               transition
//             "
//           >
//             Go Inside
//             <FiArrowRight />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { BookOpen, Clock, User, Edit2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ClinicBookCard({ book, onEdit }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/clinic-book/${book.id}/edit`);
  };

  const handleView = () => {
    navigate(`/clinic-book/${book.id}`);
  };

  const handleGoInside = (e) => {
    e.stopPropagation();
    navigate(`/clinic-book/${book.id}/pages`);
  };

  return (
    <div
      onClick={handleView}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="
        relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
        rounded-2xl p-6  overflow-hidden
        border border-slate-700/60
        transition-all duration-500 hover:-translate-y-2
      "
      style={{
        boxShadow: hovered
          ? "0 25px 50px -12px rgba(134,196,67,0.25)"
          : "none",
      }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(134,196,67,0.08), transparent, rgba(24,170,176,0.08))",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Edit */}
      {/* <button
        onClick={handleEdit}
        className="
          absolute top-4 right-4 z-10
          p-2 rounded-xl bg-slate-800/80
          border border-slate-700
          text-slate-400 hover:text-[#86c443]
        "
      >
        <Edit2 size={14} />
      </button> */}

      <button
  onClick={(e) => {
    e.stopPropagation();
    onEdit(book);
  }}
  className="absolute top-4 right-4 z-10 p-2 rounded-xl cursor-pointer bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-[#86c443]"
>
  <Edit2 size={14} />
</button>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6 relative z-10">
        <div
          className="p-3 rounded-xl transition-transform"
          style={{
            background: "linear-gradient(135deg,#86c443,#18AAB0)",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          <BookOpen className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <span className="inline-block text-xs px-3 py-1 rounded-full border border-[#86c443]/40 text-[#86c443] mb-2">
            CLINIC BOOK
          </span>

          <h3 className="text-lg font-bold text-white truncate">
            Dr. {book.doctorName}
          </h3>
          <p className="text-sm text-slate-400">{book.doctorNo}</p>
          <p className="text-sm text-[#18AAB0] font-medium">
            {book.specialization}
          </p>
          <p className="text-xs text-slate-400">{book.access}</p>
        </div>
      </div>

      {/* Purpose */}
      <div className="mb-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700">
        <p className="text-sm text-slate-300 flex items-center gap-2">
          <span>🩺</span>
          {book.medicationPurpose}
        </p>
      </div>

      {/* Meta */}
      <div className="flex gap-4 text-xs text-slate-400 mb-6">
        <div className="flex items-center gap-1">
          <Clock size={14} className="text-[#86c443]" />
          {new Date(book.lastUpdated).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-1">
          <User size={14} className="text-[#86c443]" />
          Dr. {book.lastUpdatedBy}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleView}
          className="
            flex-1 px-4 py-2 rounded-xl
            bg-slate-800 border border-slate-700
            text-slate-300 text-sm font-medium
            hover:border-[#86c443]/50 hover:text-white cursor-pointer
          "
        >
          View Book
        </button>

        <button
          onClick={handleGoInside}
          className="
            flex-1 px-4 py-2 rounded-xl
            bg-gradient-to-r from-[#86c443] to-[#18AAB0]
            text-white text-sm font-semibold
            flex items-center justify-center gap-2 cursor-pointer
          
          "
        >
          Go Inside
          <ArrowRight
            size={16}
            className={`transition-transform ${hovered ? "translate-x-1" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
