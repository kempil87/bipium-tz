import { Input } from "antd";

import { handleInputChange } from "../Utils/Value";

const { TextArea } = Input;

export const CodeEditor = ({ inputRef, config, onChange, ...props }) => {
  const rows = config?.rows ?? 4;

  return (
    <TextArea
      {...props}
      ref={inputRef}
      rows={rows}
      onChange={handleInputChange(onChange)}
    />
  );
};
