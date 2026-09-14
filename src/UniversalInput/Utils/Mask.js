import { formatCharsInput } from "../../maskFormat";

export const getPlaceholderMask = (mask, formatChars = formatCharsInput) => {
  const editableChars = new Set(Object.keys(formatChars));
  let placeholder = "";
  let escaped = false;

  for (const char of mask) {
    if (escaped) {
      placeholder += char;
      escaped = false;

      continue;
    }

    if (char === "\\") {
      escaped = true;

      continue;
    }

    placeholder += editableChars.has(char) ? "_" : char;
  }

  return placeholder;
};

export const isEmptyMaskedValue = (value, mask, formatChars) => {
  if (!value) {
    return true;
  }

  return value === getPlaceholderMask(mask, formatChars);
};
