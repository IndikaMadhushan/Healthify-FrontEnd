import { SiComma } from "react-icons/si";
import { FaStar } from "react-icons/fa";

export default function ReviewCard({ name, image, review, rating = 5 }) {
  return (
    <div className="
      w-full  h-[400px] lg:h-[250px]
      bg-white
      rounded-2xl
      border border-gray-100
      p-4 items-center
      flex gap-4 
      transition-all duration-300
    ">
      <div className="flex-shrink-0">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-secondary/40"
          />
        ) : (
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-secondary/40 bg-[#EAF7F6] text-secondary font-semibold flex items-center justify-center">
            {name?.charAt(0)?.toUpperCase() || "P"}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-gray-900">
            {name}
          </h3>
          <div className="mt-2 flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={`${name}-${index}`}
                className={index < rating ? "opacity-100" : "opacity-25"}
              />
            ))}
          </div>
        </div>

        <p className="mt-2 text-sm sm:text-[14px] text-gray-600 leading-relaxed">
          {review}
        </p>

        <div className="flex justify-end text-secondary text-lg sm:text-xl mt-2">
          <SiComma className="opacity-80" />
          <SiComma className="opacity-80 -ml-1" />
        </div>
      </div>
    </div>
  );
}
