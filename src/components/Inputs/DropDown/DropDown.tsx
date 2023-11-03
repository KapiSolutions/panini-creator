import React, { useState } from "react";
import styles from "./DropDown.module.css";
import ArrowDown from "../../Icons/ArrowDown";

interface Props {
  options: Array<string>;
  value: string;
  setValue: (value: string) => void;
  zIndex?: number;
}

function DropDown({ options, value, setValue, zIndex = 9 }: Props) {
  const [showItems, setShowItems] = useState<boolean>(false);

  return (
    <div className={styles.container} style={{ zIndex: zIndex }} onClick={() => setShowItems(!showItems)}>
      {value}
      <div className={`${styles.arrow} ${showItems && styles.rotate}`}>
        <ArrowDown />
      </div>
      <div className={styles.itemsContainer} style={showItems ? { display: "flex" } : { display: "none" }}>
        {options
          .filter((option) => option != value)
          .map((option, idx) => (
            <div key={idx} className={styles.item} onClick={() => setValue(option)}>
              {option}
            </div>
          ))}
      </div>
    </div>
  );
}

export default DropDown;
