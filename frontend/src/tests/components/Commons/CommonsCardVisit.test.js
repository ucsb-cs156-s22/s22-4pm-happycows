import { fireEvent, render, screen } from "@testing-library/react";
import CommonsCardVisit from "main/components/Commons/CommonsCardVisit";
import commonsFixtures from "fixtures/commonsFixtures";

import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import HomePage from "main/pages/HomePage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import userCommonsFixtures from "fixtures/userCommonsFixtures";

describe("CommonsCardVisit tests", () => {
  const queryClient = new QueryClient();
  const axiosMock = new AxiosMockAdapter(axios);

  beforeEach(() => {
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
  });

  test("renders without crashing when button text is set", async () => {
    apiCurrentUserFixtures.userOnly.user.root =
      userCommonsFixtures.oneUserCommons[0];
    const click = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CommonsCardVisit
            commons={commonsFixtures.threeCommons[0]}
            buttonText={"Join"}
            user={apiCurrentUserFixtures.userOnly.user}
            buttonLink={click}
            buttonText1={"Unjoin"}
          />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const button = screen.getByTestId("commonsCardVisit-button-Join-5");
    expect(button).toBeInTheDocument();
    expect(typeof button.textContent).toBe("string");
    expect(button.textContent).toEqual("Join");
    fireEvent.click(button);
    expect(click).toBeCalledTimes(1);

    const button1 = screen.getByTestId("commonsCardVisit-button-Unjoin-5");
    expect(button1).toBeInTheDocument();
    expect(typeof button1.textContent).toBe("string");
    expect(button1.textContent).toEqual("Unjoin");
    // fireEvent.click(button1);
    // expect(click).toBeCalledTimes(1);

    const name = screen.getByTestId("commonsCardVisit-name");
    expect(name).toBeInTheDocument();
    expect(typeof name.textContent).toBe("string");
    expect(name.textContent).toEqual("Seths Common");

    const id = screen.getByTestId("commonsCardVisit-id");
    expect(id).toBeInTheDocument();
    expect(typeof id.textContent).toBe("string");
    expect(id.textContent).toEqual("5");
  });

  test("Calls the callback when you click unjoin", async () => {
    apiCurrentUserFixtures.userOnly.user.commons = commonsFixtures.oneCommons;
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock
      .onGet("/api/commons/all")
      .reply(200, commonsFixtures.threeCommons);
    axiosMock
      .onPost("/api/commons/join")
      .reply(200, commonsFixtures.threeCommons[0]);
    axiosMock
      .onDelete("/api/commons/1/users/1")
      .reply(200, commonsFixtures.threeCommons[0]);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(
      await screen.findByTestId("commonsCardVisit-button-Unjoin-1")
    ).toBeInTheDocument();
    const unjoinButton = screen.getByTestId("commonsCardVisit-button-Unjoin-1");
    fireEvent.click(unjoinButton);
  });
});
