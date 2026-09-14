import { maskIsValid } from "../../maskValidator";

export const resolveFieldType = ({
  type,
  mask,
  script,
  options,
  multiline,
  children,
}) => {
  if (type === "number") {
    return "number";
  }

  if (mask && maskIsValid(mask)) {
    return "mask";
  }

  if (script) {
    return "script";
  }

  if (options) {
    return "select";
  }

  if (multiline) {
    return "textarea";
  }

  if (children) {
    return "children";
  }

  return "text";
};
