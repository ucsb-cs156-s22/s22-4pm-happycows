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

    test("clicking LeaderboardPlayPage", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LeaderboardPlayPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(await screen.findByText("Board")).toBeInTheDocument();
        const PlayPageMenu = screen.getByTestId("leaderboard-playpage-button");
        expect(PlayPageMenu).toBeInTheDocument();

    });

}); 