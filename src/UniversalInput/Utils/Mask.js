import { formatCharsInput } from "../../maskFormat";

export const getPlaceholderMask = (mask) => {
  const editableChars = Object.keys(formatCharsInput).join("");
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

    placeholder += editableChars.includes(char) ? "_" : char;
  }

  return placeholder;
};

export const isEmptyMaskedValue = (value, mask) => {
  if (!value) {
    return true;
  }

  return value === getPlaceholderMask(mask);
};
