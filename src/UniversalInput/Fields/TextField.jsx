import { Input } from "antd";

import { handleInputChange } from "../Utils/Value";

export const TextField = ({ inputRef, onChange, ...props }) => {
  return (
    <Input
      {...props}
      ref={inputRef}
      onChange={handleInputChange(onChange)}
    />
  );
};
