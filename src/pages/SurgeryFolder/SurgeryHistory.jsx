// import { useState } from "react";
// import { surgeries as initialData } from "../../data/surgeries";
// import SurgeryCard from "./SurgeryCard";

// export default function SurgeryHistory() {
//   const [surgeries, setSurgeries] = useState(initialData);

//   const handleCreateFolder = (id) => {
//     setSurgeries((prev) =>
//       prev.map((s) =>
//         s.id === id ? { ...s, isFolder: true } : s
//       )
//     );
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-[#0F4F52]">
//           Surgical History
//         </h1>

//         <button className="px-4 py-2 rounded-lg bg-[#18AAB0] text-white text-sm">
//           + Add Surgery
//         </button>
//       </div>

//       {/* EMPTY STATE */}
//       {surgeries.length === 0 && (
//         <div className="text-center text-gray-500 py-20">
//           No surgical history recorded
//         </div>
//       )}

//       {/* SURGERY CARDS */}
//       <div className="grid sm:grid-cols-2 gap-6">
//         {surgeries.map((surgery) => (
//           <SurgeryCard
//             key={surgery.id}
//             data={surgery}
//             onCreateFolder={handleCreateFolder}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { surgeries as initialData } from "../../data/surgeries";
// import SurgeryCard from "./SurgeryCard";
// import CreateFolderModal from "./CreateFolderModal";

// export default function SurgeryHistory() {
//   const [surgeries, setSurgeries] = useState(initialData);
//   const [selectedSurgery, setSelectedSurgery] = useState(null);

//   const openCreateFolder = (surgery) => {
//     setSelectedSurgery(surgery);
//   };

//   const confirmCreateFolder = () => {
//     setSurgeries((prev) =>
//       prev.map((s) =>
//         s.id === selectedSurgery.id
//           ? { ...s, isFolder: true }
//           : s
//       )
//     );
//     setSelectedSurgery(null);
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-2xl font-bold text-[#0F4F52] mb-6">
//         Surgical History
//       </h1>

//       <div className="grid sm:grid-cols-2 gap-6">
//         {surgeries.map((surgery) => (
//           <SurgeryCard
//             key={surgery.id}
//             data={surgery}
//             onCreateFolder={openCreateFolder}
//           />
//         ))}
//       </div>

//       {/* CREATE FOLDER MODAL */}
//       {selectedSurgery && (
//         <CreateFolderModal
//           surgery={selectedSurgery}
//           onClose={() => setSelectedSurgery(null)}
//           onConfirm={confirmCreateFolder}
//         />
//       )}
//     </div>
//   );
// }


import { useState } from "react";
import { surgeries as initialData } from "../../data/surgeries";
import SurgeryCard from "./SurgeryCard";
import CreateFolderModal from "./CreateFolderModal";

export default function SurgeryHistory() {
  const [surgeries, setSurgeries] = useState(initialData);
  const [selectedSurgery, setSelectedSurgery] = useState(null);

  const openCreateFolder = (surgery) => {
    setSelectedSurgery(surgery);
  };

  const confirmCreateFolder = () => {
    setSurgeries((prev) =>
      prev.map((s) =>
        s.id === selectedSurgery.id
          ? { ...s, isFolder: true }
          : s
      )
    );
    setSelectedSurgery(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#0F4F52] mb-6">
        Surgical History
      </h1>

      <div className="grid sm:grid-cols-2 gap-6">
        {surgeries.map((surgery) => (
          <SurgeryCard
            key={surgery.id}
            data={surgery}
            onCreateFolder={openCreateFolder}
          />
        ))}
      </div>

      {selectedSurgery && (
        <CreateFolderModal
          onClose={() => setSelectedSurgery(null)}
          onConfirm={confirmCreateFolder}
        />
      )}
    </div>
  );
}