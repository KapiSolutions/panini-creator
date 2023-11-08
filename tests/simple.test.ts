import * as React from "react";
import App from "../src/App";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Simple working test", () => {
  it("Dummy test, one should be one", () => {
    expect(1).toBe(1);
  });
});
