import React from "react";
import { Container, CardGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CommonsOverview from "main/components/Commons/CommonsOverview";
import CommonsPlay from "main/components/Commons/CommonsPlay";
import FarmStats from "main/components/Commons/FarmStats";
import ManageCows from "main/components/Commons/ManageCows";
import Profits from "main/components/Commons/Profits";
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { useCurrentUser } from "main/utils/currentUser";
import Background from "../../assets/PlayPageBackground.png";
import LeaderboardPlayPageButton from "main/components/Commons/LeaderboardPlayPageButton";

export default function PlayPage() {

  const { commonsId } = useParams();
  const { data: currentUser } = useCurrentUser();

  
  const { data: userCommons } =
    useBackend(
      [`/api/usercommons/forcurrentuser?commonsId=${commonsId}`],
      {
        method: "GET",
        url: "/api/usercommons/forcurrentuser",
        params: {
          commonsId: commonsId
        }
      }
    );
 
  const { data: commons } =
    useBackend(
      [`/api/commons?commons_id=${commonsId}`],
      {
        method: "GET",
        url: "/api/commons",
        params: {
          id: commonsId
        }
      }
    );

  const { data: userCommonsProfits } =
    useBackend(
      [`/api/profits/all/commons?userCommonsId=${commonsId}`],
      {
        method: "GET",
        url: "/api/profits/all/commons",
        params: {
          userCommonsId: commonsId
        }
      }
    );



  const onSuccessBuy = () => {
    toast(`Cow bought!`);
  }

  const objectToAxiosParamsBuy = (newUserCommons) => ({
    url: "/api/usercommons/buy",
    method: "PUT",
    data: newUserCommons,
    params: {
      commonsId: commonsId
    }
  });


 
  const mutationbuy = useBackendMutation(
    objectToAxiosParamsBuy,
    { onSuccess: onSuccessBuy },
   
    [`/api/usercommons/forcurrentuser?commonsId=${commonsId}`]
  );
  


  const onBuy = (userCommons) => {
    mutationbuy.mutate(userCommons)
  };


  const onSuccessSell = () => {
    toast(`Cow sold!`);
  }

  
  const objectToAxiosParamsSell = (newUserCommons) => ({
    url: "/api/usercommons/sell",
    method: "PUT",
    data: newUserCommons,
    params: {
      commonsId: commonsId
    }
  });
  


 
  const mutationsell = useBackendMutation(
    objectToAxiosParamsSell,
    { onSuccess: onSuccessSell },
    [`/api/usercommons/forcurrentuser?commonsId=${commonsId}`]
  );



  const onSell = (userCommons) => {
    mutationsell.mutate(userCommons)
  };

  return (
    <div style={{ backgroundSize: 'cover', backgroundImage: `url(${Background})` }}>
      <BasicLayout >
        <Container >
          {!!currentUser && <CommonsPlay currentUser={currentUser} />}
          {!!commons && <CommonsOverview commons={commons} />}
          <br />
          {!!userCommons &&
            <CardGroup >
              <ManageCows userCommons={userCommons} commons={commons} onBuy={onBuy} onSell={onSell} />
              <FarmStats userCommons={userCommons} />
              <Profits userCommons={userCommons} profits={userCommonsProfits} />
              <LeaderboardPlayPageButton />
            </CardGroup>
          }
        </Container>
      </BasicLayout>
    </div>
  )
}