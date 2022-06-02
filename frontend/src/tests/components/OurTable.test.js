import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import OurTable, { ButtonColumn, ButtonColumnLeaderboard } from "main/components/OurTable";

describe("OurTable tests", () => {
    const threeRows = [
        {
            col1: 'Hello',
            col2: 'World',
            showLeaderboard: 'false'
        },
        {
            col1: 'react-table',
            col2: 'rocks',
            showLeaderboard: 'true',
        },
        {
            col1: 'whatever',
            col2: 'you want',
            showLeaderboard: 'true',
        }
    ];
    const clickMeCallback = jest.fn();

    const columns = [
        {
            Header: 'Column 1',
            accessor: 'col1', // accessor is the "key" in the data
        },
        {
            Header: 'Column 2',
            accessor: 'col2',
        },
        {
            Header: 'Show Leaderboard',
            accessor: 'showLeaderboard',
        },
        ButtonColumn("Click", "primary", clickMeCallback, "testId"),
        ButtonColumnLeaderboard("Click2", "primary", clickMeCallback, "testId2"),
    ];

    test("renders an empty table without crashing", () => {
        render(
            <OurTable columns={columns} data={[]} />
        );
    });

    test("renders a table with two rows without crashing", () => {
        render(
            <OurTable columns={columns} data={threeRows} />
        );
    });

    test("The button appears in the table", async () => {
        render(
            <OurTable columns={columns} data={threeRows} />
        );

        expect(await screen.findByTestId("testId-cell-row-2-col-Click-button")).toBeInTheDocument();
        const button = screen.getByTestId("testId-cell-row-2-col-Click-button");
        fireEvent.click(button);
        await waitFor(() => expect(clickMeCallback).toBeCalledTimes(1));
    });

    test("The Leaderboard button appears in the table", async () => {
        render(
            <OurTable columns={columns} data={threeRows} />
        );

        expect(await screen.findByTestId("testId2-cell-row-2-col-Click2-button")).toBeInTheDocument();
        const button = screen.getByTestId("testId2-cell-row-2-col-Click2-button");
        fireEvent.click(button);
        await waitFor(() => expect(clickMeCallback).toBeCalledTimes(1));
    });

    test("The Leaderboard button doesn't appear in the table when showLeaderboard is false", () => {
        render(
            <OurTable columns={columns} data={threeRows} />
        );

        expect(screen.queryByTestId("testId2-cell-row-0-col-Click2-button")).not.toBeInTheDocument();
    });

    test("default testid is testId", async () => {
        render(
            <OurTable columns={columns} data={threeRows} />
        );
        expect(await screen.findByTestId("testid-header-col1")).toBeInTheDocument();
    });

    test("click on a header and a sort caret should appear", async () => {
        render(
            <OurTable columns={columns} data={threeRows} testid={"sampleTestId"} />
        );

        expect(await screen.findByTestId("sampleTestId-header-col1")).toBeInTheDocument();
        const col1Header = screen.getByTestId("sampleTestId-header-col1");

        const col1SortCarets = screen.getByTestId("sampleTestId-header-col1-sort-carets");
        expect(col1SortCarets).toHaveTextContent('');

        const col1Row0 = screen.getByTestId("sampleTestId-cell-row-0-col-col1");
        expect(col1Row0).toHaveTextContent("Hello");

        fireEvent.click(col1Header);
        expect(await screen.findByText("🔼")).toBeInTheDocument();

        fireEvent.click(col1Header);
        expect(await screen.findByText("🔽")).toBeInTheDocument();
    });
});
