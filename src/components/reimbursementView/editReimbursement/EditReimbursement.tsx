import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditReimbursement.css"
import api from "../../apiConfig/axiosConfig";
import { Reimbursement } from "../../../interface/Reimbursement";

export const EditReimbursement = () => {
    const location = useLocation();
    const reimbursemnt: Reimbursement = location.state.reimbursemnt;
    const [destription, setDescription] = useState<String>("");

    const navigate = useNavigate();

    const submitChanges = () => {
        if (destription === "" ) {
            alert("Field cannot be empty");
            return;
        }
        api.patch(`/reimbursements/description`, {
            "reimId": reimbursemnt.reimId,
            "description": destription
        })
        .then((res) => {
            navigate("/home");
        })
        .catch((err) => {
            alert("Error: " + err.response.data);
        });
    }

    return (
        <div className="outer">
            <h1>Edit Reimbursement</h1>
            <div className="editdiv">
                <label>Description:</label>
                <textarea id="description"
                    value={destription.toString()}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={reimbursemnt?.description?.toString()}
                    />
            </div>
            <button onClick={submitChanges}>Submit changes</button>
            <button onClick={()=>navigate("/home")}>Cancel</button>
        </div>
    );

}