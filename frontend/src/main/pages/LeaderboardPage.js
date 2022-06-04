import React from 'react'
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook
// import { useParams } from "react-router-dom";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useCurrentUser } from 'main/utils/currentUser' // use prefix indicates a React Hook
import LeaderboardTable from 'main/components/Leaderboard/LeaderboardTable';

export default function LeaderboardPage() {
    const currentUser = useCurrentUser();
    // let { id } = useParams();  
    // // Stryker disable  all 
    const { data: leaderboard, error: _error, status: _status } =
    useBackend(
        [],
        {},
        []
    );
    // Stryker enable  all 
     
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Leaderboard</h1>
        <LeaderboardTable leaderboard={leaderboard} currentUser={currentUser} />
        {/* <LeaderboardTable /> */}
      </div>
    </BasicLayout>
  )
}