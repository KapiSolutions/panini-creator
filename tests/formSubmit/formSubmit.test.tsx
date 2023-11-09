import React from "react";
import App from "../../src/App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, it, expect, vi } from "vitest";
import { config } from "../../src/config/config";
import { changeFormData, getFormData } from "./formSubmit";
import { APIRequest } from "../utils/api";
import { schema } from "../../src/schema/paniniSchema";
import createFetchMock from "vitest-fetch-mock";

const fetchMock = createFetchMock(vi);

describe("Test form submitting", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.enableMocks();
  });

  it("Start panini configuration and change default values of each form element ", async () => {
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
    // Change value of each form element
    await changeFormData();
  });

  it("Return imageURL mock of form payload when form validation passes", async () => {
    render(<App />);
    // Change values of form fields
    await changeFormData();

    // Click on place order button
    const postButton = screen.getByTestId("place-order");
    await userEvent.click(postButton);
    expect(postButton.textContent).toBe("Processing...");

    // Get form data and validate them
    const formData = await getFormData();
    schema.parse(formData); //throws error if validation fails

    // If validation passes mock response and imitate request
    fetchMock.mockResponseOnce(JSON.stringify({ data: { imageUrl: "someUrl" } }));
    const res = await APIRequest(formData);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(res.data.imageUrl).toEqual("someUrl");
  });

  it(
    "Redirect to Success screen when Place order button is clicked",
    async () => {
      render(<App />);
      const postButton = screen.getByTestId("place-order");
      await userEvent.click(postButton);
      expect(postButton.textContent).toBe("Processing...");

      // After clicking Place order button the following steps are performed:
      // #1 Form validation
      // #2 Api request
      // #3 Opening success screen when api request is completed
      await waitFor(
        () => {
          expect(screen.getByText("Panini ordered")).toBeInTheDocument();
        },
        { timeout: 12000 } //normally api request is done in ~8000ms
      );
    },
    { timeout: 13000 }
  );
});
