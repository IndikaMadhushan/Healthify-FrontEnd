//Reusable password input with show/hide toggle

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function PasswordInput({
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputBase =
    "mt-1 w-full h-12 px-4 rounded-lg bg-gray-50 border text-[15px] text-gray-700 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition";
  const labelCss = "text-[15px] font-semibold text-gray-700";

  return (
    <div>
      <label className={labelCss}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${inputBase} pr-12 ${error ? "border-red-500" : "border-gray-300"}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
