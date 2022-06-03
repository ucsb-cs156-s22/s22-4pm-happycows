import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import Background from './../../assets/HomePageBackground.jpg';

const LoginCard = () => {
  return (
    <Card style={
      // Stryker disable next-line all : no need to unit test CSS
      { width: '18rem' }
    }>
      <Card.Body>
        <Card.Title data-testid="loginPage-cardTitle">Welcome to Happier Cows!</Card.Title>
        <Card.Text>
          In order to start playing, please login.
        </Card.Text>
        <Button href="/oauth2/authorization/google" variant="primary">Log In</Button>
      </Card.Body>
    </Card>
  )
}

export default function LoginPage() {
 //  Stryker disable all

  return (
    <div  style={
      // Stryker disable next-line all : no need to unit test CSS
      { backgroundSize: 'cover', backgroundImage: `url(${Background})` }}>
      <BasicLayout>
        <Container style={
          // Stryker disable next-line all : no need to unit test CSS
          { marginTop: "8%" }}>
          <Row style={
            // Stryker disable next-line all : no need to unit test CSS
            { alignItems: "center", justifyContent: "center" }}>
            <Col sm="auto"><LoginCard /></Col>
            {/* <Col sm="5"><CommonsList title="Available Commons" commonList={listCommons} buttonText={null} buttonLink={null} /></Col> */}
          </Row>
        </Container>
      </BasicLayout>
    </div>
  )
}
