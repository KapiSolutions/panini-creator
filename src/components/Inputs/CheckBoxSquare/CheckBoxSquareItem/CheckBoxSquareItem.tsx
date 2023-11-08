import React from "react";
import styles from "./CheckBoxSquareItem.module.css";

interface Props {
  name: string;
  option: string;
  value: string;
  onClick: () => void;
}
function CheckBoxSquareItem({ name, option, value, onClick }: Props): React.ReactElement {
  return (
    <div
      className={styles.option}
      onClick={() => {
        onClick();
      }}
    >
      <span>{option}</span>
      <div
        className={`${styles.checkbox} ${
          typeof value === "string" ? value.includes(option) && styles.active : value && styles.active
        }`}
        data-testid={`${name}-checkbox`}
      />
    </div>
  );
}

export default CheckBoxSquareItem;
