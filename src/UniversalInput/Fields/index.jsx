import { ChildrenField } from "./ChildrenField";
import { CodeEditor } from "./CodeEditor";
import { MaskedField } from "./MaskedField";
import { NumberField } from "./NumberField";
import { SelectField } from "./SelectField";
import { TextAreaField } from "./TextAreaField";
import { TextField } from "./TextField";

export const Field = ({ type, ...fieldProps }) => {
  const Component =
    {
      number: NumberField,
      mask: MaskedField,
      script: CodeEditor,
      select: SelectField,
      textarea: TextAreaField,
      children: ChildrenField,
      text: TextField,
    }?.[type] ?? TextField;

  return <Component {...fieldProps} />;
};
