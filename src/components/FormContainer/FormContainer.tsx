import React, { useEffect, useState } from "react";
import styles from "./FormContainer.module.css";
import usePaniniStore from "../../stores/usePaniniStore";
import { config } from "../../config/config";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

type PropsWithChildren = {
  children: React.ReactNode;
};

const FormContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { paniniStatus, defaultPanini } = usePaniniStore();
  const [position, setPosition] = useState<"fixed" | "absolute">("fixed");

  const methods = useForm({ defaultValues: defaultPanini });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (paniniStatus === "started") {
      setPosition("absolute");
    }
    timeout = setTimeout(() => {
      if (paniniStatus === "completed") {
        setPosition("fixed");
      }
    }, config.animationTime + 100);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [paniniStatus]);
  return (
    <div id="header" className={styles.wrapper} style={{ position: position }}>
      <div className={styles.container}>
        <FormProvider {...methods}>{children}</FormProvider>
      </div>
    </div>
  );
};

export default FormContainer;
