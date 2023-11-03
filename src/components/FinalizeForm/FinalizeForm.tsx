import React from "react";
import styles from "./FinalizeForm.module.css";
import Separator from "../Separator/Separator";
import FormItemSingleChoose from "../FormItemSingleChoose/FormItemSingleChoose";
import usePaniniStore from "../../stores/usePaniniStore";

function FinalizeForm() {
  const { sandwichPayload, setPaniniStatus } = usePaniniStore();
  const handlePlaceOrder = (): void => {
    setPaniniStatus("completed");
  };
  const handleStartAgain = (): void => {
    const element = document.getElementById("header");
    element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={styles.container}>
      <h2>Finalize order</h2>

      <Separator />
      <FormItemSingleChoose title="Name panini" type="text" defaultValue={sandwichPayload.sandwichName} />

      <Separator />
      <FormItemSingleChoose title="Cutlery" type="squareSelect" defaultValue={sandwichPayload.cutlery} />

      <Separator />
      <FormItemSingleChoose title="Napkins" type="squareSelect" defaultValue={sandwichPayload.napkins} />

      <Separator />
      <div className={styles.buttonsContainer}>
        <button className={styles.primaryButton} onClick={handlePlaceOrder}>
          Place order
        </button>
        <button className={styles.secondaryButton} onClick={handleStartAgain}>
          Start again
        </button>
      </div>
    </div>
  );
}

export default FinalizeForm;
