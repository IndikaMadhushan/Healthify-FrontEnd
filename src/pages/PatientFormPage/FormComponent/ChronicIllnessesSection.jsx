import { chronic } from "../../../data/medi";
import { sanitizeSingleLineText } from "../../../utils/patientProfileValidation";

export default function ChronicIllnessesSection({ value, onChange, errors = {} }) {
  const handleChronicCheckbox = (item) => (e) => {
    const checked = e.target.checked;
    const current = value.chronicIllnesses || [];

    if (value.chronicIllnesses.includes("Cancer") && !value.cancerChronic.trim()) {
      // validation is handled on submit
    }

    if (value.chronicIllnesses.includes("Other") && !value.otherChronic.trim()) {
      // validation is handled on submit
    }

    if (item === "Other") {
      if (!checked) {
        onChange({
          ...value,
          chronicIllnesses: current.filter((v) => v !== item),
          otherChronic: ""
        });
      } else {
        onChange({
          ...value,
          chronicIllnesses: [...current, item]
        });
      }
      return;
    }

    if (item === "Cancer") {
      if (!checked) {
        onChange({
          ...value,
          chronicIllnesses: current.filter((v) => v !== item),
          cancerChronic: ""
        });
      } else {
        onChange({
          ...value,
          chronicIllnesses: [...current, item]
        });
      }
      return;
    }

    if (checked) {
      onChange({
        ...value,
        chronicIllnesses: [...current, item]
      });
    } else {
      onChange({
        ...value,
        chronicIllnesses: current.filter((v) => v !== item)
      });
    }
  };

  const labelCss = "text-[20px] font-semibold text-gray-700";
  const noteLabel = "text-[15px] text-gray-700 mb-1";
  const inputBase =
    "w-full h-10 px-3 text-[15px] rounded-md bg-gray-100 border " +
    "focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition";

  return (
    <div className="mt-4">
      <div className="border border-gray-300 rounded-xl bg-white shadow-sm lg:px-4 px-3 py-4">
        <label className={labelCss}>Chronic Illnesses</label>

        <div className="mt-3 grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:px-4 gap-y-4 gap-x-4">
          {chronic.map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 text-[13px] lg:text-[15px] text-gray-700"
            >
              <input
                type="checkbox"
                checked={value.chronicIllnesses.includes(item)}
                onChange={handleChronicCheckbox(item)}
              />
              {item}
            </label>
          ))}
        </div>

        {value.chronicIllnesses.includes("Cancer") && (
          <div className="mt-4 lg:px-4">
            <p className={noteLabel}>Mention other cancer type</p>
            <input
              type="text"
              placeholder="Please specify"
              className={
                inputBase +
                " " +
                (errors.cancerChronic ? "border-red-500 focus:ring-red-500" : "border-gray-300")
              }
              value={value.cancerChronic || ""}
              maxLength={100}
              onChange={(e) =>
                onChange({
                  ...value,
                  cancerChronic: sanitizeSingleLineText(e.target.value, 100)
                })
              }
            />
            {errors.cancerChronic && (
              <p className="text-xs text-red-500 mt-1 ml-1">{errors.cancerChronic}</p>
            )}
          </div>
        )}

        {value.chronicIllnesses.includes("Other") && (
          <div className="mt-4 lg:px-4">
            <p className={noteLabel}>Mention other chronic illness</p>
            <input
              type="text"
              placeholder="Please specify"
              className={
                inputBase +
                " " +
                (errors.otherChronic ? "border-red-500 focus:ring-red-500" : "border-gray-300")
              }
              value={value.otherChronic || ""}
              maxLength={100}
              onChange={(e) =>
                onChange({
                  ...value,
                  otherChronic: sanitizeSingleLineText(e.target.value, 100)
                })
              }
            />
            {errors.otherChronic && (
              <p className="text-xs text-red-500 mt-1 ml-1">{errors.otherChronic}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
