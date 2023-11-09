import React from "react";
import styles from "./CheckBoxRadialItem.module.css";

interface Props {
  option: string;
  value: string;
  onClick: () => void;
}
function CheckBoxSquareItem({ option, value, onClick }: Props): React.ReactElement {
  return (
    <div className={styles.option} onClick={() => onClick()}>
      <div
        className={`${styles.checkbox} ${value === option ? styles.active : ""}`}
        data-testid={option}
        data-testvalue={option}
      />
      <span>{option}</span>
    </div>
  );
}

export default CheckBoxSquareItem;
