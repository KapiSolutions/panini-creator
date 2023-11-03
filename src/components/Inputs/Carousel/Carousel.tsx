import React from "react";
import styles from "./Carousel.module.css";
import ArrowRight from "../../Icons/ArrowRight";
import ArrowLeft from "../../Icons/ArrowLeft";
import Grain from "../../Icons/Grain";
import Wheat from "../../Icons/Wheat";

interface Props {
  options: Array<string>;
  value: string;
  setValue: (value: string) => void;
}

function Carousel({ options, value, setValue }: Props): React.ReactElement {
  const previousValue = () => {
    const idx = options.indexOf(value) - 1;
    const length = options.length;
    const newIndex = idx >= 0 ? idx : length - 1;
    setValue(options[newIndex]);
  };
  const nextValue = () => {
    const idx = options.indexOf(value) + 1;
    const length = options.length - 1;
    const newIndex = idx <= length ? idx : 0;
    setValue(options[newIndex]);
  };
  return (
    <div className={styles.container}>
      <span onClick={previousValue}>
        <ArrowRight />
      </span>
      <div className={styles.item}>
        {value === "WHEAT" && <Wheat />}
        {value === "FULL GRAIN" && <Grain />}

        <span>{value}</span>
      </div>
      <span onClick={nextValue}>
        <ArrowLeft />
      </span>
    </div>
  );
}

export default Carousel;
