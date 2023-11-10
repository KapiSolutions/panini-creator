import React, { useState, useEffect } from "react";
import styles from "./SingleChoiceField.module.css";
import Carousel from "../../Inputs/Carousel/Carousel";
import CheckBoxRadial from "../../Inputs/CheckBoxRadial/CheckBoxRadial";
import CheckBoxSquareItem from "../../Inputs/CheckBoxSquare/CheckBoxSquareItem/CheckBoxSquareItem";
import Text from "../../Inputs/Text/Text";
import { useFormContext } from "react-hook-form";
import usePaniniStore from "../../../stores/usePaniniStore";

interface Props {
  title: string;
  name: string;
  options?: Array<string>;
  type: "carousel" | "radialSelect" | "squareSelect" | "text";
  align?: "center" | "start";
}

function SingleChoiceField({ title, name, options, type, align = "center" }: Props) {
  const { errors, reset } = usePaniniStore();
  const { getValues, setValue } = useFormContext();
  const [actValue, setActValue] = useState<string | null | boolean>(getValues(name));
  const error = errors?.filter((error) => error.path[0] === name)[0];

  useEffect(() => {
    setActValue(getValues(name));
  }, [reset]);

  const updateValue = (newValue: string | null | boolean) => {
    setActValue(newValue);
    setValue(name, newValue);
  };

  const getInputField = () => {
    switch (type) {
      case "carousel":
        return (
          <Carousel
            name={name}
            options={options ? options : []}
            value={getValues(name) as string}
            setValue={updateValue}
          />
        );
      case "radialSelect":
        return (
          <CheckBoxRadial
            name={name}
            options={options ? options : []}
            value={getValues(name) as string}
            setValue={updateValue}
          />
        );
      case "squareSelect":
        return (
          <CheckBoxSquareItem
            name={name}
            option={options ? options[0] : "ADD TO ORDER"} //there is no options for cutlery and napkins, and there is boolean value for them
            value={getValues(name) as string}
            onClick={() => updateValue(options ? (getValues(name) ? null : options[0]) : !getValues(name))}
          />
        );
      case "text":
        return <Text name={name} value={getValues(name) as string} setValue={updateValue} />;
      default:
        return "Input type is not supported";
    }
  };
  return (
    <div className={styles.container} style={{ alignItems: error ? "start" : align }}>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
      <div className={styles.inputsContainer}>
        {getInputField()}
        {error && (
          <span className={styles.error} style={{ textAlign: type === "text" ? "left" : "right" }}>
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
}

export default SingleChoiceField;
