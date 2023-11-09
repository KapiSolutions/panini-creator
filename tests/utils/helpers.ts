import { screen } from "@testing-library/react";
import type { SandwichPayload } from "../../src/types/types";

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
