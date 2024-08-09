import { useNavigate } from "react-router-dom"
import { User } from "../../../interface/User";
import { useEffect, useState } from "react";
import { Reimbursement } from "../../../interface/Reimbursement";
import { ReimbursementView } from "../ReimbursementView";
import api from "../../apiConfig/axiosConfig";
import "./ManagerReimbursementView.css"

export const ManagerReimbusementView: React.FC = () => { 

    const [manager, setManager] = useState<User | null>(null);
    const [reimbursements, setReimbursementList] = useState<Reimbursement[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(manager === null) {
            api.get("/auth/user")
            .then((res) => {
                setManager(res.data);
            })
            .catch((err) => {
                navigate('/login');
                return;
            } )
        }
        getAllReiembursement();
        
    }, [])

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
            setReimbursementList(res.data);
        })
        .catch((err) => {
            alert("Error: " + err.response.data);
        });
    }

    return (
        <>
            <button onClick={()=>{navigate("/home")}}>X</button>
            <div className="outter">
                <h1>Manager View</h1>
                <div>
                    <button onClick={getAllReiembursement}>ALL</button>
                    <button onClick={getPendingReiembursement}>PENDING</button>
                </div>
                <ReimbursementView reimbursements={reimbursements} setReimbursementList={setReimbursementList} user={manager}
                managerView={true}/>
                
            </div>
        </>
    )

}