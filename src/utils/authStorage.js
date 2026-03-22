const PRESERVED_LOCAL_STORAGE_PREFIXES = ["doctor_recent_patients:"];

function getPreservedLocalStorageEntries() {
  if (typeof window === "undefined") {
    return [];
  }

  const preservedEntries = [];

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);

    if (!key) {
      continue;
    }

    if (
      PRESERVED_LOCAL_STORAGE_PREFIXES.some((prefix) => key.startsWith(prefix))
    ) {
      const value = localStorage.getItem(key);

      if (value !== null) {
        preservedEntries.push([key, value]);
      }
    }
  }

  return preservedEntries;
}

export function clearAuthStorage() {
  if (typeof window === "undefined") {
    return;
  }

  const preservedEntries = getPreservedLocalStorageEntries();

  localStorage.clear();

  preservedEntries.forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });

  sessionStorage.clear();
}
