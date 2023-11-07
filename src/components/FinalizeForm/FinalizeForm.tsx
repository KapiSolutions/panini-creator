import React from "react";
import styles from "./FinalizeForm.module.css";
import Separator from "../Separator/Separator";
import FormItemSingleChoose from "../FormItemSingleChoose/FormItemSingleChoose";
import usePaniniStore from "../../stores/usePaniniStore";
import { useFormContext } from "react-hook-form";
import { schema } from "../../schema/paniniSchema";
import { z } from "zod";
import type { SandwichPayload } from "../../types/types";

function FinalizeForm() {
  const { setPaniniStatus, setErrors, errors } = usePaniniStore();
  const { getValues, reset } = useFormContext();

  const handlePlaceOrder = (): void => {
    setErrors(null);

    try {
      schema.parse(getValues()); //throws error if validation fails

      // function for data submission

      // setPaniniStatus("completed");
      // reset();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: z.ZodIssue[] = error.issues;
        setErrors(validationErrors);
      } else {
        console.error("An error occurred:", error);
      }
    }
  };
  console.log(errors);
  const handleStartAgain = (): void => {
    const element = document.getElementById("header");
    element?.scrollIntoView({ behavior: "smooth" });
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
