import React, { useState } from "react";
import styles from "./FormItemMultipleChoose.module.css";
import Carousel from "../Inputs/Carousel/Carousel";
import DropDown from "../Inputs/DropDown/DropDown";
import MultiSelect from "../Inputs/MultiSelect/MultiSelect";
import Switch from "../SettingElements/Switch/Switch";
import AddButton from "../SettingElements/AddButton/AddButton";
import DeleteButton from "../SettingElements/DeleteButton/DeleteButton";
import CheckBoxSquare from "../Inputs/CheckBoxSquare/CheckBoxSquare";
import { useFormContext } from "react-hook-form";

interface Props {
  title: string;
  name: string;
  options: Array<string>;
  type: "carousel" | "dropdown" | "multiselect" | "checkbox";
  withSettings?: boolean;
  zIndex?: number;
}

function FormItemMultipleChoose({ title, name, options, type, withSettings = true, zIndex = 100 }: Props) {
  const { getValues, setValue } = useFormContext();
  const [switchValue, setSwitchValue] = useState<boolean>(true);
  const [actValue, setActValue] = useState<Array<string>>(getValues(name));

  const updateValue = (newValue: string, index: number) => {
    const arr = [...getValues(name)];
    arr[index] = newValue;
    setActValue(arr);
    setValue(name, arr);
  };

  const deleteValue = (indexToDelete: number) => {
    const arr = getValues(name).filter((_: string, index: number) => index !== indexToDelete);
    setActValue(arr);
    setValue(name, arr);
  };

  const handleSwitch = (state: boolean) => {
    state ? setValue(name, actValue) : setValue(name, []);
    setSwitchValue(state);
  };

  const getInputField = (index: number) => {
    switch (type) {
      case "carousel":
        return (
          <Carousel
            options={options}
            value={getValues(name)[index]}
            setValue={(newValue) => updateValue(newValue, index)}
          />
        );
      case "dropdown":
        return (
          <DropDown
            options={options}
            zIndex={zIndex}
            value={getValues(name)[index]}
            setValue={(newValue) => updateValue(newValue, index)}
          />
        );
      case "checkbox":
        return (
          <CheckBoxSquare
            options={options}
            value={getValues(name)}
            setValue={(value) => {
              setActValue(value);
              setValue(name, value);
            }}
          />
        );
      case "multiselect":
        return (
          <MultiSelect
            options={options}
            value={getValues(name)}
            setValue={(value) => {
              setActValue(value);
              setValue(name, value);
            }}
          />
        );
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
        {withSettings && <Switch value={switchValue} setValue={handleSwitch} />}
        <div className={styles.inputContainer}>
          {withSettings && switchValue && (
            <>
              {withSettings && (
                <AddButton
                  onClick={() => {
                    updateValue(options[0], getValues(name).length);
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
          getValues(name).length >= 2 &&
          Array.from({ length: getValues(name).length - 1 }).map((_, idx) => (
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
