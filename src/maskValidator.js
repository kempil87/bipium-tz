const MASK_TOKENS = ["*", "A", "a", "1", "#"];

export const maskIsValid = (mask) => {
  if (typeof mask !== "string" || mask.length === 0) {
    return false;
  }

  return MASK_TOKENS.some((token) => mask.includes(token));
};
