import React from "react";
import { Card, Button } from "react-bootstrap";

  

const LeaderboardButton = () => {
    return (
        <Card>
        <Card.Header as="h5">All Farms Stats</Card.Header>
        <Card.Body>
            <Button onClick={() => alert("The leaderboard has not been implemented yet")} data-testid={"leaderboard-button"}>See Leaderboard</Button>

        </Card.Body>
        </Card>
    );
}
export default LeaderboardButton;
