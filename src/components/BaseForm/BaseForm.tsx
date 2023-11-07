import React from "react";
import styles from "./BaseForm.module.css";
import FormItemSingleChoose from "../FormItemSingleChoose/FormItemSingleChoose";
import Separator from "../Separator/Separator";
import { breadVariants } from "../../data/bread";
import { cheeseVariants } from "../../data/cheese";
import { meatVariants } from "../../data/meat";
import { dressingVariants } from "../../data/dressing";
import { vegetableVariant } from "../../data/vegetable";
import FormItemMultipleChoose from "../FormItemMultipleChoose/FormItemMultipleChoose";

function BaseForm() {
  return (
    <div className={styles.container}>
      <h2>Configure base</h2>

      <Separator />
      <FormItemSingleChoose title="Bread" name="base.bread" type="carousel" options={breadVariants} />

      <Separator />
      <FormItemMultipleChoose title="Cheese" name="base.cheese" type="dropdown" options={cheeseVariants} />

      <Separator />
      <FormItemMultipleChoose title="Meat" name="base.meat" type="dropdown" options={meatVariants} zIndex={50} />

      <Separator />
      <FormItemMultipleChoose title="Dressing" name="base.dressing" type="carousel" options={dressingVariants} />

      <Separator />
      <FormItemMultipleChoose
        title="Vegetables"
        name="base.vegetables"
        type="multiselect"
        options={vegetableVariant}
        withSettings={false}
      />

      <Separator />
    </div>
  );
}

export default BaseForm;
