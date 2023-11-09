import React from "react";
import styles from "./CheckBoxRadial.module.css";
import CheckBoxRadialItem from "./CheckBoxRadialItem/CheckBoxRadialItem";

interface Props {
  name: string;
  options: Array<string>;
  value: string;
  setValue: (value: string) => void;
}
function CheckBoxRadial({ name, options, value, setValue }: Props): React.ReactElement {
  return (
    <div className={styles.container} data-testid={`${name}`}>
      {options.map((option, idx) => (
        <CheckBoxRadialItem key={idx} option={option} value={value} onClick={() => setValue(option)} />
      ))}
    </div>
  );
}

export default CheckBoxRadial;
