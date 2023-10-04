import React, { useState, useEffect, ReactElement } from "react";
import styles from "./styles.module.css";
import usePaniniStore from "../../stores/usePaniniStore";

function SplashScreen(): ReactElement {
  const [isBtnClicked, setBtnClicked] = useState<Boolean>(false);
  const { paniniStatus, setPaniniStatus } = usePaniniStore();
  const animationTime = 2400; // 2.4s animation duration

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isBtnClicked) {
      timeout = setTimeout(() => {
        setPaniniStatus("started");
      }, animationTime);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isBtnClicked]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={`${styles.header} ${isBtnClicked && styles.animationHeader}`}>
        <h1>{paniniStatus === "completed" ? "Panini ordered" : "Panini Creator"}</h1>
        <small className={styles.btn} onClick={() => setBtnClicked(!isBtnClicked)}>
          {paniniStatus === "completed" ? "Start again" : "Begin"}
        </small>
      </div>

      {/* Circles: left and top */}
      <div
        className={`${styles.circle} ${isBtnClicked && styles.animationLeftCircle}`}
        style={{ left: "calc(50% - 863px)" }}
      ></div>
      <div
        className={`${styles.circle} ${isBtnClicked && styles.animationLeftCircle}`}
        style={{ left: "calc(50% - 311px)" }}
      ></div>
      <div
        className={`${styles.circleSmall} ${isBtnClicked && styles.animationTopCircle}`}
        style={{ top: "calc(50% - 632px - 105.5px + 29px)" }}
      ></div>
      {/* Main Circle */}
      <div className={`${styles.circle} ${isBtnClicked && styles.animationMainCircle}`}>
        <div className={styles.line} style={{ top: "calc(50% - 105.5px)" }}></div>
        <div className={styles.line} style={{ top: "calc(50% + 105.5px)" }}></div>
      </div>
      {/* Circles: right and bottom */}
      <div
        className={`${styles.circle} ${isBtnClicked && styles.animationRightCircle}`}
        style={{ left: "calc(50% + 311px)" }}
      ></div>
      <div
        className={`${styles.circle} ${isBtnClicked && styles.animationRightCircle}`}
        style={{ left: "calc(50% + 863px)" }}
      ></div>
      <div
        className={`${styles.circleSmall} ${isBtnClicked && styles.animationBottomCircle}`}
        style={{ top: "calc(50%  + 105.5px - 29px)" }}
      ></div>
    </div>
  );
}

export default SplashScreen;