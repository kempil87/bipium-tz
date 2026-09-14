import cn from "classnames";

export const ChildrenField = ({ className, children }) => {
  return (
    <div className={cn("ant-input", className)}>
      {children}
    </div>
  );
};
