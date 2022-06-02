import React from "react";

import AppNavbar from "main/components/Nav/AppNavbar";
import { currentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

export default {
  title: "layouts/BasicLayout/AppNavbar",
  component: AppNavbar,
};

const Template = (args) => <AppNavbar {...args} />;

export const notLoggedIn = Template.bind({});

export const loggedInAdminUser = Template.bind({});
loggedInAdminUser.args = {
  currentUser: currentUserFixtures.adminUser,
};

export const loggedInRegularUser = Template.bind({});
loggedInRegularUser.args = {
  currentUser: currentUserFixtures.userOnly,
};

export const neitherH2NorSwagger = Template.bind({});
neitherH2NorSwagger.args = {
  currentUser: currentUserFixtures.userOnly,
  systemInfo: systemInfoFixtures.showingNeither,
};

export const H2Only = Template.bind({});
H2Only.args = {
  currentUser: currentUserFixtures.userOnly,
  systemInfo: {
    springH2ConsoleEnabled: true,
    showSwaggerUILink: false,
  },
};

export const SwaggerOnly = Template.bind({});
SwaggerOnly.args = {
  currentUser: currentUserFixtures.userOnly,
  systemInfo: {
    springH2ConsoleEnabled: false,
    showSwaggerUILink: true,
  },
};

export const bothH2AndSwagger = Template.bind({});
bothH2AndSwagger.args = {
  currentUser: currentUserFixtures.userOnly,
  systemInfo: systemInfoFixtures.showingBoth,
};

export const localhost_3000 = Template.bind({});
localhost_3000.args = {
  currentUrl: "http://localhost:3000",
};

export const localhost_127_0_0_1_3000 = Template.bind({});
localhost_127_0_0_1_3000.args = {
  currentUrl: "http://127.0.0.1:3000",
};

export const localhost_8080 = Template.bind({});
localhost_8080.args = {
  currentUrl: "http://localhost:8080",
};
