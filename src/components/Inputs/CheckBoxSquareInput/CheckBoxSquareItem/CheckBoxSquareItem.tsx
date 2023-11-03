import React from "react";
import styles from "./CheckBoxSquareItem.module.css";

interface Props {
  option: string;
  value: string;
  onClick: () => void;
}
function CheckBoxSquareItem({ option, value, onClick }: Props): React.ReactElement {
  return (
    <div
      className={styles.option}
      onClick={() => {
        onClick();
      }}
    >
      <span>{option}</span>
      <div className={`${styles.checkbox} ${typeof value === 'string' ? value.includes(option) && styles.checked : value && styles.checked}`} />
    </div>
  );
}

export default CheckBoxSquareItem;
