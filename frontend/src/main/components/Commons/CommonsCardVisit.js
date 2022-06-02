import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

import { useBackendMutation } from "main/utils/useBackend";

const CommonsCardVisit = ({ buttonText, buttonLink,buttonText1, commons, user}) => {

    let cId = commons.id;
    let uId = user;

    const objectToAxiosParams = ( ) => ({
        url: `/api/commons/${cId}/users/${uId}`,
        method: "DELETE",
        
    });
    
    const mutation = useBackendMutation(

        objectToAxiosParams,
        {},
        ["/api/currentUser"],
    );

    const deleteCallback = async () => {mutation.mutate() ;}

    return (
        <Card.Body style={
            // Stryker disable next-line all : don't mutation test CSS 
            { fontSize: "20px", borderTop: "1px solid lightgrey" }
        }>
            <Container>
                <Row>
                    <Col sx={4} data-testid="commonsCardVisit-id">{commons.id}</Col>
                    <Col sx={4} data-testid="commonsCardVisit-name">{commons.name}</Col>
                    {buttonText != null &&
                        <Col sm={4}>
                            <Button
                                data-testid={`commonsCardVisit-button-${buttonText}-${commons.id}`}
                                size="sm"
                                className="mx-4"
                                onClick={() => buttonLink(commons.id)} >{buttonText}


                            </Button>

                            <Button
                                data-testid={`commonsCardVisit-button-${buttonText1}-${commons.id}`}
                                size="sm"
                                className="mx-4"
                                onClick={ deleteCallback } >{buttonText1}

                            </Button>

                        </Col>
                    }
                </Row>
            </Container>
        </Card.Body>
    );
};



export default CommonsCardVisit;
