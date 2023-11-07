import React, { useState } from "react";
import styles from "./FinalizeForm.module.css";
import Separator from "../Separator/Separator";
import FormItemSingleChoose from "../FormItemSingleChoose/FormItemSingleChoose";
import usePaniniStore from "../../stores/usePaniniStore";
import { useFormContext } from "react-hook-form";
import { schema } from "../../schema/paniniSchema";
import { z } from "zod";
import axios, { AxiosResponse, AxiosError } from "axios";

function FinalizeForm() {
  const { setPaniniStatus, setErrors, errors } = usePaniniStore();
  const { getValues, reset } = useFormContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handlePlaceOrder = async (): Promise<void> => {
    setErrors([]);
    setLoading(true);
    const data = getValues();
    try {
      schema.parse(data); //throws error if validation fails

      const url = "https://training.nerdbord.io/api/v1/panini-creator/order";
      const res: AxiosResponse = await axios.post(url, data, {
        headers: {
          Authorization: "secret_token",
          "Content-Type": "application/json", // Adjust content type as needed
        },
      });

      setPaniniStatus("completed");
      reset();

      window.open(res.data.imageUrl, "_blank");

      // if (!newTab) {
      //   setTimeout(function () {
      //     alert("Allow your browser to open a pop-up window to check your panini image.");
      //   }, 0);
      // }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: z.ZodIssue[] = error.issues;
        setErrors(validationErrors);
      } else if (error instanceof AxiosError && error.response) {
        console.error("Request failed with status code:", error.response.status);
        console.error("Response data:", error.response.data);
      } else {
        console.error("An error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  };

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
        <button className={styles.primaryButton} onClick={handlePlaceOrder} disabled={loading}>
          {loading ? "Processing..." : "Place order"}
        </button>
        <button className={styles.secondaryButton} onClick={handleStartAgain}>
          Start again
        </button>
      </div>
    </div>
  );
}

export default FinalizeForm;
