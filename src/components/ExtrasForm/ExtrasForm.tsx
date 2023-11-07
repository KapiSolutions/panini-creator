import React from "react";
import styles from "./ExtrasForm.module.css";
import Separator from "../Separator/Separator";
import FormItemMultipleChoose from "../FormItemMultipleChoose/FormItemMultipleChoose";
import FormItemSingleChoose from "../FormItemSingleChoose/FormItemSingleChoose";
import { eggVariants } from "../../data/egg";
import { spreadVariant } from "../../data/spread";
import { servingVariant } from "../../data/serving";
import { toppingVariant } from "../../data/topping";

function ExtrasForm() {
  return (
    <div className={styles.container}>
      <h2>Configure extras</h2>

      <Separator />
      <FormItemMultipleChoose title="Cheese" name="extras.egg" type="dropdown" options={eggVariants} />

      <Separator />
      <FormItemMultipleChoose
        title="Spreads"
        name="extras.spreads"
        type="checkbox"
        options={spreadVariant}
        withSettings={false}
      />

      <Separator />
      <FormItemSingleChoose title="Serving" name="extras.serving" type="radialSelect" options={servingVariant} />

      <Separator />
      <FormItemSingleChoose title="Topping" name="extras.topping" type="squareSelect" options={toppingVariant} />

      <Separator />
    </div>
  );
}

export default ExtrasForm;
