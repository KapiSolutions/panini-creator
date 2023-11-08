import React from "react";
import styles from "./ExtrasForm.module.css";
import Separator from "../../Separator/Separator";
import MultiChoiceField from "../MultiChoiceField/MultiChoiceField";
import SingleChoiceField from "../SingleChoiceField/SingleChoiceField";
import { eggVariants } from "../../../data/egg";
import { spreadVariant } from "../../../data/spread";
import { servingVariant } from "../../../data/serving";
import { toppingVariant } from "../../../data/topping";

function ExtrasForm() {
  return (
    <div className={styles.container}>
      <h2>Configure extras</h2>

      <Separator />
      <MultiChoiceField title="Cheese" name="extras.egg" type="dropdown" options={[...eggVariants]} />

      <Separator />
      <MultiChoiceField
        title="Spreads"
        name="extras.spreads"
        type="checkbox"
        options={[...spreadVariant]}
        withSettings={false}
      />

      <Separator />
      <SingleChoiceField title="Serving" name="extras.serving" type="radialSelect" options={[...servingVariant]} />

      <Separator />
      <SingleChoiceField title="Topping" name="extras.topping" type="squareSelect" options={[...toppingVariant]} />

      <Separator />
    </div>
  );
}

export default ExtrasForm;
