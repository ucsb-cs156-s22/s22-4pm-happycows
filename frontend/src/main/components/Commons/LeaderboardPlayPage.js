import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import leaderboardIcon from "./../../../assets/leaderboard.png"; 
import {Link} from 'react-router-dom'

// add parameters 
const Leaderboard = () =>  {
    // update cowPrice from fixture
    return (
        <Card>
        <Card.Header as="h5">Leaderboard</Card.Header>
        <Card.Body>
            {/* change $10 to info from fixture */}
            
            <Card.Title></Card.Title>
                <Row>
                    <Col>
                        <Card.Text>
                            <img alt="Leaderoard Icon" width={100} height ={100} className="icon" src={leaderboardIcon}></img>
                        </Card.Text>
                    </Col>
                    <Col>
                        <div>
                        <Link to='/leaderboard/'>
                        <Button variant="outline-danger" data-testid={"leaderboard-button"}>Board</Button>
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