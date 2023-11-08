import React from "react";
import styles from "./CheckBoxSquare.module.css";
import CheckBoxSquareItem from "./CheckBoxSquareItem/CheckBoxSquareItem";

interface Props {
  name: string;
  options: Array<string>;
  value: Array<string>;
  setValue: (value: Array<string>) => void;
}
function CheckBoxSquare({ name, options, value, setValue }: Props): React.ReactElement {
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
        <CheckBoxSquareItem
          key={idx}
          name={name}
          option={option}
          value={Array.isArray(value) ? value.join() : value}
          onClick={() => updateValue(option)}
        />
      ))}
    </div>
  );
}

export default CheckBoxSquare;
