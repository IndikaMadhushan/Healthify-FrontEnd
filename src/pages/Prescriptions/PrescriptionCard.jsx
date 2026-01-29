// export default function PrescriptionCard({ data, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className="
//         cursor-pointer bg-white rounded-2xl border border-[#D3F0ED]
//         p-5 transition-all duration-300
//         hover:shadow-2xl hover:-translate-y-1
//         group relative overflow-hidden
//       "
//     >
//       {/* Left medical accent */}
//       <div className="absolute left-0 top-0 h-full w-1 bg-[#18AAB0]" />

//       {/* Header */}
//       <div className="flex items-start justify-between">
//         <div className="pl-2">
//           <h3 className="text-[17px] font-semibold text-[#0F4F52]">
//             {data.doctor.name}
//           </h3>
//           <p className="text-xs text-gray-500 mt-0.5">
//             SLMC • {data.doctor.slmc}
//           </p>
//         </div>

//         {/* clinic or consultation */}
//         <span className="
//           text-[11px] px-3 py-1 rounded-full
//           bg-[#EAF7F6] text-[#18AAB0]
//           font-medium
//         ">
//           Consultation
//         </span>
//       </div>

//       {/* Divider */}
//       <div className="my-4 h-px bg-[#EAF7F6]" />

//       {/* Info */}
//       <div className="space-y-2 text-sm text-gray-700 pl-2">
//         <div className="flex justify-between">
//           <span className="text-gray-500">Issued Date</span>
//           <span className="font-medium">{data.createdAt}</span>
//         </div>

//         <div className="flex justify-between">
//           <span className="text-gray-500">Reason</span>
//           <span className="font-medium text-right">
//             {data.reason}
//           </span>
//         </div>
//       </div>

//       {/* Footer CTA */}
//       <div className="
//         mt-5 pl-2 flex items-center justify-between
//         text-xs font-medium text-[#18AAB0]
//       ">
//         <span className="opacity-70">
//           Click to view details
//         </span>

//         <span className="
//           group-hover:translate-x-1 transition-transform
//         ">
//           →
//         </span>
//       </div>
//     </div>
//   );
// }




export default function PrescriptionCard({ data, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer relative overflow-hidden rounded-2xl
        bg-gradient-to-br from-white via-[#F6FEFD] to-[#ECF9F8]
        border border-[#D3F0ED]
        p-5 transition-all duration-300
        hover:shadow-[0_20px_50px_rgba(24,170,176,0.25)]
        hover:-translate-y-1
        group
      "
    >
      {/* Gradient Medical Accent */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#18AAB0] to-[#0FB9B1]" />

      {/* Floating glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#18AAB0]/10 rounded-full blur-2xl" />

      {/* Header */}
      <div className="flex items-start justify-between relative">
        <div className="pl-3">
          <h3 className="text-[17px] font-semibold text-[#0F4F52]">
            {data.doctor.name}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            SLMC • {data.doctor.slmc}
          </p>
        </div>

        {/* Tag */}
        <span
          className="
            text-[11px] px-3 py-1 rounded-full
            bg-gradient-to-r from-[#18AAB0]/10 to-[#0FB9B1]/10
            text-[#0F4F52]
            font-semibold
            border border-[#18AAB0]/30
          "
        >
          Consultation
        </span>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#18AAB0]/30 to-transparent" />

      {/* Info */}
      <div className="space-y-2 text-sm text-gray-700 pl-3">
        <div className="flex justify-between">
          <span className="text-gray-500">Issued Date</span>
          <span className="font-medium text-gray-800">
            {data.createdAt}
          </span>
        </div>

        <div className="flex justify-between gap-2">
          <span className="text-gray-500">Reason</span>
          <span className="font-medium text-right text-gray-800">
            {data.reason}
          </span>
        </div>
      </div>

      {/* Footer CTA */}
      <div
        className="
          mt-5 pl-3 flex items-center justify-between
          text-xs font-semibold text-[#18AAB0]
        "
      >
        <span className="opacity-80">
          View prescription details
        </span>

        <span
          className="
            text-lg
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