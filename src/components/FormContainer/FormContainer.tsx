import React from "react";
import styles from "./FormContainer.module.css";
import usePaniniStore from "../../stores/usePaniniStore";

type PropsWithChildren = {
  children: React.ReactNode;
};

const FormContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { paniniStatus } = usePaniniStore();
  return (
    <div className={styles.wrapper} style={{ position: paniniStatus === "started" ? "absolute" : "fixed" }}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default FormContainer;
