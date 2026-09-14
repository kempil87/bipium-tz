import { Input } from "antd";

export const TextField = ({ inputRef, onChange, ...props }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Input
      {...props}
      ref={inputRef}
      onChange={handleChange}
    />
  );
};
