import React from "react";
import styles from "./FinalizeForm.module.css";
import Separator from "../Separator/Separator";
import FormItemSingleChoose from "../FormItemSingleChoose/FormItemSingleChoose";
import usePaniniStore from "../../stores/usePaniniStore";

function FinalizeForm() {
  const { sandwichPayload } = usePaniniStore();
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
        <button className={styles.primaryButton}>Place order</button>
        <button className={styles.secondaryButton}>Start again</button>
      </div>
    </div>
  );
}

export default FinalizeForm;
