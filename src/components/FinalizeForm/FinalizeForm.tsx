import React from "react";
import styles from "./FinalizeForm.module.css";
import Separator from "../Separator/Separator";
import FormItemSingleChoose from "../FormItemSingleChoose/FormItemSingleChoose";
import usePaniniStore from "../../stores/usePaniniStore";
import { useFormContext } from "react-hook-form";

function FinalizeForm() {
  const { setPaniniStatus } = usePaniniStore();
  const { handleSubmit, getValues, reset } = useFormContext();

  const handlePlaceOrder = (): void => {
    console.log("Form Values:", getValues());
    reset();
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
      <FormItemSingleChoose title="Name panini" name="sandwichName" type="text" />

      <Separator />
      <FormItemSingleChoose title="Cutlery" name="cutlery" type="squareSelect" />

      <Separator />
      <FormItemSingleChoose title="Napkins" name="napkins" type="squareSelect" />

      <Separator />
      <div className={styles.buttonsContainer}>
        <button className={styles.primaryButton} onClick={handleSubmit(handlePlaceOrder)}>
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
