export function getNameParts(person = {}) {
  const safePerson = person ?? {};
  const hasSplitNames =
    safePerson.firstName !== undefined ||
    safePerson.secondName !== undefined ||
    safePerson.lastName !== undefined;

  if (hasSplitNames) {
    return {
      firstName: safePerson.firstName?.trim() || "",
      secondName: safePerson.secondName?.trim() || "",
      lastName: safePerson.lastName?.trim() || "",
    };
  }

  const parts = (safePerson.fullName || "")
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
  const safePerson = person ?? {};

  if (typeof safePerson.fullName === "string" && safePerson.fullName.trim()) {
    return safePerson.fullName.trim();
  }

  return Object.values(getNameParts(safePerson)).filter(Boolean).join(" ");
}

export function getFirstName(person = {}) {
  return getNameParts(person ?? {}).firstName;
}

export function getGreetingName(person = {}) {
  const { firstName, secondName } = getNameParts(person ?? {});
  return secondName || firstName;
}

export function getInitial(person = {}) {
  const displayName = getDisplayName(person ?? {});
  return displayName ? displayName.charAt(0).toUpperCase() : "?";
}
