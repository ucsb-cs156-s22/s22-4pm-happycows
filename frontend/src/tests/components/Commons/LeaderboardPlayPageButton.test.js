import { fireEvent, render, screen } from "@testing-library/react";
import LeaderboardPlayPage from "main/components/Commons/LeaderboardPlayPageButton";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

describe("LeaderboardPlayPage tests", () => {
  const queryClient = new QueryClient();
  test("renders without crashing", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeaderboardPlayPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  test("clicking LeaderboardButton", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeaderboardPlayPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("leaderboard-button")).toBeInTheDocument();
    const LeaderboardButton = screen.getByTestId("leaderboard-button");
    fireEvent.click(LeaderboardButton);
  });
});
