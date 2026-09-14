import { Input } from "antd";

const { TextArea } = Input;

export const TextAreaField = ({
  inputRef,
  readOnly,
  minRows = 1,
  maxRows = 20,
  onChange,
  ...props
}) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

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
      onChange={handleChange}
    />
  );
};
