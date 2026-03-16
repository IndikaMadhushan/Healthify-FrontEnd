const PHONE_NUMBER_LENGTH = 10;

const SRI_LANKA_PHONE_PREFIXES = new Set([
  "011",
  "021",
  "023",
  "024",
  "025",
  "026",
  "027",
  "031",
  "032",
  "033",
  "034",
  "035",
  "036",
  "037",
  "038",
  "041",
  "045",
  "047",
  "051",
  "052",
  "054",
  "055",
  "057",
  "063",
  "065",
  "066",
  "067",
  "070",
  "071",
  "072",
  "074",
  "075",
  "076",
  "077",
  "078",
  "081",
  "091",
]);

const PERSON_NAME_PATTERN = /^[A-Za-z][A-Za-z\s.'-]*$/;

export const sanitizePhoneNumber = (value = "") =>
  value.replace(/\D/g, "").slice(0, PHONE_NUMBER_LENGTH);

export const isValidSriLankanPhoneNumber = (value = "") => {
  const normalized = sanitizePhoneNumber(value);

  return (
    normalized.length === PHONE_NUMBER_LENGTH &&
    SRI_LANKA_PHONE_PREFIXES.has(normalized.slice(0, 3))
  );
};

export const sanitizePersonName = (value = "") =>
  value
    .replace(/[^A-Za-z\s.'-]/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^\s+/, "");

export const isValidPersonName = (value = "") => {
  const normalized = value.trim();
  return Boolean(normalized) && PERSON_NAME_PATTERN.test(normalized);
};

export const sanitizeNic = (value = "") =>
  value.toUpperCase().replace(/[^0-9VX]/g, "").slice(0, 12);

export const isValidNic = (value = "") =>
  /^([0-9]{9}[VX]|[0-9]{12})$/.test(value.trim().toUpperCase());
