// import { useState } from "react";
// import { X, Trash2, Save } from "lucide-react";

// export default function EditClinicBookModal({
//   book,
//   onClose,
//   onSave,
//   onDelete,
// }) {
//   const [reason, setReason] = useState(book.medicationPurpose || "");
//   const [access, setAccess] = useState(book.access || "ACCESS_ALL");

//   const handleSave = () => {
//     onSave({
//       ...book,
//       medicationPurpose: reason,
//       access,
//     });
//     onClose();
//   };

//   const handleDelete = () => {
//     if (confirm("Are you sure you want to delete this clinic book?")) {
//       onDelete(book.id);
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">

//         {/* Header */}
//         <div className="flex items-center justify-between p-5 border-b">
//           <h2 className="text-lg font-bold text-gray-800">
//             Edit Clinic Book
//           </h2>
//           <button onClick={onClose}>
//             <X className="text-gray-500 hover:text-black" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-5 space-y-4">
//           {/* Reason */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">
//               Reason / Medication Purpose
//             </label>
//             <textarea
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-[#18AAB0]"
//               rows={3}
//             />
//           </div>

//           {/* Access */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600">
//               Access Control
//             </label>
//             <select
//               value={access}
//               onChange={(e) => setAccess(e.target.value)}
//               className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-[#18AAB0]"
//             >
//               <option value="ACCESS_ALL">Access All Doctors</option>
//               <option value="ACCESS_DENY">Access Denied</option>
//             </select>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-between items-center p-5 border-t bg-gray-50">
//           <button
//             onClick={handleDelete}
//             className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg"
//           >
//             <Trash2 size={16} />
//             Delete
//           </button>

//           <button
//             onClick={handleSave}
//             className="flex items-center gap-2 bg-[#18AAB0] text-white px-5 py-2 rounded-lg hover:bg-[#14969b]"
//           >
//             <Save size={16} />
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";

export default function EditClinicBookModal({
  book,
  mode = "edit", // ✅ NEW
  onClose,
  onSave,
  onDelete,
}) {
  const [reason, setReason] = useState("");
  const [access, setAccess] = useState("ACCESS_ALL");

  useEffect(() => {
    if (mode === "edit" && book) {
      setReason(book.reason);
      setAccess(book.access);
    }

    if (mode === "create") {
      setReason("");
      setAccess("ACCESS_ALL");
    }
  }, [book, mode]);

    const handleSave = () => {
    onSave({
        ...book,

        // ✅ SYNC BOTH (IMPORTANT)
        reason,
        medicationPurpose: reason,

        access,
        lastUpdated: new Date().toISOString(),
    });
    };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">
          {mode === "create" ? "Create Clinic Book" : "Edit Clinic Book"}
        </h2>

        {/* Reason */}
        <label className="text-sm font-semibold">Reason</label>
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mt-1 mb-4"
        />

        {/* Access */}
        <label className="text-sm font-semibold">Doctor Access</label>
        <select
          value={access}
          onChange={(e) => setAccess(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mt-1 mb-6"
        >
          <option value="ACCESS_ALL">Access All Doctors</option>
          <option value="ACCESS_DENY">Access Deny</option>
        </select>

        <div className="flex justify-between items-center">
          {/* ❌ DELETE HIDDEN WHEN CREATE */}
          {mode === "edit" && (
            <button
              onClick={() => onDelete(book.id)}
              className="text-red-600 font-semibold"
            >
              Delete
            </button>
          )}

          <div className="ml-auto flex gap-3">
            <button onClick={onClose}>Cancel</button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#18AAB0] text-white rounded-lg"
            >
              {mode === "create" ? "Create" : "Save"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}