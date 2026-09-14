import cn from "classnames";
import styles from "./styles.module.css";

export const FieldActions = ({ actions, className }) => {
  return (
    <ul className={cn(styles.inputWithActions, className)}>
      {actions.map((node, index) => (
        <li key={index}>{node}</li>
      ))}
    </ul>
  );
};
