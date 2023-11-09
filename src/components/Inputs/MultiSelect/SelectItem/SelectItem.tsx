import React from "react";
import styles from "./SelectItem.module.css";

interface Props {
  option: string;
  value: string;
  onClick: () => void;
}

function SelectItem({ option, value, onClick }: Props): React.ReactElement {
  return (
    <div className={`${styles.container} ${value.includes(option) ? styles.active : ""}`} onClick={() => onClick()}>
      {option}
    </div>
  );
}

export default SelectItem;
