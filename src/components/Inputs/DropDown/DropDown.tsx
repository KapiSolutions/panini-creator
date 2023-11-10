import React, { useState } from "react";
import styles from "./DropDown.module.css";
import ArrowDown from "../../Icons/ArrowDown";

interface Props {
  name: string;
  options: Array<string>;
  value: string;
  setValue: (value: string) => void;
  zIndex?: number;
}

function DropDown({ name, options, value, setValue, zIndex = 9 }: Props) {
  const [showItems, setShowItems] = useState<boolean>(false);

  return (
    <div className={styles.container} style={{ zIndex: zIndex }} onClick={() => setShowItems(!showItems)}>
      <span data-testid={`${name}`}>{value}</span>
      <div className={`${styles.arrow} ${showItems && styles.rotate}`}>
        <ArrowDown />
      </div>

      <div className={styles.itemsContainer} style={{ display: showItems ? "flex" : "none" }}>
        {options
          .filter((option) => option != value)
          .map((option, idx) => (
            <div key={idx} className={styles.item} onClick={() => setValue(option)} data-testid={`${name}-${idx}`}>
              {option}
            </div>
          ))}
      </div>
    </div>
  );
}

export default DropDown;
