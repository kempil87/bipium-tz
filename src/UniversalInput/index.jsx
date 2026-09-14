import cn from "classnames";
import { Field } from "./Fields";
import { FieldActions } from "./FieldActions";
import { getFieldType } from "./Utils/FieldType";
import { normalizeInputValue } from "./Utils/Value";
import styles from "./styles.module.css";

export const UniversalInput = ({
  wrapperClassName,
  className,
  actionsClassName,
  actions,
  value,
  readOnly,
  disabled,
  ...rest
}) => {
  const normalizedValue = normalizeInputValue(value);
  const isReadOnly = Boolean(readOnly || disabled);
  const hasActions = Boolean(actions?.length);

  const fieldType = getFieldType(rest);

  const inputClassName = cn(className, {
    [styles.readOnly]: isReadOnly,
    [styles.textArea]: fieldType === "textarea",
  });
  const wrapperClassNames = cn(wrapperClassName, {
    [styles.textInputContainer]: fieldType !== "number",
    [styles.inputMask]: fieldType === "mask",
    [styles.hasActions]: hasActions,
  });

  return (
    <div className={wrapperClassNames}>
      <Field
        {...rest}
        type={fieldType}
        value={normalizedValue}
        className={inputClassName}
        readOnly={isReadOnly}
      />

      {hasActions && (
        <FieldActions actions={actions} className={actionsClassName} />
      )}
    </div>
  );
};
