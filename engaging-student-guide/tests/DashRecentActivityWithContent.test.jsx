// __tests__/DashRecentActivityWithContent.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RecentActivityContextProvider from "../src/context/contextRecentActivity";
import DashRecentActivity from "../src/components/DashRecentActivity";
import { MemoryRouter } from "react-router-dom";
import React from "react";

describe("DashRecentActivity Component", () => {
  it("renders with content (i.e., contains text)", () => {
    // Render the DashRecentActivity component with context and router
    render(
      <RecentActivityContextProvider>
        <MemoryRouter>
          <DashRecentActivity />
        </MemoryRouter>
      </RecentActivityContextProvider>
    );

    // Assert that there is at least some text content in the document
    const body = document.body.textContent;

    // Log the text content for debugging
    console.log("Rendered body text:", body);

    expect(body.trim()).not.toBe(""); // Ensure the body contains some text
  });
});
