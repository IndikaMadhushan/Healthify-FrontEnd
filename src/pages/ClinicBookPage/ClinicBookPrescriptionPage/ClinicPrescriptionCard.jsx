
export default function ClinicPrescriptionCard({ data, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer relative overflow-hidden rounded-2xl
        bg-gradient-to-r from-white via-[#F6FEFD] to-[#ECF9F8]
        border border-[#D3F0ED]
        p-5 transition-all duration-300
        hover:shadow-[0_20px_50px_rgba(24,170,176,0.25)]
        hover:-translate-y-1
        group
        flex items-center justify-between gap-6
      "
    >
      {/* Left Accent */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#18AAB0] to-[#0FB9B1]" />

      {/* Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#18AAB0]/10 rounded-full blur-2xl" />

      {/* Doctor Info */}
      <div className="pl-4 min-w-[220px]">
        <h3 className="text-[16px] font-semibold text-[#0F4F52]">
          {data.doctor.name}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          SLMC • {data.doctor.slmc}
        </p>
      </div>

      {/* Reason */}
      <div className="flex-1">
        <p className="text-xs text-gray-500">Reason</p>
        <p className="text-sm font-medium text-gray-800 truncate">
          {data.reason}
        </p>
      </div>

      {/* Date */}
      <div className="min-w-[140px] text-right">
        <p className="text-xs text-gray-500">Issued Date</p>
        <p className="text-sm font-medium text-gray-800">
          {data.createdAt}
        </p>
      </div>

      {/* Tag + Arrow */}
      <div className="flex items-center gap-4">
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