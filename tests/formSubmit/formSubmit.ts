import { expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { SandwichPayload } from "../../src/types/types";

export const carouselChangeValue = async (name: string) => {
  const element = screen.getByTestId(`${name}`);
  const arrowAction = screen.getByTestId(`${name}-arrow`);
  const valueBefore = element.textContent;
  expect(valueBefore).not.toEqual("");

  await userEvent.click(arrowAction);
  const valueAfter = element.textContent;
  expect(valueAfter).not.toEqual("");
  expect(valueBefore).not.toBe(valueAfter);
};

export const dropdownChangeValue = async (name: string) => {
  const element = screen.getByTestId(`${name}`);
  const valueBefore = element.textContent;
  expect(valueBefore).not.toEqual("");
  await userEvent.click(element);

  const dropDownItem = screen.getByTestId(`${name}-0`);
  await userEvent.click(dropDownItem);
  const valueAfter = element.textContent;
  expect(valueAfter).not.toEqual("");
  expect(valueBefore).not.toBe(valueAfter);
};

export const multiselectChangeValue = async (name: string, selector: string) => {
  // #1 Get all options within options container
  const optionsContainer = screen.getByTestId(name);
  const options = optionsContainer.querySelectorAll(selector);
  expect(Array.from(options).length).toBeGreaterThan(0);

  // #2 Check how many options are selected(Should be 0. Selected options have class name: active)
  const selectedBefore = Array.from(options).filter((element) => element.className.includes("active"));
  expect(selectedBefore.length).toBe(0);

  // #3 Get random index within available options array and select option with that index
  const randomIndex = Math.floor(Math.random() * Array.from(options).length);
  await userEvent.click(Array.from(options)[randomIndex]);

  // 4# Check if there is selected option (class "active" added)
  const selectedAfter = Array.from(options).filter((element) => element.className.includes("active"));

  expect(selectedAfter.length).toBe(1);
};

export const radialSelectChangeValue = async (name: string) => {
  // #1 Get all options within options container
  const optionsContainer = screen.getByTestId(name);
  const options = optionsContainer.querySelectorAll("[class*='checkbox']");
  expect(Array.from(options).length).toBeGreaterThan(0);

  // #2 Check how many options are selected(Should be 1. Selected options have class name: active)
  const selectedBefore = Array.from(options).filter((element) => element.className.includes("active"));
  expect(selectedBefore.length).toBe(1);

  // #3 Default selected is option with index 1("WARM"), select option with index 0
  await userEvent.click(Array.from(options)[0]);

  // 4# Check if there is selected option (class "active" added), should be only one selected option
  const selectedAfter = Array.from(options).filter((element) => element.className.includes("active"));
  expect(selectedAfter.length).toBe(1);

  // 5# After selecting option the actual state should vary from default state
  expect(selectedBefore[0].getAttribute("data-testid")).not.toBe(selectedAfter[0].getAttribute("data-testid"));
};

export const singleCheckboxChangeValue = async (name: string) => {
  const element = screen.getByTestId(`${name}-checkbox`);
  const valueBefore = element.className.includes("active");
  expect(valueBefore).toBe(false);

  await userEvent.click(element);
  const valueAfter = element.className.includes("active");
  expect(valueAfter).toBe(true);
};

export const textChangeValue = async (name: string) => {
  const element = screen.getByTestId(`${name}`) as HTMLInputElement;
  const valueBefore = element.value;
  expect(valueBefore).toBe("");

  await userEvent.click(element);
  const testText = "Test Panini Name";
  await userEvent.keyboard(testText);

  const valueAfter = element.value;
  expect(valueAfter).toBe(testText);
};

export const changeFormData = async () => {
  await carouselChangeValue("base.bread");
  await dropdownChangeValue("base.cheese");
  await dropdownChangeValue("base.meat");
  await carouselChangeValue("base.dressing");
  await multiselectChangeValue("base.vegetables", "div");
  await dropdownChangeValue("extras.egg");
  await multiselectChangeValue("extras.spreads", "[class*='checkbox']");
  await radialSelectChangeValue("extras.serving");
  await singleCheckboxChangeValue("extras.topping");
  await textChangeValue("sandwichName");
  await singleCheckboxChangeValue("cutlery");
  await singleCheckboxChangeValue("napkins");
};

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
