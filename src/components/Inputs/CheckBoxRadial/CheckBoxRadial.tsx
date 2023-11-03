import React from "react";
import styles from "./CheckBoxRadial.module.css";
import CheckBoxRadialItem from "./CheckBoxRadialItem/CheckBoxRadialItem";

interface Props {
  options: Array<string>;
  value: string;
  setValue: (value: string) => void;
}
function CheckBoxRadial({ options, value, setValue }: Props): React.ReactElement {
  return (
    <div className={styles.container}>
      {options.map((option, idx) => (
        <CheckBoxRadialItem key={idx} option={option} value={value} onClick={() => setValue(option)} />
      ))}
    </div>
  );
}

export default CheckBoxRadial;
