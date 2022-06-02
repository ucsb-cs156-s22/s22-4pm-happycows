import React from "react";
import { Card } from "react-bootstrap";

export default function CommonsOverview({ commons }) {
  // Stryker disable all
  const dayNum = Math.ceil(
    (new Date().getTime() - new Date(commons.startingDate).getTime()) / 86400000
  );
  const endDate = new Date(commons.endingDate).toLocaleDateString();
  // Stryker enable all
  return (
    <Card data-testid="CommonsOverview">
      <Card.Header as="h5">Announcements</Card.Header>
      <Card.Body>
        <Card.Title>
          Today is day {dayNum}! This game will end on {endDate}.
        </Card.Title>
        <Card.Text>Total Players: {commons.totalPlayers}</Card.Text>
      </Card.Body>
    </Card>
  );
}
