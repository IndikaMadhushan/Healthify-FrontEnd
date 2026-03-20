import { useEffect } from "react";

export default function PageHelmet({ title, description }) {
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (title) {
      document.title = title;
    }

    if (!description) {
      return;
    }

    let metaDescription = document.head.querySelector(
      'meta[name="description"]',
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute("content", description);
  }, [title, description]);

  return null;
}
