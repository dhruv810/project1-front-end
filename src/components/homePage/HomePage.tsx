import { useNavigate } from "react-router-dom";
import { LoginProps } from "../../interface/LoginProps";
import { UserView } from "../userView/UserView";
import { useEffect, useState } from "react";
import { ReimbursementView } from "../reimbursementView/ReimbursementView";
import { Reimbursement } from "../../interface/Reimbursement";
import api from "../apiConfig/axiosConfig";
import "./HomePage.css"

export const HomePage: React.FC<LoginProps> = ({user, setUser}) => {

    const navigate = useNavigate();
    const [reimbursementList, setReimbursementList] = useState<Reimbursement[]>([]);

    useEffect(() => {
        if(user === null) {
            api.get("/auth/user")
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log("not loggedin, moving to '/login'");
                navigate('/login');
            } )
        }
        getAllReiembursement();

    }, [user])
    
    async function getAllReiembursement() {
        await api.get("/user/reimbursement")
        .then((res) => {
            console.log(res.data);
            setReimbursementList(res.data);
        })
        .catch((err) => {
            alert("Error: " + err.response.data);
        });
        return reimbursementList;
        
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
                    <UserView user={user} setUser={setUser} />
                    <div className="reimbursementButton">
                        <button onClick={() => navigate('/create-reimbursement')}>Create Reimbursement</button>
                        {
                            user?.role === "MANAGER" ?
                            <button onClick={goToManagerView}>Manage reimbursement</button> :""
                        }
                        {
                            user?.role === "MANAGER" ?
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
                <ReimbursementView user={user} reimbursements={reimbursementList} setReimbursementList={setReimbursementList} />
            </div>
        </div>
    )
}