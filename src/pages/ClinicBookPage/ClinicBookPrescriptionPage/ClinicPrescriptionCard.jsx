
// export default function ClinicPrescriptionCard({ data, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className="
//         cursor-pointer relative overflow-hidden rounded-2xl
//         bg-gradient-to-r from-white via-[#F6FEFD] to-[#ECF9F8]
//         border border-[#D3F0ED]
//         p-5 transition-all duration-300
//         hover:shadow-[0_20px_50px_rgba(24,170,176,0.25)]
//         hover:-translate-y-1
//         group
//         flex items-center justify-between gap-6
//       "
//     >
//       {/* Left Accent */}
//       <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#18AAB0] to-[#0FB9B1]" />

//       {/* Glow */}
//       <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#18AAB0]/10 rounded-full blur-2xl" />

//       <div className="min-w-[140px] ">
        
//         <p className="text-sm font-medium font-semibold text-gray-800">
//           {data.createdAt}
//         </p>
//         <p className="text-[10px] text-gray-500">Issued Date</p>
//         <p className="text-[10px] text-gray-500">Updated - {data.createdAt}</p>
//       </div>

//       {/* Doctor Info */}
//       <div className="pl-4 min-w-[220px]">
//         <h3 className="text-[15px] font-semibold text-[#0F4F52]">
//           {data.doctor.name}
//         </h3>
//         <p className="text-[10px] text-gray-500">Updated - {data.createdAt}</p>
//       </div>

//       {/* Reason */}
//       {/* <div className="flex-1">
        
//         <p className="text-sm font-medium text-gray-800 truncate">
//           {data.reason}
//         </p>
//         <p className="text-xs text-gray-500">Reason</p>
//       </div> */}

      
      

//       {/* Tag + Arrow */}
//       <div className="flex items-center gap-4">
//         <span
//           className="
//             text-[11px] px-3 py-1 rounded-full
//             bg-gradient-to-r from-[#18AAB0]/10 to-[#0FB9B1]/10
//             text-[#0F4F52]
//             font-semibold
//             border border-[#18AAB0]/30
//           "
//         >
//           View prescription
//         </span>

//         <span
//           className="
//             text-xl text-[#18AAB0]
//             group-hover:translate-x-1
//             transition-transform
//           "
//         >
//           →
//         </span>
//       </div>
//     </div>
//   );
// }



export default function ClinicPrescriptionCard({ data, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer relative overflow-hidden rounded-2xl
        bg-gradient-to-r from-white via-[#F6FEFD] to-[#ECF9F8]
        border border-[#D3F0ED]
        p-4 sm:p-5
        transition-all duration-300
        hover:shadow-[0_20px_50px_rgba(24,170,176,0.25)]
        hover:-translate-y-1
        group

        grid grid-cols-1 gap-4
        sm:grid-cols-2
        lg:flex lg:items-center lg:justify-between lg:gap-6
      "
    >
      {/* Left Accent */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#18AAB0] to-[#0FB9B1]" />

      {/* Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#18AAB0]/10 rounded-full blur-2xl" />

      {/* DATE */}
      <div className="min-w-0 lg:min-w-[140px]">
        <p className="text-sm font-semibold text-gray-800">
          {data.createdAt}
        </p>
        <p className="text-[10px] text-gray-500">Issued Date</p>
        <p className="hidden sm:block text-[10px] text-gray-500">
          Updated – {data.updatedAt}
        </p>
      </div>

      {/* DOCTOR */}
      <div className="pl-0 lg:pl-4 min-w-0 lg:min-w-[220px]">
        <h3 className="text-[15px] font-semibold text-[#0F4F52] truncate">
          {data.createdDoctor}
        </h3>
        <p className="hidden sm:block text-[10px] text-gray-500">
          Updated – {data.updatedBy}
        </p>
      </div>

      {/* ACTION */}
      <div className="flex items-center justify-between lg:justify-start gap-4 mt-2 lg:mt-0">
        <span
          className="
            text-[11px] px-3 py-1 rounded-full
            bg-gradient-to-r from-[#18AAB0]/10 to-[#0FB9B1]/10
            text-[#0F4F52]
            font-semibold
            border border-[#18AAB0]/30
            whitespace-nowrap
          "
        >
          View prescription
        </span>

        <span
          className="
            text-xl text-[#18AAB0]
            group-hover:translate-x-1
            transition-transform
          "
        >
          →
        </span>
      </div>
    </div>
  );
}