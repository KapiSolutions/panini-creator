import React from "react";
import styles from "./CheckBoxRadialInput.module.css";
import CheckBoxSquareItem from "./CheckBoxRadialItem/CheckBoxRadialItem";

interface Props {
  options: Array<string>;
  value: string;
  setValue: (value: string) => void;
}
function CheckBoxRadialInput({ options, value, setValue }: Props): React.ReactElement {
  return (
    <div className={styles.container}>
      {options.map((option, idx) => (
        <CheckBoxSquareItem key={idx} option={option} value={value} onClick={() => setValue(option)} />
      ))}
    </div>
  );
}

export default CheckBoxRadialInput;
