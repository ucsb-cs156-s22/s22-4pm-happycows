// import OurTable, {ButtonColumn}from "main/components/OurTable";
import OurTable from "main/components/OurTable";
// import { useBackendMutation } from "main/utils/useBackend";
// import {onDeleteSuccess } from "main/utils/UCSBDateUtils";
// // import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";


export default function LeaderboardTable({ leaderboard, currentUser }) {

    // const navigate = useNavigate();


    // const editCallback = (cell) => {
    //     navigate(`/reviews/edit/${cell.row.values.id}`)
    // }

    // Stryker disable all : hard to test for query caching
    // const deleteMutation = useBackendMutation(
    //     cellToAxiosParamsDelete,
    //     { onSuccess: onDeleteSuccess },
    //     ["/api/leaderboard/all"]
    // );
    // Stryker enable all  

    // Stryker disable next-line all : TODO try to make a good test for this
    // const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

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
        // ButtonColumn("Edit", "primary", editCallback, "ReviewsTable"),
        // ButtonColumn("Delete", "danger", deleteCallback, "LeaderboardTable")
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={leaderboard}
        columns={columnsToDisplay}
        testid={testid}
    />
};