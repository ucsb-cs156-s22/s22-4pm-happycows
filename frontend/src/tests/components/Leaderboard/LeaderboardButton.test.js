import { render } from "@testing-library/react";
import LeaderboardButton from "main/components/Leaderboard/LeaderboardButton"; 

describe("LeaderboardButton tests", () => {
    test("renders without crashing", () => {
        render(
            <LeaderboardButton />
        );
    });

});