import React from 'react';

import LeaderboardTable from "main/components/Leaderboard/LeaderboardTable";
import { leaderboardFixtures } from 'fixtures/leaderboardFixtures';

export default {
    title: 'components/Leaderboard/LeaderboardTable',
    component: LeaderboardTable
};

const Template = (args) => {
    return (
        <LeaderboardTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    leaderboard: []
};

export const ThreeLeaderboard = Template.bind({});

ThreeLeaderboard.args = {
    leaderboard: leaderboardFixtures.threeLeaderboard
};

