
// import UploaderPopUp from "./UploaderPopUp";


// export default function CreateFolderModal({ surgery, onClose, onConfirm }) {
//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
//       <div
//         className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* HEADER */}
//         <h2 className="text-lg font-semibold text-[#0F4F52] mb-2">
//           Create Surgical Folder
//         </h2>

//         <p className="text-sm text-gray-600 mb-4">
//           To create a folder for <b>{surgery.reason}</b>,  
//           please upload your first surgical document.
//         </p>

//         {/* UPLOADER */}
//         <UploaderPopUp title="Upload a New Report" />

//         {/* ACTIONS */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 rounded-lg bg-[#18AAB0] text-white text-sm"
//           >
//             Create Folder
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import Uploader from "./UploaderPopUp";

// export default function CreateFolderModal({ onClose, onConfirm }) {
//   const [files, setFiles] = useState([]); // uploaded files

//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-xl flex flex-col">

//         {/* HEADER */}
//         <div className="px-6 py-4 border-b">
//           <h2 className="text-lg font-semibold text-[#0F4F52]">
//             Create Surgical Folder
//           </h2>
//           <p className="text-sm text-gray-600 mt-1">
//             Upload at least one document to create the folder.
//           </p>
//         </div>

//         {/* SCROLLABLE BODY */}
//         <div className="px-6 py-4 overflow-y-auto max-h-[55vh]">
//           <Uploader
//             title="Upload a New Report"
//             onFilesChange={setFiles}   // 🔑 key line
//           />
//         </div>

//         {/* FOOTER */}
//         <div className="px-6 py-4 border-t flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50"
//           >
//             Cancel
//           </button>

//           <button
//             disabled={files.length === 0}   // 🔒 RULE
//             onClick={() => onConfirm(files)}
//             className={`px-4 py-2 rounded-lg text-sm text-white
//               ${
//                 files.length === 0
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-[#18AAB0] hover:opacity-90"
//               }`}
//           >
//             Create Folder
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import UploaderPopUp from "./UploaderPopUp";

export default function CreateFolderModal({ onClose, onConfirm }) {
  const [files, setFiles] = useState([]);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl flex flex-col">

        {/* HEADER */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-[#0F4F52]">
            Create Surgical Folder
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Upload at least one document to create the folder.
          </p>
        </div>

        {/* BODY */}
        <div className="px-6 py-4 overflow-y-auto max-h-[55vh]">
          <UploaderPopUp
            title="Upload a New Report"
            onFilesChange={setFiles}
          />
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 flex justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            disabled={files.length === 0}
            onClick={() => onConfirm(files)}
            className={`px-4 py-2 rounded-lg text-white ${
              files.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#18AAB0] hover:opacity-90"
            }`}
          >
            Create Folder
          </button>
        </div>

      </div>
    </div>
  );
}