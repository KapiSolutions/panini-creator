import React from "react";
import styles from "./MultiSelect.module.css";
import SelectItem from "./SelectItem/SelectItem";

interface Props {
  name: string;
  options: Array<string>;
  value: Array<string>;
  setValue: (value: Array<string>) => void;
}

function MultiSelect({ name, options, value, setValue }: Props): React.ReactElement {
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
    <div className={styles.container} data-testid={`${name}`}>
      {options.map((option, idx) => (
        <SelectItem key={idx} option={option} value={value.join()} onClick={() => updateValue(option)} />
      ))}
    </div>
  );
}

export default MultiSelect;
