// test for the contextRecentActivity
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RecentActivityContextProvider, {
  RecentContext,
} from "../src/context/contextRecentActivity";
import React from "react";

// Test component to consume the context
function TestComponent() {
  const { recentContent, contentType } = RecentContext();

  return (
    <div>
      <span data-testid="recent-content">{recentContent}</span>
      <span data-testid="content-type">{contentType}</span>
    </div>
  );
}

describe("RecentActivityContextProvider", () => {
  it("provides the initial state with recentContent as null and contentType as 'pdf'", () => {
    // Render the provider with the test component inside
    render(
      <RecentActivityContextProvider>
        <TestComponent />
      </RecentActivityContextProvider>
    );

    // Assert the initial state values
    const recentContent = screen.getByTestId("recent-content");
    const contentType = screen.getByTestId("content-type");

    // recentContent should be null initially
    expect(recentContent.textContent).toBe("");
    // contentType should be "pdf" initially
    expect(contentType.textContent).toBe("pdf");
  });
});
