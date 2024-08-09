import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReimbursementView } from "../reimbursementView/ReimbursementView";
import { Reimbursement } from "../../interface/Reimbursement";
import api from "../apiConfig/axiosConfig";
import "./HomePage.css"
import { UserView } from "../userView/UserView";
import { globalState } from "../../state/globalState";

export const HomePage: React.FC = () => {

    const navigate = useNavigate();
    const [reimbursementList, setReimbursementList] = useState<Reimbursement[]>([]);

    useEffect(() => {
        if(globalState.loggedInUser.userId === null) {
            api.get("/auth/user")
            .then((res) => {
                console.log(res.data);
                console.log("***********");
                console.log(globalState.loggedInUser);
                globalState.loggedInUser = res.data;
                return;
            })
            .catch((err) => {
                navigate('/login');
            } )
        }

        getAllReiembursement();

    }, [])
    
    async function getAllReiembursement() {
        await api.get("/user/reimbursement")
        .then((res) => {
            console.log(res.data);
            setReimbursementList(res.data);
        })
        .catch((err) => {
            alert("Error: " + err.response.data);
            return;
        });
    }

    function getPendingReiembursement() : void {
        api.get("/user/reimbursement/pending")
        .then((res) => {
            console.log(res.data);
            setReimbursementList(res.data);
        })
        .catch((err) => {
            alert("Error: " + err.response.data);
        });
    }

    function goToManagerView(): void {
        navigate("/manager");
    }

    function goToUserView(): void {
        navigate("/manage-user");
    }

    return (
        <div className="homeOuter">
                <div id="temp">
                    <UserView />
                    <div className="reimbursementButton">
                        <button onClick={() => navigate('/create-reimbursement')}>Create Reimbursement</button>
                        {
                            globalState.loggedInUser?.role === "MANAGER" ?
                            <button onClick={goToManagerView}>Manage reimbursement</button> :""
                        }
                        {
                            globalState.loggedInUser?.role === "MANAGER" ?
                            <button onClick={goToUserView}>Manage users</button> :""
                        }
                    </div>
                </div>
        
            <div className="homeInner">
                <h1>Reimbursement List</h1>
                <div>
                    <button onClick={getAllReiembursement}>ALL</button>
                    <button onClick={getPendingReiembursement}>ALL PENDING</button>
                </div>
                <ReimbursementView user={globalState.loggedInUser} reimbursements={reimbursementList} setReimbursementList={setReimbursementList} managerView={false}/>
            </div>
        </div>
    )
}