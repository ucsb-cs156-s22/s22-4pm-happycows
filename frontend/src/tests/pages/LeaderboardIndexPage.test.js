import { _fireEvent, render, screen, waitFor } from "@testing-library/react";
import mockConsole from "jest-mock-console";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import LeaderboardIndexPage from "main/pages/LeaderboardIndexPage";
import { leaderboardFixtures }from "fixtures/leaderboardFixtures";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("LeaderboardIndexPage tests", () => {
    const axiosMock = new AxiosMockAdapter(axios);

    const testId = "LeaderboardTable";

    const setupUserOnly = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    const setupAdminUser = () => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.adminUser);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    };

    test("renders without crashing for regular user", () => {
        setupUserOnly();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/leaderboard/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LeaderboardIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders without crashing for admin user", () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/leaderboard/all").reply(200, []);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LeaderboardIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("renders three leaderboard without crashing for admin user", async () => {
        setupAdminUser();
        const queryClient = new QueryClient();
        axiosMock.onGet("/api/leaderboard/all").reply(200, leaderboardFixtures.threeLeaderboard);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LeaderboardIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => {expect(screen.getByTestId(`${testId}-cell-row-1-col-commonsid`)).toHaveTextContent("1")});
        expect(await screen.findByTestId(`${testId}-cell-row-0-col-playerName`)).toHaveTextContent("Skylar");
        expect(screen.getByTestId(`${testId}-cell-row-1-col-commonsid`)).toHaveTextContent("1");
        expect(screen.getByTestId(`${testId}-cell-row-2-col-commonsid`)).toHaveTextContent("1");
    });

    test("renders empty table when backend unavailable, user only", async () => {
        setupUserOnly();

        const queryClient = new QueryClient();
        axiosMock.onGet("/api/leaderboard/all").timeout();

        const restoreConsole = mockConsole();

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LeaderboardIndexPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => { expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1); });
        restoreConsole();

        expect(screen.queryByTestId(`${testId}-cell-row-0-col-id`)).not.toBeInTheDocument();
    });

});
