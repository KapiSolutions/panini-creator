import React, { useState } from "react";
import styles from "./FormItemSingleChoose.module.css";
import Carousel from "../Inputs/Carousel/Carousel";
import CheckBoxRadial from "../Inputs/CheckBoxRadial/CheckBoxRadial";
import CheckBoxSquareItem from "../Inputs/CheckBoxSquare/CheckBoxSquareItem/CheckBoxSquareItem";

interface Props {
  title: string;
  options: Array<string>;
  defaultValue: string | null | boolean;
  type: "carousel" | "radialSelect" | "squareSelect" | "squareSelectString";
  align?: "center" | "start";
}

function FormItemSingleChoose({ title, options, type, defaultValue, align = "center" }: Props) {
  const [value, setValue] = useState<string | null | boolean>(defaultValue);
console.log(title,value)
  const getInputField = () => {
    switch (type) {
      case "carousel":
        return <Carousel options={options} value={value as string} setValue={setValue} />;
      case "radialSelect":
        return <CheckBoxRadial options={options} value={value as string} setValue={setValue} />;
      case "squareSelect":
        return <CheckBoxSquareItem option={options[0]} value={value as string} onClick={() => setValue(value ? null : options[0])} />;
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

export default FormItemSingleChoose;
