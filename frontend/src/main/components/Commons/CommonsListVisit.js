import React from "react";
import CommonsCardVisit from "./CommonsCardVisit";
import { Card, Container, Row, Col } from "react-bootstrap";
// import CommonsCardVisit from "./CommonsCardVisit";

const CommonsListVisit = (props) => {
    return (
        <Card
            style={
                // Stryker disable next-line all: don't test CSS params
                { opacity: ".9" }
            }
            className="my-3 border-0"
        >
            <Card.Title
                data-testid="commonsList-title"
                style={
                    // Stryker disable next-line all: don't test CSS params
                    { fontSize: "35px" }
                }
                className="text-center my-3"
            >
                {props.title}
            </Card.Title>
            <Card.Subtitle>
                <Container>
                    <Row>
                        <Col data-testid="commonsList-subtitle-id" sx={4}>ID#</Col>
                        <Col data-testid="commonsList-subtitle-name" sx={4}>Common's Name</Col>
                        <Col sm={4}></Col>
                    </Row>
                </Container>
            </Card.Subtitle>
            {
                props.commonList &&
                props.commonList.map(
                    (c) => (<CommonsCardVisit key={c.id} commons={c} userId={props.userId} user={props.user} buttonText={props.buttonText} buttonLink={props.buttonLink} buttonText1={props.buttonText1} /*buttonLink1={props.buttonLink1}*//>)
                )
            }
        </Card>
    );
};

export default CommonsListVisit;