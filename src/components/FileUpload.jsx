//thathsara
// Reusable file upload component

import { FaFileUpload } from "react-icons/fa";

export default function FileUpload({
  label,
  fileName,
  onChange,
  error,
  accept = ".pdf,.jpg,.jpeg,.png",
  helperText,
  required = false,
}) {
  const labelCss = "text-[15px] font-semibold text-gray-700";

  return (
    <div>
      <label className={labelCss}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">
        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          <div className="flex flex-col items-center justify-center pt-4 pb-4">
            <FaFileUpload className="text-2xl text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              {fileName || "Click to upload PDF or image"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PDF, JPG, or PNG (max 5MB)
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            accept={accept}
            onChange={onChange}
          />
        </label>
        {helperText && (
          <p className="text-xs text-gray-500 mt-2">{helperText}</p>
        )}
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
}
