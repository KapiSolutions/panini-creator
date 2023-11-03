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
import usePaniniStore from "../../stores/usePaniniStore";

function BaseForm() {
  const { sandwichPayload } = usePaniniStore();
  return (
    <div className={styles.container}>
      <h2>Configure base</h2>

      <Separator />
      <FormItemSingleChoose
        title="Bread"
        type="carousel"
        options={breadVariants}
        defaultValue={sandwichPayload.base.bread}
      />

      <Separator />
      <FormItemMultipleChoose
        title="Cheese"
        type="dropdown"
        options={cheeseVariants}
        defaultValue={sandwichPayload.base.cheese}
      />

      <Separator />
      <FormItemMultipleChoose
        title="Meat"
        type="dropdown"
        options={meatVariants}
        defaultValue={sandwichPayload.base.meat}
        zIndex={50}
      />

      <Separator />
      <FormItemMultipleChoose
        title="Dressing"
        type="carousel"
        options={dressingVariants}
        defaultValue={sandwichPayload.base.dressing}
      />

      <Separator />
      <FormItemMultipleChoose
        title="Vegetables"
        type="multiselect"
        options={vegetableVariant}
        defaultValue={sandwichPayload.base.vegetables}
        withSettings={false}
      />

      <Separator />
    </div>
  );
}

export default BaseForm;
