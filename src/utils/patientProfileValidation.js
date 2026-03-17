const PHONE_NUMBER_LENGTH = 10;
const MAX_PASSWORD_LENGTH = 64;

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
const RELATIONSHIP_PATTERN = /^[A-Za-z][A-Za-z\s.'/-]*$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRONG_PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,64}$/;
const STORAGE_LABEL_INVALID_CHARS = new Set(["<", ">", ":", "\"", "/", "\\", "|", "?", "*"]);

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

export const normalizeEmail = (value = "") => value.trim();

export const isValidEmail = (value = "") =>
  EMAIL_PATTERN.test(normalizeEmail(value));

export const sanitizeRelationship = (value = "") =>
  value
    .replace(/[^A-Za-z\s.'/-]/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^\s+/, "")
    .slice(0, 50);

export const isValidRelationship = (value = "") => {
  const normalized = value.trim();
  return Boolean(normalized) && RELATIONSHIP_PATTERN.test(normalized);
};

export const sanitizeSingleLineText = (value = "", maxLength = 100) =>
  value.replace(/\s{2,}/g, " ").replace(/^\s+/, "").slice(0, maxLength);

export const sanitizeMultilineText = (value = "", maxLength = 250) =>
  value
    .replace(/\r/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/^\s+/, "")
    .slice(0, maxLength);

export const sanitizeStorageLabel = (value = "", maxLength = 30) =>
  Array.from(value)
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code >= 32 && !STORAGE_LABEL_INVALID_CHARS.has(char);
    })
    .join("")
    .replace(/\s{2,}/g, " ")
    .replace(/^\s+/, "")
    .slice(0, maxLength);

export const isStrongPassword = (value = "") =>
  STRONG_PASSWORD_PATTERN.test(value);

export const getPasswordValidationMessage = (value = "") => {
  if (!value) return "Password is required";
  if (value.length < 8) return "Password must be at least 8 characters";
  if (value.length > MAX_PASSWORD_LENGTH) {
    return `Password must be ${MAX_PASSWORD_LENGTH} characters or less`;
  }
  if (/\s/.test(value)) return "Password cannot contain spaces";
  if (!isStrongPassword(value)) {
    return "Password must contain uppercase, lowercase, number, and special character";
  }
  return "";
};
