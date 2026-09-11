const PHONE_DIGITS = 11;

export function extractPhoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("8") && digits.length === 11) {
    return `7${digits.slice(1)}`;
  }
  if (digits.startsWith("7")) {
    return digits.slice(0, PHONE_DIGITS);
  }
  return `7${digits}`.slice(0, PHONE_DIGITS);
}

export function formatPhoneMask(value: string) {
  const digits = extractPhoneDigits(value).slice(1);
  let result = "+7";

  if (digits.length === 0) return result;

  result += ` (${digits.slice(0, 3)}`;
  if (digits.length >= 3) result += ")";
  if (digits.length > 3) result += ` ${digits.slice(3, 6)}`;
  if (digits.length > 6) result += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) result += `-${digits.slice(8, 10)}`;

  return result;
}

export function isValidPhone(value: string) {
  const digits = extractPhoneDigits(value);
  return digits.length === PHONE_DIGITS && digits.startsWith("7");
}
