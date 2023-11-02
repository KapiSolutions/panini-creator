import React from "react";
import styles from "./Switch.module.css";

interface Props {
  value: boolean;
  setValue: (val: boolean) => void;
}

function Switch({ value, setValue }: Props) {
  return (

      <div className={`${styles.switch} ${value && styles.checked}`} onClick={() => setValue(!value)} />

    // <div className={styles.container}>
    //   <label className={styles.switch}>
    //     <input type="checkbox" className={styles.switchInput} checked={value} onChange={() => setValue(!value)} />
    //     <span className={styles.switchSlider}></span>
    //   </label>
    // </div>
  );
}

export default Switch;
