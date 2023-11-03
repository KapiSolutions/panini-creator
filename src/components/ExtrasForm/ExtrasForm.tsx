import React from "react";
import styles from "./ExtrasForm.module.css";
import Separator from "../Separator/Separator";
import FormItemMultipleChoose from "../FormItemMultipleChoose/FormItemMultipleChoose";
import FormItemSingleChoose from "../FormItemSingleChoose/FormItemSingleChoose";
import { eggVariants } from "../../data/egg";
import { spreadVariant } from "../../data/spread";
import { servingVariant } from "../../data/serving";
import { toppingVariant } from "../../data/topping";
import usePaniniStore from "../../stores/usePaniniStore";

function ExtrasForm() {
  const { sandwichPayload } = usePaniniStore();
  return (
    <div className={styles.container}>
      <h2>Configure extras</h2>

      <Separator />
      <FormItemMultipleChoose
        title="Cheese"
        type="dropdown"
        options={eggVariants}
        defaultValue={sandwichPayload.extras.egg}
      />

      <Separator />
      <FormItemMultipleChoose
        title="Spreads"
        type="checkbox"
        options={spreadVariant}
        defaultValue={sandwichPayload.extras.spreads}
        withSettings={false}
      />

      <Separator />
      <FormItemSingleChoose
        title="Serving"
        type="radialSelect"
        options={servingVariant}
        defaultValue={sandwichPayload.extras.serving}
      />

      <Separator />
      <FormItemSingleChoose
        title="Topping"
        type="squareSelect"
        options={toppingVariant}
        defaultValue={sandwichPayload.extras.topping}
      />

      <Separator />
    </div>
  );
}

export default ExtrasForm;
