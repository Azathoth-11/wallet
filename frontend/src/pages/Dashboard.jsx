import AppBar from "../components/AppBar";
import Balance from "../components/Balance"
import Users from "../components/Users"

function Dashboard(){

    return (

        <div>
            <AppBar />
            <Balance value={10000} />
            <Users />
        </div>
    )
}




export default Dashboard;