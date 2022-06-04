import { fireEvent, render, screen } from "@testing-library/react";
import LeaderboardPlayPage from "main/components/Commons/LeaderboardPlayPageButton";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import commonsFixtures from "fixtures/commonsFixtures";

describe("LeaderboardPlayPage tests", () => {
  const queryClient = new QueryClient();

  test("clicking LeaderboardButton", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LeaderboardPlayPage commons={commonsFixtures.oneCommons} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByTestId("leaderboard-button")).toBeInTheDocument();
    const LeaderboardButton = screen.getByTestId("leaderboard-button");
    fireEvent.click(LeaderboardButton);
  });
});
