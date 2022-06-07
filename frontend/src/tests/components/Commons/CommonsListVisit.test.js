import { render, screen } from "@testing-library/react";
import CommonsListVisit from "main/components/Commons/CommonsListVisit";
import commonsFixtures from "fixtures/commonsFixtures";
import userCommonsFixtures from "fixtures/userCommonsFixtures";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";

import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

describe("CommonsListVisit tests", () => {
  const queryClient = new QueryClient();
  apiCurrentUserFixtures.userOnly.user =
    userCommonsFixtures.oneUserCommons[0].user;

  test("renders without crashing when button text is set", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CommonsListVisit
            commonList={commonsFixtures.threeCommons}
            buttonText={"Visit"}
            buttonText1={"Unjoin"}
            title="Join A Commons"
          />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const title = screen.getByTestId("commonsListVisit-title");
    expect(title).toBeInTheDocument();
    expect(typeof title.textContent).toBe("string");
    expect(title.textContent).toEqual("Join A Commons");

    const subtitle_name = screen.getByTestId("commonsListVisit-subtitle-name");
    expect(subtitle_name).toBeInTheDocument();
    expect(typeof subtitle_name.textContent).toBe("string");
    expect(subtitle_name.textContent).toEqual("Common's Name");

    const subtitle_id = screen.getByTestId("commonsListVisit-subtitle-id");
    expect(subtitle_id).toBeInTheDocument();
    expect(typeof subtitle_id.textContent).toBe("string");
    expect(subtitle_id.textContent).toEqual("ID#");

    const buttons = screen.getAllByTestId(/commonsCardVisit-button-Visit-/);
    buttons.forEach((b) => {
      expect(b).toBeInTheDocument();
      expect(typeof b.textContent).toBe("string");
      expect(b.textContent).toEqual("Visit");
    });

    const buttons1 = screen.getAllByTestId(/commonsCardVisit-button-Unjoin-/);
    buttons1.forEach((b) => {
      expect(b).toBeInTheDocument();
      expect(typeof b.textContent).toBe("string");
      expect(b.textContent).toEqual("Unjoin");
    });

    let i = 0;
    const names = screen.getAllByTestId("commonsCardVisit-name");
    names.forEach((n) => {
      expect(n).toBeInTheDocument();
      expect(typeof n.textContent).toBe("string");
      expect(n.textContent).toEqual(commonsFixtures.threeCommons[i].name);
      i++;
    });

    i = 0;
    const ids = screen.getAllByTestId("commonsCardVisit-id");
    ids.forEach((id) => {
      expect(id).toBeInTheDocument();
      expect(typeof id.textContent).toBe("string");
      expect(id.textContent).toEqual(
        commonsFixtures.threeCommons[i].id.toString()
      );
      i++;
    });
  });

  test("renders no button when button text is null", () => {
    apiCurrentUserFixtures.userOnly.user =
      userCommonsFixtures.oneUserCommons[0].user;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CommonsListVisit
            commonList={commonsFixtures.threeCommons}
            buttonText={null}
          />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const title = screen.getByTestId("commonsListVisit-title");
    expect(title).toBeInTheDocument();
    expect(typeof title.textContent).toBe("string");
    expect(title.textContent).toEqual("");

    const subtitle_name = screen.getByTestId("commonsListVisit-subtitle-name");
    expect(subtitle_name).toBeInTheDocument();
    expect(typeof subtitle_name.textContent).toBe("string");
    expect(subtitle_name.textContent).toEqual("Common's Name");

    const subtitle_id = screen.getByTestId("commonsListVisit-subtitle-id");
    expect(subtitle_id).toBeInTheDocument();
    expect(typeof subtitle_id.textContent).toBe("string");
    expect(subtitle_id.textContent).toEqual("ID#");

    expect(() => screen.getAllByTestId(/commonsCardVisit-button/)).toThrow(
      "Unable to find an element"
    );

    let i = 0;
    const names = screen.getAllByTestId("commonsCardVisit-name");
    names.forEach((n) => {
      expect(n).toBeInTheDocument();
      expect(typeof n.textContent).toBe("string");
      expect(n.textContent).toEqual(commonsFixtures.threeCommons[i].name);
      i++;
    });

    i = 0;
    const ids = screen.getAllByTestId("commonsCardVisit-id");
    ids.forEach((id) => {
      expect(id).toBeInTheDocument();
      expect(typeof id.textContent).toBe("string");
      expect(id.textContent).toEqual(
        commonsFixtures.threeCommons[i].id.toString()
      );
      i++;
    });
  });
});
