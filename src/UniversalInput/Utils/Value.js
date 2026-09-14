export const normalizeInputValue = (value) => {
  if (value || value === 0) {
    return value;
  }

  return "";
};

export const isEmptyValue = (value) => {
  return value === "" || value === null || value === undefined;
};

export const getEventValue = (event) => {
  return event.target.value;
};

export const handleInputChange = (onChange) => {
  return (event) => {
    onChange(getEventValue(event));
  };
};

