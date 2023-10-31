import React from "react";
import styles from "./FormContainer.module.css";

type PropsWithChildren = {
  children: React.ReactNode;
};

const FormContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default FormContainer;
