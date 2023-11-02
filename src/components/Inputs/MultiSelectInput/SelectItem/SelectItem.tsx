import React, { useState } from "react";
import styles from "./SelectItem.module.css";

interface Props {
  option: string;
  onClick: () => void;
}

function SelectItem({ option, onClick }: Props): React.ReactElement {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div
      className={`${styles.container} ${clicked && styles.active}`}
      onClick={() => {
        setClicked(!clicked);
        onClick();
      }}
    >
      {option}
    </div>
  );
}

export default SelectItem;
