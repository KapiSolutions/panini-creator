import React, { useState } from "react";
import { z } from "zod";
import { useFormContext } from "react-hook-form";
import axios, { AxiosResponse, AxiosError } from "axios";
import styles from "./FinalizeForm.module.css";
import Separator from "../../Separator/Separator";
import SingleChoiceField from "../SingleChoiceField/SingleChoiceField";
import usePaniniStore from "../../../stores/usePaniniStore";
import { schema, defaultPanini } from "../../../schema/paniniSchema";
import { config } from "../../../config/config";

function FinalizeForm() {
  const { setPaniniStatus, setErrors, setReset } = usePaniniStore();
  const { getValues, reset } = useFormContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handlePlaceOrder = async (): Promise<void> => {
    setErrors([]);
    setLoading(true);
    const data = getValues();
    try {
      // validate data
      schema.parse(data); //throws error if validation fails

      // Send data to api
      const url = "https://training.nerdbord.io/api/v1/panini-creator/order";
      const res: AxiosResponse = await axios.post(url, data, {
        headers: {
          // @ts-ignore
          Authorization: import.meta.env.VITE_API_SECRET,
          "Content-Type": "application/json",
        },
      });

      // Open success screen(Fade in animation)
      setPaniniStatus("completed");

      // Reset form
      reset(defaultPanini);
      setReset();

      //open new tab with panini visualization(when success screen loaded)
      setTimeout(() => {
        downloadImage(res.data.imageUrl, "ordered_panini.jpg");
      }, config.animationTime);
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

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.download = filename;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStartAgain = async () => {
    setTimeout(() => {
      //async scroll
      const element = document.getElementById("header");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 0);
    reset(defaultPanini);
    setReset();
  };
  return (
    <div className={styles.container}>
      <h2>Finalize order</h2>

      <Separator />
      <SingleChoiceField title="Name panini" name="sandwichName" type="text" />

      <Separator />
      <SingleChoiceField title="Cutlery" name="cutlery" type="squareSelect" />

      <Separator />
      <SingleChoiceField title="Napkins" name="napkins" type="squareSelect" />

      <Separator />
      <div className={styles.buttonsContainer}>
        <button
          className={styles.primaryButton}
          onClick={handlePlaceOrder}
          disabled={loading}
          data-testid="place-order"
        >
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
