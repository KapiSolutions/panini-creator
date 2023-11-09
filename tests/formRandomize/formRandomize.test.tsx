import React from "react";
import App from "../../src/App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { getFormData, objectsEqual, startPaniniConfiguration } from "../utils/helpers";

describe("Test panini randomization", () => {
  it("Test panini randomization", async () => {
    render(<App />);
    // #1 Start panini configuration
    await startPaniniConfiguration();

    // #2 Get the randomize button
    const randomizeButton = screen.getByTestId("randomize-button");
    expect(randomizeButton).toBeInTheDocument();

    // #3 Get current form data and click on the randomize button
    const dataBefore = await getFormData();
    await userEvent.click(randomizeButton);

    // #4 Get data after randomization
    const dataAfter = await getFormData();

    // #5 Compare data before and after, should differ
    expect(objectsEqual(dataBefore, dataAfter)).toBeFalsy();
  });
});
