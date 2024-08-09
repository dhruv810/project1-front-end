import { UUID } from "crypto";
import { Reimbursement } from "../../interface/Reimbursement";
import "./ReimbursementView.css"
import api from "../apiConfig/axiosConfig";
import { User } from "../../interface/User";
import { useNavigate } from "react-router-dom";

interface temp {
    reimbursements: Reimbursement[]
    setReimbursementList: React.Dispatch<React.SetStateAction<Reimbursement[]>>;
    user: User | null;
    managerView: boolean
}

export const ReimbursementView: React.FC<temp> = ( {reimbursements, setReimbursementList, user, managerView}) => {

    const updateStatus = async (index: number, status: String, reim_id: UUID | undefined) => {
        await api.patch(`/reimbursements/resolve/${status}?reimbursement_id=${reim_id}`)
        .then((res) => {
            reimbursements[index] = res.data;
            setReimbursementList(reimbursements);
            // window.location.reload();
        })
        .catch((err) => { 
            alert("Error: " + err?.response?.data);
        });
    }

    const navigate = useNavigate();
    const changeDescription = (reimbursemnt: Reimbursement) => {
        navigate("/description", {state: {reimbursemnt: reimbursemnt}});
    }

    return (
        <div className="reimbursementList">
            
            { reimbursements.length === 0? (<p>No Reimbursements</p>):
                (reimbursements.map((reimbursement, index) => (
                <div className="reimbursement" key={index}>
                    <ul key={index}>
                        <li>Posted By: {reimbursement.user?.username}</li>
                        <li>Status: {reimbursement.status}</li>
                        <li>Amount: {reimbursement.amount?.toString()}</li>
                    </ul>
                        <p>Description:</p>
                        <div id="labelView">
                        <label>{reimbursement.description}</label>
                        </div>
                    
                        <div className="inDivBtns">
                            {   (user?.role !== "MANAGER" || !managerView || reimbursement.status !== "PENDING")?"":
                                (<div>
                                <button onClick={()=>{updateStatus(index, "APPROVED", reimbursement?.reimId)}}>APPROVE</button>
                                <button onClick={()=>{updateStatus(index, "REJECTED", reimbursement?.reimId)}}>REJECT</button>
                            </div>)
                            }
                            {
                                (reimbursement?.status === "PENDING" && !managerView && reimbursement?.user?.userId === user?.userId)?
                                <div>
                                    <button onClick={()=>{changeDescription(reimbursement)}}>EDIT</button>
                                </div>
                                :""
                            }
                        </div>
                        
                    </div>
                    
                )))
            }
        </div>
    )

}