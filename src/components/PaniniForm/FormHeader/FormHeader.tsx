import React from "react";
import styles from "./FormHeader.module.css";
import { useFormContext } from "react-hook-form";
import usePaniniStore from "../../../stores/usePaniniStore";
import { randomPanini } from "../../../schema/paniniSchema";
import DiceOne from "../../Icons/Dices/DiceOne";
import DiceTwo from "../../Icons/Dices/DiceTwo";

function FormHeader(): React.ReactElement {
  const { reset } = useFormContext();
  const { setReset } = usePaniniStore();

  const handleRandomize = () => {
    reset(randomPanini());
    setReset();
  };

  return (
    <div className={styles.container}>
      <h1>Panini Creator</h1>
      <button>
        <div className={styles.iconsContainer}>
          <span className={styles.diceOne}>
            <DiceOne />
          </span>
          <span className={styles.diceTwo}>
            <DiceTwo />
          </span>
        </div>
        <span onClick={handleRandomize}>Randomize Panini</span>
      </button>
    </div>
  );
}

export default FormHeader;
