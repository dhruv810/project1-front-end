import { UUID } from "crypto";
import { Reimbursement } from "../../interface/Reimbursement";
import "./ReimbursementView.css"
import api from "../apiConfig/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { globalState } from "../../state/globalState";

interface temp {
    managerView: boolean
}

export const ReimbursementView: React.FC<temp> = ({ managerView}) => {

    const [viewPending, setViewPending] = useState<boolean>(globalState.isPendingView);
    const [reimbursementList, setReimbursementList] = useState<Reimbursement[]>([]);

    useEffect(() => {
        // setTimeout(()=> {
        //     console.log("reimbursement view: " + globalState.loggedInUser.userId);
        // }, 2000);
        
        if(globalState.loggedInUser.userId === null) {
            api.get("/auth/user")
            .then((res) => {
                console.log(res.data);
                globalState.loggedInUser = res.data;
            })
            .catch((err) => {
                navigate('/login');
                return;
            } )
        }
        
        getReimbursements();

    }, [viewPending]);

    const updateStatus = async (index: number, status: String, reim_id: UUID | undefined) => {
        await api.patch(`/reimbursements/resolve/${status}?reimbursement_id=${reim_id}`)
        .then((res) => {
            const resims = [...reimbursementList];
            resims[index].status = res.data.status;
            setReimbursementList(resims);
            // window.location.reload();
        })
        .catch((err) => { 
            alert("Error: " + err?.response?.data);
        });
    }

    async function getReimbursements() {
        let url = "";
        if (viewPending) {
            url = "/user/reimbursement/pending";
        }
        else {
            url = "/user/reimbursement";
        }
        await api.get(url)
        .then((res) => {
            console.log(res.data);
            setReimbursementList(res.data);
        })
        .catch((err) => {
            alert("Error: " + err.response.data);
        });

    }

    // async function getAllReiembursement() {
        
    // }

    // async function getPendingReiembursement() {
    //     await api.get("/user/reimbursement/pending")
    //     .then((res) => {
    //         console.log(res.data);
    //         setReimbursementList(res.data);
    //     })
    //     .catch((err) => {
    //         alert("Error: " + err.response.data);
    //     });
    // }

    const navigate = useNavigate();
    const changeDescription = (reimbursemnt: Reimbursement) => {
        navigate("/description", {state: {reimbursemnt: reimbursemnt}});
    }

    return (
        <div className="container">
            <h1>Reimbursement List</h1>
            <div>
                <button onClick={()=> {setViewPending(false); globalState.isPendingView=false;}}>ALL</button>
                <button onClick={()=> {setViewPending(true); globalState.isPendingView=true;}}>ALL PENDING</button>
            </div>
            <div className="reimbursementList">
                
                { reimbursementList.length === 0? (<p>No Reimbursements</p>):
                    (reimbursementList.map((reimbursement, index) => (
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
                                {   (globalState.loggedInUser?.role !== "MANAGER" || !managerView || reimbursement.status !== "PENDING")?"":
                                    (<div>
                                    <button onClick={()=>{updateStatus(index, "APPROVED", reimbursement?.reimId)}}>APPROVE</button>
                                    <button onClick={()=>{updateStatus(index, "REJECTED", reimbursement?.reimId)}}>REJECT</button>
                                </div>)
                                }
                                {
                                    (reimbursement?.status === "PENDING" && !managerView && reimbursement?.user?.userId === globalState.loggedInUser?.userId)?
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
        </div>
    )

}