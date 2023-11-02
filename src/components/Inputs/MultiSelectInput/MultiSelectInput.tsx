import React from "react";
import styles from "./MultiSelectInput.module.css";
import SelectItem from "./SelectItem/SelectItem";

interface Props {
  options: Array<string>;
  value: Array<string>;
  setValue: (value: Array<string>) => void;
}

function MultiSelectInput({ options, value, setValue }: Props): React.ReactElement {
  const updateValue = (selectedOption: string) => {
    if (value.includes(selectedOption)) {
      setValue(value.filter((item) => item !== selectedOption));
    } else {
      const tmpArr = [...value];
      tmpArr.push(selectedOption);
      setValue(tmpArr);
    }
  };

  return (
    <div className={styles.container}>
      {options.map((option, idx) => (
        <SelectItem key={idx} option={option} onClick={() => updateValue(option)} />
      ))}
    </div>
  );
}

export default MultiSelectInput;
