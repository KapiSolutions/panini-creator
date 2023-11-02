import React from "react";
import styles from "./AddButton.module.css";

interface Props {
  onClick: () => void;
}

function AddButton({ onClick }: Props): React.ReactElement {
  return <div className={styles.button} onClick={onClick} />;
}

export default AddButton;
