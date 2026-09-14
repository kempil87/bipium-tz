import { Input } from "antd";

import { handleInputChange } from "../Utils/Value";

const { TextArea } = Input;

export const TextAreaField = ({
  inputRef,
  readOnly,
  minRows = 1,
  maxRows = 20,
  onChange,
  ...props
}) => {
  return (
    <TextArea
      {...props}
      ref={inputRef}
      spellCheck="false"
      rows={4}
      autoSize={{
        minRows: readOnly ? 1 : minRows,
        maxRows,
      }}
      onChange={handleInputChange(onChange)}
    />
  );
};
