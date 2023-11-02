import React, { useState } from "react";
import styles from "./FormItemSingleChoose.module.css";
import CarouselInput from "../Inputs/CarouselInput/CarouselInput";

interface Props {
  title: string;
  options: Array<string>;
  type: "carousel" | "radialSelect" | "squareSelect" | "squareSelectString";
  align?: "center" | "start";
}

function FormItem({ title, options, type, align = "center" }: Props) {
  const [value, setValue] = useState<string | null>(options[0]);

  const getInputField = () => {
    switch (type) {
      case "carousel":
        return <CarouselInput options={options} value={value} setValue={setValue} />;
      default:
        return "Input type is not supported";
    }
  };
  return (
    <div className={styles.container} style={{ alignItems: align }}>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
      <div className={styles.inputsContainer}>{getInputField()}</div>
    </div>
  );
}

export default FormItem;
