import cn from "classnames";
import { InputNumber } from "antd";

import {
  parseNumberValue,
  sanitizeNumberInput,
  shouldBlockNumberKey,
  toInputNumberValue,
} from "../Utils/Number";
import styles from "../styles.module.css";

export const NumberField = ({
  inputRef,
  value,
  className,
  readOnly,
  formatter,
  prepareNumber,
  onChange,
  onKeyDown,
  isStretched,
  ...props
}) => {
  const numericValue = parseNumberValue(value);

  const applyNumber = (incomingValue) => {
    if (prepareNumber) {
      return prepareNumber(incomingValue);
    }

    return incomingValue;
  };

  const emitNumber = (incomingValue) => {
    const prepared = applyNumber(parseNumberValue(incomingValue));

    onChange(parseNumberValue(prepared));
  };

  const handleChange = (incomingValue) => {
    emitNumber(incomingValue);
  };

  const handleBlur = (event) => {
    emitNumber(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (shouldBlockNumberKey(event)) {
      event.preventDefault();
    }

    onKeyDown?.(event);
  };

  if (readOnly) {
    return (
      <span className={className}>
        {formatter ? formatter(numericValue) : numericValue}
      </span>
    );
  }

  return (
    <InputNumber
      {...props}
      ref={inputRef}
      className={cn(className, { [styles.fullWidth]: isStretched })}
      value={toInputNumberValue(numericValue)}
      stringMode={false}
      parser={sanitizeNumberInput}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
};
