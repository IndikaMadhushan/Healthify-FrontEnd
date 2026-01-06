import { vaccines } from "../../data/medi";

export default function VaccineSection({ value, onChange, errors = {} }) {

  const handleCheckbox = (vaccine) => (e) => {
    const checked = e.target.checked;
    const current = value.takenVaccines || [];

    if (vaccine === "Other") {
      if (!checked) {
        onChange({
          ...value,
          takenVaccines: current.filter((x) => x !== vaccine),
          otherVaccine: ""
        });
      } else {
        onChange({
          ...value,
          takenVaccines: [...current, vaccine]
        });
      }
      return;
    }

    if (checked) {
      onChange({
        ...value,
        takenVaccines: [...current, vaccine]
      });
    } else {
      onChange({
        ...value,
        takenVaccines: current.filter((x) => x !== vaccine)
      });
    }
  };

  const labelCss = "text-[20px] font-semibold text-gray-700";
  const noteLabel = "text-[15px] text-gray-700 mb-1";
  const inputBase =
    "w-full h-10 px-3 text-[15px] rounded-md bg-gray-100 border " +
    "focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition";

  return (
    <div className="mt-6">
      <div className="border border-gray-300 rounded-xl bg-white shadow-sm lg:px-4 px-3 py-4">
        <label className={labelCss}>Vaccinations</label>

        <div className="mt-3 grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:px-4 gap-y-4 gap-x-4">
          {vaccines.map((v) => (
            <label
              key={v}
              className="flex items-center gap-2 text-[13px] lg:text-[15px] text-gray-700"
            >
              <input
                type="checkbox"
                checked={value.takenVaccines.includes(v)}
                onChange={handleCheckbox(v)}
              />
              {v}
            </label>
          ))}
        </div>

        {value.takenVaccines.includes("Other") && (
          <div className="mt-4 lg:px-4">
            <p className={noteLabel}>Mention other vaccine</p>
            <input
              type="text"
              placeholder="Please specify"
              className={
                inputBase +
                " " +
                (errors.otherVaccine ? "border-red-500 focus:ring-red-500" : "border-gray-300")
              }
              value={value.otherVaccine || ""}
              onChange={(e) =>
                onChange({
                  ...value,
                  otherVaccine: e.target.value
                })
              }
            />

            {errors.otherVaccine && (
              <p className="text-xs text-red-500 mt-1 ml-1">{errors.otherVaccine}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}