import OurTable from "main/components/OurTable";
import { hasRole } from "main/utils/currentUser";


export default function LeaderboardTable({ leaderboard, currentUser }) {

    

    const columns = [
        {
            Header: 'Commons ID',
            accessor: 'commonsid', // accessor is the "key" in the data
        },
        {
            Header: 'Player Name',
            accessor: 'playerName',
        },
        {
            Header: 'Number of Cows',
            accessor: 'numOfCows',
        },
        {
            Header: 'Amount of Money',
            accessor: 'amtOfMoney',
        },
        {
            Header: 'Average Cow Health',
            accessor: 'averageCowHealth',
        },
    ];

    const testid = "LeaderboardTable"    
    const columnsIfAdmin = [
        ...columns,
        
    ];
    // Stryker disable next-line all
    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={leaderboard}
        columns={columnsToDisplay}
        testid={testid}
    />
};