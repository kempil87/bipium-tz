import { Input } from "antd";
import MaskedInput from "react-input-mask";

import { formatCharsInput } from "../../maskFormat";
import { getPlaceholderMask, isEmptyMaskedValue } from "../Utils/Mask";
import { getEventValue } from "../Utils/Value";

export const MaskedField = ({
  inputRef,
  mask,
  readOnly,
  onChange,
  formatChars = formatCharsInput,
  ...props
}) => {
  const maskPlaceholder = getPlaceholderMask(mask, formatChars);

  const handleChange = (event) => {
    const value = getEventValue(event);

    onChange(isEmptyMaskedValue(value, mask, formatChars) ? "" : value);
  };

  const renderInput = (inputProps) => {
    return <Input {...inputProps} ref={inputRef} />;
  };

  return (
    <MaskedInput
      formatChars={formatChars}
      mask={mask}
      disabled={readOnly}
      {...props}
      placeholder={maskPlaceholder}
      onChange={handleChange}
    >
      {renderInput}
    </MaskedInput>
  );
};
