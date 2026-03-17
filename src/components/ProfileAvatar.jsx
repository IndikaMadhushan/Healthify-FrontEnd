import { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function ProfileAvatar({
  src,
  alt = "Profile",
  className = "",
  imageClassName = "",
  fallbackClassName = "",
  fallbackIcon = null,
}) {
  const [failedSrc, setFailedSrc] = useState("");
  const normalizedSrc = typeof src === "string" ? src.trim() : "";
  const hasImage = Boolean(normalizedSrc) && failedSrc !== normalizedSrc;

  if (hasImage) {
    return (
      <img
        src={normalizedSrc}
        alt={alt}
        onError={() => setFailedSrc(normalizedSrc)}
        className={`${className} ${imageClassName}`.trim()}
      />
    );
  }

  return (
    <div
      aria-label={alt}
      className={`${className} flex items-center justify-center ${fallbackClassName}`.trim()}
    >
      {fallbackIcon || <FaUser className="text-4xl text-[#7AA7A3]" />}
    </div>
  );
}
