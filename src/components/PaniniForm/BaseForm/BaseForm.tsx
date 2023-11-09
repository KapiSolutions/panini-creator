import React from "react";
import styles from "./BaseForm.module.css";
import Separator from "../../Separator/Separator";
import SingleChoiceField from "../SingleChoiceField/SingleChoiceField";
import MultiChoiceField from "../MultiChoiceField/MultiChoiceField";
import { breadVariants } from "../../../data/bread";
import { cheeseVariants } from "../../../data/cheese";
import { meatVariants } from "../../../data/meat";
import { dressingVariants } from "../../../data/dressing";
import { vegetableVariant } from "../../../data/vegetable";

function BaseForm() {
  return (
    <div className={styles.container}>
      <h2>Configure base</h2>

      <Separator />
      <SingleChoiceField title="Bread" name="base.bread" type="carousel" options={[...breadVariants]} />

      <Separator />
      <MultiChoiceField title="Cheese" name="base.cheese" type="dropdown" options={[...cheeseVariants]} zIndex={150} />

      <Separator />
      <MultiChoiceField title="Meat" name="base.meat" type="dropdown" options={[...meatVariants]} zIndex={100} />

      <Separator />
      <MultiChoiceField title="Dressing" name="base.dressing" type="carousel" options={[...dressingVariants]} />

      <Separator />
      <MultiChoiceField
        title="Vegetables"
        name="base.vegetables"
        type="multiselect"
        options={[...vegetableVariant]}
        withSettings={false}
      />

      <Separator />
    </div>
  );
}

export default BaseForm;
