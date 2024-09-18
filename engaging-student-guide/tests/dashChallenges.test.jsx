//Dash Challenges Test

import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useState, useEffect } from "react";

import { useAuth } from "../src/hooks/useAuth"; // Import the hook

//import DashChallenges from "../src/components/DashChallenges"; // Import the provider
import { supabase } from "../src/lib/supabaseClient"; // Supabase client

// Mock useAuth hook to return a mock user
vi.mock("../src/hooks/useAuth", () => ({
  useAuth: () => ({
    user: { id: 1 }, // mock user object
  }),
}));

// Mock Supabase functions
vi.mock("../src/lib/supabaseClient", () => ({
  supabase: {
    rpc: vi.fn(),
    from: vi.fn(() => ({
      select: vi.fn(),
    })),
  },
}));

const TestComponent = () => {
  const [challenges, setChallenges] = useState([]);
  const [challengesStarted, setChallengesStarted] = useState([]);

  useEffect(() => {
    async function fetchChallenges() {
      const { data, error } = await supabase.rpc("get_challenges");

      if (error) {
        console.log("Error fetching challenges: ", error);
      } else {
        setChallenges(data);
      }
    }

    fetchChallenges();
  }, []);

  return (
    <div>
      <p>Challenges fetched: {challenges.length}</p>
      <p>Challenges started: {challengesStarted.length}</p>
    </div>
  );
};

describe("DashChallenges", () => {
  it("fetches challenges and checks if challenges have started on mount", async () => {
    // Mock Supabase RPC and from functions to return expected data
    supabase.rpc.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          description: "Challenge 1",
          noParticipants: 10,
          date_end: "2024-09-30",
        },
      ],
      error: null,
    });

    supabase.from.mockReturnValue({
      select: vi.fn().mockResolvedValueOnce({
        data: [{ challenge_id: 1, status: "in progress" }],
        error: null,
      }),
    });

    // Render the component
    render(<TestComponent />);

    // Wait for the component to update after data is fetched
    await waitFor(() => {
      // Check that the challenges are displayed
      expect(screen.getByText("Challenge 1")).toBeInTheDocument();
      expect(screen.getByText("Participants: 10")).toBeInTheDocument();
      expect(screen.getByText("Closing Date: 2024-09-30")).toBeInTheDocument();

      // Check if "Started" label is rendered for the challenge
      expect(screen.getByText("Started")).toBeInTheDocument();
    });
  });

  it("displays an error if fetching challenges fails", async () => {
    // Mock an error response from Supabase
    supabase.rpc.mockResolvedValueOnce({
      data: null,
      error: new Error("Failed to fetch challenges"),
    });

    supabase.from.mockReturnValue({
      select: vi.fn().mockResolvedValueOnce({
        data: [],
        error: new Error("Failed to check if challenge started"),
      }),
    });

    // Render the component
    render(<TestComponent />);

    // Wait for the component to update after data is fetched
    await waitFor(() => {
      // Check that no challenges are displayed
      expect(
        screen.getByText("No open challenges at the moment. 🏖️")
      ).toBeInTheDocument();
    });
  });
});
