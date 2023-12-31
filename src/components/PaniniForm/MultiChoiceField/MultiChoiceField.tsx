import React, { useState, useEffect } from "react";
import styles from "./MultiChoiceField.module.css";
import Carousel from "../../Inputs/Carousel/Carousel";
import DropDown from "../../Inputs/DropDown/DropDown";
import MultiSelect from "../../Inputs/MultiSelect/MultiSelect";
import Switch from "../../SettingElements/Switch/Switch";
import AddButton from "../../SettingElements/AddButton/AddButton";
import DeleteButton from "../../SettingElements/DeleteButton/DeleteButton";
import CheckBoxSquare from "../../Inputs/CheckBoxSquare/CheckBoxSquare";
import { useFormContext } from "react-hook-form";
import usePaniniStore from "../../../stores/usePaniniStore";

interface Props {
  title: string;
  name: string;
  options: Array<string>;
  type: "carousel" | "dropdown" | "multiselect" | "checkbox";
  withSettings?: boolean;
  zIndex?: number;
}

function MultiChoiceField({ title, name, options, type, withSettings = true, zIndex = 50 }: Props) {
  const { errors, reset } = usePaniniStore();
  const { getValues, setValue } = useFormContext();
  const [switchValue, setSwitchValue] = useState<boolean>(true);
  const [actValue, setActValue] = useState<Array<string>>(getValues(name));
  const error = errors?.filter((error) => error.path[0] === name)[0];

  useEffect(() => {
    setSwitchValue(true);
    setActValue(getValues(name));
  }, [reset]);

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
          <div className={styles.carouselContainer} style={{ marginTop: index > 0 ? "3px" : "0px" }}>
            {index > 0 && <div className={styles.separator} />}
            <div style={{ marginTop: index > 0 ? "3px" : "0px" }}>
              <Carousel
                name={name}
                options={options}
                value={getValues(name)[index]}
                setValue={(newValue) => updateValue(newValue, index)}
              />
            </div>
          </div>
        );
      case "dropdown":
        return (
          <DropDown
            name={name}
            options={options}
            zIndex={zIndex}
            value={getValues(name)[index]}
            setValue={(newValue) => updateValue(newValue, index)}
          />
        );
      case "checkbox":
        return (
          <CheckBoxSquare
            name={name}
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
            name={name}
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
    <div className={styles.container} style={title === "Vegetables" ? {minHeight: "180px"}: {}}>
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
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
}

export default MultiChoiceField;
