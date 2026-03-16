export function getNameParts(person = {}) {
  const hasSplitNames =
    person.firstName !== undefined ||
    person.secondName !== undefined ||
    person.lastName !== undefined;

  if (hasSplitNames) {
    return {
      firstName: person.firstName?.trim() || "",
      secondName: person.secondName?.trim() || "",
      lastName: person.lastName?.trim() || "",
    };
  }

  const parts = (person.fullName || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return { firstName: "", secondName: "", lastName: "" };
  }

  if (parts.length === 1) {
    return { firstName: parts[0], secondName: "", lastName: "" };
  }

  return {
    firstName: parts[0],
    secondName: parts.length > 2 ? parts.slice(1, -1).join(" ") : "",
    lastName: parts[parts.length - 1],
  };
}

export function getDisplayName(person = {}) {
  if (typeof person.fullName === "string" && person.fullName.trim()) {
    return person.fullName.trim();
  }

  return Object.values(getNameParts(person)).filter(Boolean).join(" ");
}

export function getFirstName(person = {}) {
  return getNameParts(person).firstName;
}

export function getInitial(person = {}) {
  const displayName = getDisplayName(person);
  return displayName ? displayName.charAt(0).toUpperCase() : "?";
}
