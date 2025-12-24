// Reusable input field component

export default function FormField({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  error, 
  placeholder,
  required = false,
  className = ""
}) {
  const inputBase = "mt-1 w-full h-12 px-4 rounded-lg bg-gray-50 border text-[15px] text-gray-700 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition";
  const labelCss = "text-[15px] font-semibold text-gray-700";

   return (
    <div className={className}>
      <label className={labelCss}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputBase} ${error ? "border-red-500" : "border-gray-300"}`}
      />

      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
