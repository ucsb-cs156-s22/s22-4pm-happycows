import React from 'react'
import { useBackend } from 'main/utils/useBackend'; // use prefix indicates a React Hook
import { useParams } from "react-router-dom";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useCurrentUser } from 'main/utils/currentUser' // use prefix indicates a React Hook
import LeaderboardTable from 'main/components/Leaderboard/LeaderboardTable';

export default function LeaderboardIndexPage() {
  const currentUser = useCurrentUser();
    let { id } = useParams();  
  const { data: leaderboard, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/leaderboard?id=${id}`],
            // Stryker disable next-line StringLiteral,ObjectLiteral : since "GET" is default, "" is an equivalent mutation
            { method: "GET", url: `/api/leaderboard`, params: {id} },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Leaderboard</h1>
        {/* {commons && <h1>{commons.className} Leaderboard</h1>} */}
        <LeaderboardTable leaderboard={leaderboard} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}