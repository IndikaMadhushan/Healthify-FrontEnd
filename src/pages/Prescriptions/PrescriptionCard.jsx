export default function PrescriptionCard({ data, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer bg-white rounded-2xl border border-[#D3F0ED]
        p-5 transition-all duration-300
        hover:shadow-2xl hover:-translate-y-1
        group relative overflow-hidden
      "
    >
      {/* Left medical accent */}
      <div className="absolute left-0 top-0 h-full w-1 bg-[#18AAB0]" />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="pl-2">
          <h3 className="text-[17px] font-semibold text-[#0F4F52]">
            {data.doctor.name}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            SLMC • {data.doctor.slmc}
          </p>
        </div>

        {/* clinic or consultation */}
        <span className="
          text-[11px] px-3 py-1 rounded-full
          bg-[#EAF7F6] text-[#18AAB0]
          font-medium
        ">
          Consultation
        </span>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-[#EAF7F6]" />

      {/* Info */}
      <div className="space-y-2 text-sm text-gray-700 pl-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Issued Date</span>
          <span className="font-medium">{data.createdAt}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Reason</span>
          <span className="font-medium text-right">
            {data.reason}
          </span>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="
        mt-5 pl-2 flex items-center justify-between
        text-xs font-medium text-[#18AAB0]
      ">
        <span className="opacity-70">
          Click to view details
        </span>

        <span className="
          group-hover:translate-x-1 transition-transform
        ">
          →
        </span>
      </div>
    </div>
  );
}