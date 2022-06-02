import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ManageCows from "main/components/Commons/ManageCows";
import userCommonsFixtures from "fixtures/userCommonsFixtures";
import commonsFixtures from "fixtures/commonsFixtures";

describe("ManageCows tests", () => {
  test("renders without crashing", () => {
    render(
      <ManageCows
        userCommons={userCommonsFixtures.oneUserCommons[0]}
        onBuy={(userCommons) => {
          console.log("onBuy called:", userCommons);
        }}
        onSell={(userCommons) => {
          console.log("onSell called:", userCommons);
        }}
      />
    );
  });

  test("sell price renders correctly", () => {
    render(
      <ManageCows
        userCommons={userCommonsFixtures.oneUserCommons[0]}
        commons={commonsFixtures.oneCommons[0]}
      />
    );

    const sellPrice = screen.getByTestId("sell-price");

    expect(sellPrice.textContent).toEqual("Current Sell Price: $14.40");
  });

  test("buying and selling a cow", async () => {
    const mockBuy = jest.fn();
    const mockSell = jest.fn();

    render(
      <ManageCows
        userCommons={userCommonsFixtures.oneUserCommons[0]}
        onBuy={mockBuy}
        onSell={mockSell}
      />
    );

    const buyButton = screen.getByTestId("buy-cow-button");
    const sellButton = screen.getByTestId("sell-cow-button");

    fireEvent.click(buyButton);
    await waitFor(() => expect(mockBuy).toHaveBeenCalled());

    fireEvent.click(sellButton);
    await waitFor(() => expect(mockSell).toHaveBeenCalled());
  });
});
