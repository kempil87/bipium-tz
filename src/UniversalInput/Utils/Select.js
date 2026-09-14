import { isEmptyValue } from "./Value";

export const toSelectValue = (value) => {
  if (isEmptyValue(value)) {
    return undefined;
  }

  return value;
};

export const optionsHasValue = (options, value) => {
  if (!Array.isArray(options)) {
    return false;
  }

  return options.some((option) => {
    if (option.value === value) {
      return true;
    }

    if (Array.isArray(option.options)) {
      return option.options.some((child) => child.value === value);
    }

    return false;
  });
};
