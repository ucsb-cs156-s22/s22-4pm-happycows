import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import leaderboardIcon from "./../../../assets/leaderboard.png";
import { Link } from "react-router-dom";

const Leaderboard = ({ commons }) => {
  return (
    <Card>
      <Card.Header as="h5">Leaderboard</Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>
        <Row>
          <Col>
            <Card.Text>
              <img
                alt="Leaderboard Icon"
                width={100}
                height={100}
                className="icon"
                src={leaderboardIcon}
              ></img>
            </Card.Text>
          </Col>
          <Col>
            <div>
              <Link to={"/play/leaderboard/" + commons.id}>
                <Button data-testid={"leaderboard-button"}>Show</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Leaderboard;
