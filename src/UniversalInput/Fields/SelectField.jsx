import cn from "classnames";
import { Select } from "antd";

import { optionsHasValue, toSelectValue } from "../Utils/Select";
import styles from "../styles.module.css";

const { Option, OptGroup } = Select;

const filterSelectOption = (input, option) => {
  return (option?.label || "").toLowerCase().includes(input.toLowerCase());
};

const SelectOption = ({ option }) => {
  return (
    <Option value={option.value} label={option.label}>
      {option.label}

      {option.subLabel && (
        <span className={styles.optionSubLabel}>{option.subLabel}</span>
      )}
    </Option>
  );
};

const renderSelectOption = (option) => {
  if (Array.isArray(option.options)) {
    return (
      <OptGroup key={option.value ?? option.label} label={option.label}>
        {option.options.map((child) => (
          <SelectOption key={child.value} option={child} />
        ))}
      </OptGroup>
    );
  }

  return <SelectOption key={option.value} option={option} />;
};

export const SelectField = ({
  inputRef,
  value,
  options,
  className,
  onKeyDown,
  isStretched,
  ...props
}) => {
  const invalid = Boolean(value) && !optionsHasValue(options, value);
  const selectValue = toSelectValue(value);

  return (
    <Select
      onInputKeyDown={onKeyDown}
      showSearch
      bordered={false}
      showArrow={false}
      filterOption={filterSelectOption}
      {...props}
      ref={inputRef}
      className={cn(className, {
        [styles.fullWidth]: isStretched,
        [styles.invalidValue]: invalid,
      })}
      value={selectValue}
    >
      {options.map(renderSelectOption)}
    </Select>
  );
};
