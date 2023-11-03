import React, { useState } from "react";
import styles from "./FormItemMultipleChoose.module.css";
import Carousel from "../Inputs/Carousel/Carousel";
import DropDown from "../Inputs/DropDown/DropDown";
import MultiSelect from "../Inputs/MultiSelect/MultiSelect";
import Switch from "../SettingElements/Switch/Switch";
import AddButton from "../SettingElements/AddButton/AddButton";
import DeleteButton from "../SettingElements/DeleteButton/DeleteButton";
import CheckBoxSquare from "../Inputs/CheckBoxSquare/CheckBoxSquare";

interface Props {
  title: string;
  options: Array<string>;
  type: "carousel" | "dropdown" | "multiselect" | "checkbox";
  defaultValue: Array<string>;
  withSettings?: boolean;
  zIndex?: number;
}

function FormItemMultipleChoose({ title, options, type, defaultValue, withSettings = true, zIndex = 100 }: Props) {
  const [switchValue, setSwitchValue] = useState<boolean>(true);
  const [value, setValue] = useState<Array<string>>(defaultValue);
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
          <Carousel options={options} value={value[index]} setValue={(newValue) => updateValue(newValue, index)} />
        );
      case "dropdown":
        return (
          <DropDown
            options={options}
            zIndex={zIndex}
            value={value[index]}
            setValue={(newValue) => updateValue(newValue, index)}
          />
        );
      case "checkbox":
        return <CheckBoxSquare options={options} value={value} setValue={setValue} />;
      case "multiselect":
        return <MultiSelect options={options} value={value} setValue={setValue} />;
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
        {withSettings &&
          switchValue &&
          value.length >= 2 &&
          Array.from({ length: value.length - 1 }).map((_, idx) => (
            <div className={styles.inputContainer} key={idx} style={{ zIndex: zIndex - idx - 1 }}>
              {switchValue && (
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
