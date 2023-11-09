import { screen } from "@testing-library/react";
import type { SandwichPayload } from "../../src/types/types";

// Get form data
export const getFormData = async (): Promise<SandwichPayload> => {
  const getVegetablesValue = async () => {
    const optionsContainer = screen.getByTestId("base.vegetables");
    const options = optionsContainer?.querySelectorAll("div");
    // Get active elements and their values
    const selectedItems = Array.from(options).filter((element) => element.className.includes("active"));
    const values = selectedItems.map((element) => element.textContent);
    return values;
  };
  const getCheckBoxValue = async (name: string) => {
    const optionsContainer = screen.getByTestId(name);
    const options = optionsContainer?.querySelectorAll("[class*='checkbox']");
    // Get active elements and their values
    const selectedItems = Array.from(options).filter((element) => element.className.includes("active"));
    const values = selectedItems.map((element) => element.getAttribute("data-testvalue"));
    return values;
  };

  return {
    sandwichName: (screen.getByTestId("sandwichName") as HTMLInputElement)?.value,
    cutlery: screen.getByTestId("cutlery-checkbox")?.className.includes("active"),
    napkins: screen.getByTestId("napkins-checkbox")?.className.includes("active"),
    base: {
      bread: screen.getByTestId("base.bread")?.textContent as SandwichPayload["base"]["bread"],
      cheese: [screen.getByTestId("base.cheese")?.textContent] as SandwichPayload["base"]["cheese"],
      meat: [screen.getByTestId("base.meat")?.textContent] as SandwichPayload["base"]["meat"],
      dressing: [screen.getByTestId("base.dressing")?.textContent] as SandwichPayload["base"]["dressing"],
      vegetables: (await getVegetablesValue()) as SandwichPayload["base"]["vegetables"],
    },
    extras: {
      egg: [screen.getByTestId("extras.egg")?.textContent] as SandwichPayload["extras"]["egg"],
      spreads: (await getCheckBoxValue("extras.spreads")) as SandwichPayload["extras"]["spreads"],
      serving: (await getCheckBoxValue("extras.serving"))[0] as SandwichPayload["extras"]["serving"],
      topping: screen.getByTestId("extras.topping-checkbox")?.className.includes("active") ? "SESAME" : null,
    },
  };
};

// Compare two objects
export const objectsEqual = (obj1: Object, obj2: Object) => {
  let objectsAreTheSame = true;
  for (const key of Object.keys(obj1)) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    if (Array.isArray(val1) && Array.isArray(val2)) {
      if (!arraysEqual(val1, val2)) {
        objectsAreTheSame = false;
      }
    } else if (typeof val1 === "object" && val1 !== null && typeof val2 === "object" && val2 !== null) {
      if (!objectsEqual(val1, val2)) {
        objectsAreTheSame = false;
      }
    } else if (val1 !== val2) {
      objectsAreTheSame = false;
    }

    if (!objectsAreTheSame) {
      return false;
    }
  }
  return objectsAreTheSame;
};

// Compare two arrays
export const arraysEqual = (arr1: Array<string>, arr2: Array<string>): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};
