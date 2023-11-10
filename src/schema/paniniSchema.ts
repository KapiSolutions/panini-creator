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

export const randomPanini = (): SandwichPayload => {
  const randomElementArray = (arr: Array<string>, multipleItems = false) => {
    if (multipleItems) {
      const randomLength = Math.floor(Math.random() * arr.length) + 1; // Random number of elements between 1 and length of arr
      const shuffledArray = arr.slice().sort(() => Math.random() - 0.5); // Shuffled copy of the input array
      return shuffledArray.slice(0, randomLength);
    } else {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    }
  };
  const randomPaniniNames = [
    "Mouthwatering Melt",
    "Savory Stack",
    "Cheesy Delight",
    "Grilled Goodness",
    "Tasty Tower",
    "Panini Paradise",
    "Crispy Creation",
    "Flavorful Feast",
    "Gourmet Griller",
    "Hearty Heaven",
  ];
  return {
    sandwichName: randomElementArray(randomPaniniNames) as string,
    cutlery: Math.random() < 0.5,
    napkins: Math.random() < 0.5,
    base: {
      bread: randomElementArray([...breadVariants]) as SandwichPayload["base"]["bread"],
      cheese: randomElementArray([...cheeseVariants], true) as SandwichPayload["base"]["cheese"],
      meat: randomElementArray([...meatVariants], true) as SandwichPayload["base"]["meat"],
      dressing: randomElementArray([...dressingVariants], true) as SandwichPayload["base"]["dressing"],
      vegetables: randomElementArray([...vegetableVariant], true) as SandwichPayload["base"]["vegetables"],
    },
    extras: {
      egg: randomElementArray([...eggVariants], true) as SandwichPayload["extras"]["egg"],
      spreads: [randomElementArray([...spreadVariant])] as SandwichPayload["extras"]["spreads"],
      serving: randomElementArray([...servingVariant]) as SandwichPayload["extras"]["serving"],
      topping: Math.random() < 0.5 ? "SESAME" : null,
    },
  };
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
