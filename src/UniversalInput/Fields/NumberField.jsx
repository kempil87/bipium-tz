import cn from "classnames";
import { InputNumber } from "antd";

import {
  parseNumberValue,
  sanitizeNumberInput,
  shouldBlockNumberKey,
  toInputNumberValue,
} from "../Utils/Number";
import { getEventValue } from "../Utils/Value";
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

  const applyNumber = (value) => {
    if (prepareNumber) {
      return prepareNumber(value);
    }

    return value;
  };

  const emitNumber = (value) => {
    const prepared = applyNumber(parseNumberValue(value));

    onChange(parseNumberValue(prepared));
  };

  const handleChange = (value) => {
    emitNumber(value);
  };

  const handleBlur = (event) => {
    emitNumber(getEventValue(event));
  };

  const handleKeyDown = (event) => {
    if (shouldBlockNumberKey(event)) {
      event.preventDefault();
    }

    onKeyDown?.(event);
  };

  if (readOnly) {
    return (
      <span
        className={cn(className, {
          [styles.fullWidth]: isStretched,
        })}
      >
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
