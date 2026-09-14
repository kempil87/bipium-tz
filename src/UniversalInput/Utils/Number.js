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

export const sanitizeNumberInput = (incomingValue) => {
  if (incomingValue == null) {
    return "";
  }

  return String(incomingValue)
    .replace(/[eE]/g, "")
    .replace(/[^\d.-]/g, "");
};

export const parseNumberValue = (incomingValue) => {
  if (isEmptyValue(incomingValue)) {
    return "";
  }

  if (typeof incomingValue === "number") {
    if (Number.isFinite(incomingValue)) {
      return incomingValue;
    }

    return "";
  }

  const sanitized = sanitizeNumberInput(incomingValue);

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
