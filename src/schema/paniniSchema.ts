import * as z from "zod";
import { breadVariants } from "../data/bread";
import { cheeseVariants } from "../data/cheese";
import { meatVariants } from "../data/meat";
import { dressingVariants } from "../data/dressing";
import { vegetableVariant } from "../data/vegetable";
import { eggVariants } from "../data/egg";
import { spreadVariant } from "../data/spread";
import { servingVariant } from "../data/serving";
import { toppingVariant } from "../data/topping";
import type { SandwichPayload } from "../types/types";

export const defaultPanini: SandwichPayload = {
  sandwichName: "",
  cutlery: false,
  napkins: false,
  base: {
    bread: "FULL GRAIN",
    cheese: ["EDAM"],
    meat: ["SALAMI"],
    dressing: ["OLIVE OIL"],
    vegetables: [],
  },
  extras: {
    egg: ["FRIED EGG"],
    spreads: [],
    serving: "WARM",
    topping: null,
  },
};

export const schema = z.object({
  sandwichName: z.string().max(35, "Name is too long. Max 35 characters."),
  cutlery: z.boolean(),
  napkins: z.boolean(),
  base: z.object({
    bread: z.enum(breadVariants),
    cheese: z.array(z.enum(cheeseVariants)),
    meat: z.array(z.enum(meatVariants)),
    dressing: z.array(z.enum(dressingVariants)),
    vegetables: z.array(z.enum(vegetableVariant)),
  }),
  extras: z.object({
    egg: z.array(z.enum(eggVariants)),
    spreads: z.array(z.enum(spreadVariant)),
    serving: z.enum(servingVariant),
    topping: z.union([z.enum(toppingVariant), z.null()]),
  }),
});
