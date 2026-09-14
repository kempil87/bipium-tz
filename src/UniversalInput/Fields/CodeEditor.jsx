import { Input } from "antd";

const { TextArea } = Input;

export const CodeEditor = ({ inputRef, config, onChange, ...props }) => {
  const rows = config?.rows ?? 4;

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <TextArea
      {...props}
      ref={inputRef}
      rows={rows}
      onChange={handleChange}
    />
  );
};
