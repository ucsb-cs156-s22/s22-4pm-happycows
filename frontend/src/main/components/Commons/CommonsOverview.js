import React from "react";
import { Card } from "react-bootstrap";

export default function CommonsOverview({ commons }) {
    return (
        <Card data-testid="CommonsOverview">
            <Card.Header as="h5">Announcements</Card.Header>
            <Card.Body>
                <Card.Title>Today is day 2{commons.day}! This game will end on 12/5/22{commons.endDate}.</Card.Title>
                <Card.Text>Total Players: 1{commons.totalPlayers}</Card.Text>
            </Card.Body>
        </Card>
    );
}; 