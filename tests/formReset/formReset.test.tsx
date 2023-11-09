import React from "react";
import App from "../../src/App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { config } from "../../src/config/config";
import { getFormData, objectsEqual } from "../utils/helpers";
import { defaultPanini } from "../../src/schema/paniniSchema";

describe("Test reset form", () => {
  it("Test reset form after clicking start again button", async () => {
    render(<App />);
    // Define scrollIntoView function (not implemented in jsdom). scroll used after start again click
    window.HTMLElement.prototype.scrollIntoView = function () {};

    // #1 Start panini configuration
    const startButton = screen.getByTestId("splash-screen-button");
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    await waitFor(
      () => {
        expect(startButton).not.toBeInTheDocument();
      },
      { timeout: config.animationTime }
    );
    // #2 Check if init form values are equal to default values
    const initData = await getFormData();
    expect(objectsEqual(initData, defaultPanini)).toBeTruthy();

    // #3 Get the randomize button and click it to randomly change the default form values
    const randomizeButton = screen.getByTestId("randomize-button");
    expect(randomizeButton).toBeInTheDocument();
    await userEvent.click(randomizeButton);
    const randomizedData = await getFormData();

    // #4 Comapare init data with data after randomization, should differ
    expect(objectsEqual(initData, randomizedData)).toBeFalsy();

    // #5 Get the reset button and click it to set form data to default values
    const resetButton = screen.getByTestId("reset-form");
    expect(resetButton).toBeInTheDocument();
    await userEvent.click(resetButton);
    const resetedData = await getFormData();

    // Compare data after reseting form with defaul values, should be the same
    expect(objectsEqual(resetedData, defaultPanini)).toBeTruthy();
  });
});
