import React from "react";
import styles from "./Text.module.css";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

function Text({ value, setValue }: Props): React.ReactElement {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return <input type="text" placeholder="eg. Club Panini" className={styles.input} value={value} onChange={handleInputChange} />;
}

export default Text;
