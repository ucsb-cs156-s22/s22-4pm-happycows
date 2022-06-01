import { fireEvent, render, screen } from "@testing-library/react";
import LeaderboardButton from "main/components/Leaderboard/LeaderboardButton"; 

describe("LeaderboardButton tests", () => {
    test("renders without crashing", () => {
        render(
            <LeaderboardButton />
        );
    });

    test("clicking LeaderboardButton", async () => {
        render(
            <LeaderboardButton />
        );

        const leaderboardButton = screen.getByTestId("leaderboard-button");
        const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
        fireEvent.click(leaderboardButton);
        expect(alertMock).toHaveBeenCalledTimes(1);

    });

});