import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
// import CommonsTable from 'main/components/Commons/CommonsTable';
// import { useBackend } from 'main/utils/useBackend';
// import { useCurrentUser } from "main/utils/currentUser";

export default function AdminShowLeaderboardPage()
{
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Leaderboard</h1>
        {/* <CommonsTable commons={commons} currentUser={currentUser} /> */}
      </div>
    </BasicLayout>
  )
};