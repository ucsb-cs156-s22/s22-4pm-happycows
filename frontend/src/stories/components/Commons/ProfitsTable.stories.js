// import { Meta, Story, Canvas } from "@storybook/addon-docs/blocks";
// import { action } from "@storybook/addon-actions";
// import ProfitsTable from "main/components/Commons/ProfitsTable";
// import userCommonsFixtures from "fixtures/userCommonsFixtures"; 

// <Meta
//   title="components/Commons/ProfitsTable"
//   component={ProfitsTable}
// />

// # Profits

// For a particular user's commons, profits earned from milking cows every day. 

// <Canvas>
//   <Story name="emptytable">
//     <ProfitsTable profits={[]} />
//   </Story>
//   <Story name="bad-input">
//     <ProfitsTable profits={["stryker-was-here"]} />
//   </Story>
// </Canvas>

import React from 'react';

import { ProfitsTable } from "main/components/Commons/ProfitsTable";
import profitsFixtures from 'fixtures/profitsFixtures';

export default {
    title: 'components/Commons/ProfitsTable',
    component: ProfitsTable
};

const Template = (args) => {
    return (
        <ProfitsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    profits: []
};

export const ThreeProfits = Template.bind({});

ThreeProfits.args = {
    profits: profitsFixtures.threeProfits
};

