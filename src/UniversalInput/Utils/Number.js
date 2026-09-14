import { isEmptyValue } from "./Value";

const NUMBER_CONTROL_KEYS = new Set([
  "Backspace",
  "Delete",
  "Tab",
  "Enter",
  "Escape",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
]);

export const toInputNumberValue = (value) => {
  if (isEmptyValue(value)) {
    return null;
  }

  return value;
};

export const sanitizeNumberInput = (value) => {
  if (value == null) {
    return "";
  }

  return String(value)
    .replace(/[eE]/g, "")
    .replace(/[^\d.-]/g, "");
};

export const parseNumberValue = (value) => {
  if (isEmptyValue(value)) {
    return "";
  }

  if (typeof value === "number") {
    if (Number.isFinite(value)) {
      return value;
    }

    return "";
  }

  const sanitized = sanitizeNumberInput(value);

  if (
    !sanitized ||
    sanitized === "-" ||
    sanitized === "." ||
    sanitized === "-."
  ) {
    return "";
  }

  const numeric = Number(sanitized);

  if (!Number.isFinite(numeric)) {
    return "";
  }

  return numeric;
};

export const shouldBlockNumberKey = (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey) {
    return false;
  }

  if (NUMBER_CONTROL_KEYS.has(event.key)) {
    return false;
  }

  if (event.key === "e" || event.key === "E" || event.code === "KeyE") {
    return true;
  }

  if (event.key.length === 1 && !/[\d.-]/.test(event.key)) {
    return true;
  }

  return false;
};
