import { useEffect, useRef } from "react";

import cn from "classnames";
import { Field } from "./Fields";
import { resolveFieldType } from "./Utils/FieldType";
import { normalizeInputValue } from "./Utils/Value";
import styles from "./styles.module.css";

export const UniversalInput = ({
  wrapperClassName,
  className,
  actionsClassName,
  actions,
  type,
  multiline,
  script,
  onChange,
  value,
  readOnly,
  disabled,
  autoFocus,
  onKeyDown,
  ...rest
}) => {
  const inputRef = useRef(null);

  const normalizedValue = normalizeInputValue(value);
  const isReadOnly = Boolean(readOnly || disabled);
  const hasActions = Boolean(actions?.length);

  const fieldType = resolveFieldType({
    type,
    mask: rest.mask,
    script,
    options: rest.options,
    multiline,
    children: rest.children,
  });

  const inputClassName = cn(className, {
    [styles.readOnly]: isReadOnly,
    [styles.textArea]: fieldType === "textarea",
  });
  const wrapperClassNames = cn(wrapperClassName, {
    [styles.textInputContainer]: fieldType !== "number",
    [styles.inputMask]: fieldType === "mask",
    [styles.hasActions]: hasActions,
  });

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus?.();
    }
  }, [autoFocus]);

  return (
    <div className={wrapperClassNames}>
      <Field
        type={fieldType}
        {...rest}
        inputRef={inputRef}
        value={normalizedValue}
        className={inputClassName}
        readOnly={isReadOnly}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      {hasActions && (
        <ul className={cn(styles.inputWithActions, actionsClassName)}>
          {actions.map((node, index) => (
            <li key={index}>{node}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

