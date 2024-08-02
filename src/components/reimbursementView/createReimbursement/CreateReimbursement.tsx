import { useState } from "react";
import api from "../../apiConfig/axiosConfig";
import { useNavigate } from "react-router-dom";


export const CreateReimbursement: React.FC<any> = () => {
    // "description": "fhushfusdhfih",
    // "amount": 750.00,
    // "status": "PENDING"

    const [description, setDescription] = useState<String>("");
    const [amount, setAmount] = useState<number>(0.0);
    const status = "PENDING";

    const navigate = useNavigate();

    const postReimbursement = () => {
        api.post("reimbursement", {
            "description": description,
            "amount": amount,
            "status": status
        })
        .then((res) => {
            navigate("/home");
        })
        .catch((err) => {
            alert("Error: " + err.response.data);
        })
    }

    return (
        <div>
            <h1>Create Reimbursement</h1>
            <div>
                <input
                    type="text"
                    value={description.toString()}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                ></input>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    placeholder="Amount"
                ></input>
                <button onClick={postReimbursement}>Submit</button>
            </div>
        </div>
    );
}