import { useLocation, useNavigate } from "react-router-dom"
import { User } from "../../../interface/User";
import { useEffect, useState } from "react";
import { Reimbursement } from "../../../interface/Reimbursement";
import { ReimbursementView } from "../ReimbursementView";
import api from "../../apiConfig/axiosConfig";
import "./ManagerView.css"

export const ManagerView: React.FC = () => {
    const location = useLocation();
    const manager: User = location.state.user;
    const setUser = location.state.setUser;
    const [reimbursements, setReimbursementList] = useState<Reimbursement[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(manager === null) {
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
        
    }, [manager])

    function getAllReiembursement() : void {
        api.get("reimbursements/all")
        .then((res) => {
            console.log(res.data);
            setReimbursementList(res.data);
        })
        .catch((err) => {
            alert("Error: " + err.response.data);
        });
    }

    function getPendingReiembursement() : void {
        api.get("/reimbursements/pending/all")
        .then((res) => {
            console.log(res.data);
            setReimbursementList(res.data);
        })
        .catch((err) => {
            alert("Error: " + err.response.data);
        });
    }


    return (
        <div className="outter">
            <h1>Manager View</h1>
            <div>
                <button onClick={getAllReiembursement}>ALL</button>
                <button onClick={getPendingReiembursement}>PENDING</button>
            </div>
            <ReimbursementView reimbursements={reimbursements} setReimbursementList={setReimbursementList} user={manager}/>
            
        </div>
    )

}