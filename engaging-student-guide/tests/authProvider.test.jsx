import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuth } from "../src/hooks/useAuth"; // Import the hook
import AuthProvider from "../src/hooks/useAuth"; // Import the provider
import { supabase } from "../src/lib/supabaseClient"; // Supabase client

// Mocking supabase client for the test
vi.mock("../src/lib/supabaseClient", () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

const TestComponent = () => {
  const { user, signOut } = useAuth();
  return (
    <div>
      <p>{user ? `Student: ${user.email}` : "No student"}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};  

describe("AuthProvider", () => {
  const mockUser = { id: "1", email: "student@test.com" };
  const mockSession = { user: mockUser };

  beforeEach(() => {
    // Mock supabase auth state change behavior
    supabase.auth.onAuthStateChange.mockImplementation((callback) => {
      callback("SIGNED_IN", mockSession);
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });
  });

  it("should provide a student when authenticated", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for student to be set
    await waitFor(() => {
      expect(screen.getByText(/Student: student@test.com/i)).toBeInTheDocument();
    });
  });

  it("should allow the student to sign out", async () => {
    // Mock the signOut response from Supabase
    supabase.auth.signOut.mockResolvedValue({ error: null });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const signOutButton = screen.getByText(/Sign Out/i);

    // Simulate a click on the Sign Out button
    signOutButton.click();

    await waitFor(() => {
      expect(screen.getByText(/No student/i)).toBeInTheDocument();
    });

    // Ensure supabase signOut was called
    expect(supabase.auth.signOut).toHaveBeenCalled();
  });
});
