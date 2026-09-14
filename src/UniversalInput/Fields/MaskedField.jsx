import { Input } from "antd";
import MaskedInput from "react-input-mask";

import { formatCharsInput } from "../../maskFormat";
import { getPlaceholderMask, isEmptyMaskedValue } from "../Utils/Mask";

export const MaskedField = ({
  inputRef,
  mask,
  readOnly,
  onChange,
  ...props
}) => {
  const maskPlaceholder = getPlaceholderMask(mask);

  const handleChange = (event) => {
    const incomingValue = event.target.value;

    onChange(isEmptyMaskedValue(incomingValue, mask) ? "" : incomingValue);
  };

  const renderInput = (inputProps) => {
    return <Input {...inputProps} ref={inputRef} />;
  };

  return (
    <MaskedInput
      {...props}
      formatChars={formatCharsInput}
      mask={mask}
      placeholder={maskPlaceholder}
      onChange={handleChange}
      disabled={readOnly}
    >
      {renderInput}
    </MaskedInput>
  );
};
