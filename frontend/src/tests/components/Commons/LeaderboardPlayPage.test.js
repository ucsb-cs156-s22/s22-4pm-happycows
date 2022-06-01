import { fireEvent, render, screen } from "@testing-library/react";
import Leaderboard from "main/components/LeaderboardPlayPage"; 

describe("Leaderboard tests", () => {
    test("renders without crashing", () => {
        render(
            <Leaderboard />
        );
    });

    test("clicking Leaderboard", async () => {
        render(
            <Leaderboard/>
        );

        const Leaderboard = screen.getByTestId("leaderboard-button");
        const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
        fireEvent.click(Leaderboard);
        expect(alertMock).toHaveBeenCalledTimes(1);

    });

}); 