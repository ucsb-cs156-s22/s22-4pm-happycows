import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import leaderboardIcon from "./../../../assets/leaderboard.png"; 
import {Link} from 'react-router-dom'

const Leaderboard = () =>  {
    
    return (
        <Card>
        <Card.Header as="h5">Leaderboard</Card.Header>
        <Card.Body>
            {}
            
            <Card.Title></Card.Title>
                <Row>
                    <Col>
                        <Card.Text>
                            <img alt="Leaderoard Icon" width={100} height={100} className="icon" src={leaderboardIcon}></img>
                        </Card.Text>
                    </Col>
                    <Col>
                        <div>
                        <Link to='/leaderboard/'>
                        <Button data-testid={"leaderboard-playpage-button"}>Board</Button>
                        </Link>
                        </div>
                    </Col>
                </Row>
                    Click to view leaderboard 
        </Card.Body>
        </Card>
    ); 

}; 

export default Leaderboard; 