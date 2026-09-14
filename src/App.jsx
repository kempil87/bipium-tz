import cn from "classnames";
import { useLocalStorage } from "./UseLocalStorage";
import { UniversalInput } from "./UniversalInput";
import "./App.css";

const SELECT_OPTIONS = [
  { value: "first element", label: "Первый элемент" },
  { value: "second element", label: "Второй элемент" },
  { value: "third element", label: "Третий элемент" },
];

export const App = () => {
  const [numberValue, setNumberValue] = useLocalStorage("universal-input:number");
  const [textValue, setTextValue] = useLocalStorage("universal-input:text");
  const [multilineValue, setMultilineValue] = useLocalStorage(
    "universal-input:multiline"
  );
  const [maskValue, setMaskValue] = useLocalStorage("universal-input:mask");
  const [selectValue, setSelectValue] = useLocalStorage("universal-input:select");

  return (
    <div className="main">
      <h1 className="title">THIS IS NOT A TEST TASK</h1>

      <div className="inputItems">
        <UniversalInput
          type="number"
          value={numberValue}
          onChange={setNumberValue}
          placeholder="Число"
          isStretched
          className="inputItem"
        />

        <UniversalInput
          value={textValue}
          onChange={setTextValue}
          placeholder="Текст"
          className="inputItem"
        />

        <UniversalInput
          multiline
          value={multilineValue}
          onChange={setMultilineValue}
          placeholder="Многострочный текст"
          className="inputItem"
        />

        <UniversalInput
          value={maskValue}
          onChange={setMaskValue}
          mask="111-111"
          placeholder="Маска"
          className={cn("inputItem", "inputItemRounded")}
        />

        <UniversalInput
          value={selectValue}
          onChange={setSelectValue}
          options={SELECT_OPTIONS}
          placeholder="Список"
          isStretched
          className={cn("inputItem", "inputItemRounded")}
        />
      </div>
    </div>
  );
};
