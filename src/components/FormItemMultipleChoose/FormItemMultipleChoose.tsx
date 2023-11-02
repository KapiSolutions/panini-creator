import React, { useState } from "react";
import styles from "./FormItemMultipleChoose.module.css";
import CarouselInput from "../Inputs/CarouselInput/CarouselInput";
import DropDownInput from "../Inputs/DropDownInput/DropDownInput";
import MultiSelectInput from "../Inputs/MultiSelectInput/MultiSelectInput";
import Switch from "../SettingElements/Switch/Switch";
import AddButton from "../SettingElements/AddButton/AddButton";
import DeleteButton from "../SettingElements/DeleteButton/DeleteButton";

interface Props {
  title: string;
  options: Array<string>;
  type: "carousel" | "dropdown" | "multiselect";
  withSettings?: boolean;
  zIndex?: number;
}

function FormItemMultipleChoose({ title, options, type, withSettings = true, zIndex = 100 }: Props) {
  const initValue = type === "multiselect" ? [] : [options[0]];
  const [switchValue, setSwitchValue] = useState<boolean>(true);
  const [value, setValue] = useState<Array<string>>(initValue);
  console.log(`${title}: ${value}`);

  const updateValue = (newValue: string, index: number) => {
    const arr = [...value];
    arr[index] = newValue;
    setValue(arr);
  };

  const deleteValue = (indexToDelete: number) => {
    setValue(value.filter((_, index) => index !== indexToDelete));
  };

  const getInputField = (index: number) => {
    switch (type) {
      case "carousel":
        return (
          <CarouselInput options={options} value={value[index]} setValue={(newValue) => updateValue(newValue, index)} />
        );
      case "dropdown":
        return (
          <DropDownInput
            options={options}
            zIndex={zIndex}
            value={value[index]}
            setValue={(newValue) => updateValue(newValue, index)}
          />
        );
      case "multiselect":
        return <MultiSelectInput options={options} value={value} setValue={setValue} />;
      default:
        return "Input type is not supported";
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
      <div className={styles.inputsContainer}>
        {/* First row */}
        {withSettings && <Switch value={switchValue} setValue={setSwitchValue} />}
        <div className={styles.inputContainer}>
          {withSettings && switchValue && (
            <>
              {withSettings && (
                <AddButton
                  onClick={() => {
                    updateValue(options[0], value.length);
                  }}
                />
              )}
              {getInputField(0)}
            </>
          )}
          {!withSettings && getInputField(0)}
        </div>

        {/* Aditionals rows */}
        {switchValue &&
          value.length >= 2 &&
          Array.from({ length: value.length - 1 }).map((_, idx) => (
            <div className={styles.inputContainer} key={idx} style={{ zIndex: zIndex - idx - 1 }}>
              {withSettings && switchValue && (
                <>
                  {withSettings && <DeleteButton onClick={() => deleteValue(idx + 1)} />}
                  {getInputField(idx + 1)}
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default FormItemMultipleChoose;
