// __tests__/DashRecentActivity.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RecentContext } from "../src/context/contextRecentActivity";
import DashRecentActivity from "../src/components/DashRecentActivity";

const TestDashRecentActivity = () => {
  const { recentContent, contentType } = RecentContext();

  return (
    <section className="recent-activity">
      <h4>Recent Activity</h4>
      {!recentContent || !contentType ? (
        <div>No recent activity</div>
      ) : (
        <div>Content is available</div>
      )}
    </section>
  );
};

// Helper function to render component with mock context
const renderWithContext = (contextValue) => {
  return render(
    <RecentContext.Provider value={contextValue}>
      <DashRecentActivity />
    </RecentContext.Provider>
  );
};

describe("DashRecentActivity", () => {
  it('displays "No recent activity" when recentContent or contentType is missing', () => {
    renderWithContext({ recentContent: null, contentType: null });
    expect(screen.getByText("No recent activity")).toBeInTheDocument();
  });

  /*  it('displays audio player when contentType is "audio"', () => {
    const mockContent = {
      id: "1",
      title: "Sample Audio",
      audio_url: "http://example.com/audio.wav",
    };

    renderWithContext({ recentContent: mockContent, contentType: "audio" });

    expect(screen.getByText("Sample Audio")).toHaveAttribute(
      "href",
      "/content/1"
    );
    expect(screen.getByRole("audio")).toBeInTheDocument();
  }); */

  /* it('displays "Continue reading" message when contentType is not "audio"', () => {
    const mockContent = {
      id: "2",
      title: "Sample Reading",
    };

    renderWithContext({ recentContent: mockContent, contentType: "pdf" });

    expect(screen.getByText("Continue reading")).toBeInTheDocument();
    expect(screen.getByText("Sample Reading")).toBeInTheDocument();
  }); */

  /* it("includes a link to the content page", () => {
    const mockContent = {
      id: "3",
      title: "Sample Link",
    };

    renderWithContext({ recentContent: mockContent, contentType: "pdf" });

    expect(screen.getByText("Continue on Content Page")).toHaveAttribute(
      "href",
      "/content/3"
    );
  }); */
});
