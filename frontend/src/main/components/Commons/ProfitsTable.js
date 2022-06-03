import React from "react";
import OurTable from "main/components/OurTable";

export default function ProfitsTable({ profits }) {
    //Not sure why this code doesn't work 
    // const columns = [
    //     {
    //         Header: "Profit",
    //         accessor: "profit",
    //     },
    //     {
    //         Header: "Date",
    //         accessor: "date",
    //     }
    // ];
    // const memoizedColumns = React.useMemo(() => columns, [columns]);

    // Stryker disable ArrayDeclaration : [columns] and [students] are performance optimization; mutation preserves correctness
    const memoizedColumns = React.useMemo(() => 
        [
            {
                Header: "Profit",
                accessor: "profit",
            },
            {
                Header: "Date",
                accessor: "date",
            },
            {
                Header: "Cows Died",
                accessor: "cowsDied",
                
            },
            {
                Header: "Cows Sold",
                accessor: "cowsSold",
            },
            {
                Header: "Cows Bought",
                accessor: "cowsBought",
            },
            {
                Header: "Average Cow Health",
                accessor: "avgCowHealth",
            },
            {
                Header: "Cow Count",
                accessor: "cowCount",
            }
        ], 
    []);
    const memoizedDates = React.useMemo(() => profits, [profits]);
    // Stryker enable ArrayDeclaration

    return <OurTable
        data={memoizedDates}
        columns={memoizedColumns}
        testid={"ProfitsTable"}
    />;
};