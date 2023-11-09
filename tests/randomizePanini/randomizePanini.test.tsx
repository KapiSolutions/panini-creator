import React from "react";
import App from "../../src/App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { config } from "../../src/config/config";
import { getFormData, objectsEqual } from "../utils/helpers";

describe("Test panini randomization", () => {
  it("Test panini randomization", async () => {
    render(<App />);
    // Start panini configuration
    const startButton = screen.getByTestId("splash-screen-button");
    expect(startButton).toBeInTheDocument();
    await userEvent.click(startButton);
    await waitFor(
      () => {
        expect(startButton).not.toBeInTheDocument();
      },
      { timeout: config.animationTime }
    );

    // Get the randomize button
    const randomizeButton = screen.getByTestId("randomize-button");
    expect(randomizeButton).toBeInTheDocument();
    // Get current form data and click on the randomize button
    const dataBefore = await getFormData();
    await userEvent.click(randomizeButton);
    // Get data after randomization
    const dataAfter = await getFormData();
    // Compare data before and after, should differ
    expect(objectsEqual(dataBefore, dataAfter)).toBeFalsy();
  });
});

