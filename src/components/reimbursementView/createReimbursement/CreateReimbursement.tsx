import { useState } from "react";
import api from "../../apiConfig/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./createReimbursement.css";
import { Button } from "react-bootstrap";


export const CreateReimbursement: React.FC<any> = () => {

    const [description, setDescription] = useState<String>("");
    const [amount, setAmount] = useState<number>(0);
    const status = "PENDING";

    const navigate = useNavigate();

    const postReimbursement = async () => {
        if (amount < 1) {
            alert("Enter valid amount");
            return;
        }
        await api.post("reimbursement", {
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
        <div className="outer">
            <h1>Create Reimbursement</h1>
            <div className="inner">
                <div className="amountDiv">
                    <p>Amount:</p>
                    <input id="amountInput"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        placeholder="Amount"
                    ></input>
                </div>
                <div className="editdiv">
                <p>Description:</p>
                <textarea id="description"
                    value={description.toString()}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder=""
                    />
                </div>
                <button onClick={postReimbursement}>Submit</button>
                
            </div>
        </div>
    );
}