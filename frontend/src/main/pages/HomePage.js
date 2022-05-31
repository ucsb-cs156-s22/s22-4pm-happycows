import { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CommonsList from "main/components/Commons/CommonsList";
import CommonsListVisit from "main/components/Commons/CommonsListVisit";

import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { useCurrentUser } from "main/utils/currentUser";
import Background from './../../assets/HomePageBackground.jpg';

export default function HomePage() {
  // Stryker disable next-line all
  const [commonsJoined, setCommonsJoined] = useState([]);
  const { data: currentUser } = useCurrentUser();
  // Stryker disable all 

  const { data: commons } =
    useBackend(
      ["/api/commons/all"],
      { url: "/api/commons/all" },
      []
    );
  // Stryker enable all 

  const objectToAxiosParams = (newCommonsId) => ({
    url: "/api/commons/join",
    method: "POST",
    params: {
      commonsId: newCommonsId
    }
  });

  const mutation = useBackendMutation(
    objectToAxiosParams,
    {},
    // Stryker disable next-line all : hard to set up test for caching
    ["/api/currentUser"]
  );

  useEffect(
    () => {
      if (currentUser?.root?.user?.commons) {
        setCommonsJoined(currentUser.root.user.commons);
      }
    }, [currentUser]
  );

  let navigate = useNavigate();
  const visitButtonClick = (id) => { navigate("/play/" + id) };


  //param: user and commons IDs
  //use backend API route to unjoin the commons for the user
  //TODO: only allow the user to unjoin under certain conditions
  const unjoinButtonClick = (commonsId, userId) => {/* TODO: call delete commons for the user */ console.log("unjoin called for " + commonsId+ " "+ userId) };

  return (
    <div style={{ backgroundSize: 'cover', backgroundImage: `url(${Background})` }}>
      <BasicLayout>
        <h1 data-testid="homePage-title" style={{ fontSize: "75px", borderRadius: "7px", backgroundColor: "white", opacity: ".9" }} className="text-center border-0 my-3">Howdy Farmer</h1>
        <Container>
          <Row>
            <Col sm><CommonsListVisit user={currentUser} commonList={commonsJoined} title="Visit A Commons" buttonText={"Visit"} buttonLink={visitButtonClick} buttonText1={"Unjoin"} buttonLink1={unjoinButtonClick} /></Col>
            <Col sm><CommonsList commonList={commons} title="Join A Commons" buttonText={"Join"} buttonLink={mutation.mutate} /></Col>
          </Row>
        </Container>
      </BasicLayout>
    </div>
  )
}
