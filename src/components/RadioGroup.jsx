// Reusable radio button group

export default function RadioGroup({ 
  label, 
  options, 
  value, 
  onChange, 
  error,
  required = false 
}) {
  const labelCss = "text-[15px] font-semibold text-gray-700";

  return (
    <div>
      <label className={labelCss}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2 flex gap-6">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value={option}
              checked={value === option}
              onChange={onChange}
              className="w-4 h-4 text-secondary focus:ring-secondary"
            />
            <span className="text-[15px] text-gray-700">{option}</span>
          </label>
        ))}
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}