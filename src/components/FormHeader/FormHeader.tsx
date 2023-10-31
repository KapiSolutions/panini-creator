import React from "react";
import styles from "./FormHeader.module.css";
import Dice from "../Icons/Dice";

function FormHeader() {
  return (
    <div className={styles.container}>
      <h1>Panini Creator</h1>
      <button>
        <Dice />
        <span>Randomize Panini</span>
      </button>
    </div>
  );
}

export default FormHeader;
