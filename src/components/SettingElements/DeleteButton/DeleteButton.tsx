import React from "react";
import styles from "./DeleteButton.module.css";

interface Props {
  onClick: () => void;
}

function DeleteButton({ onClick }: Props): React.ReactElement {
  return <div className={styles.button} onClick={onClick} />;
}

export default DeleteButton;
