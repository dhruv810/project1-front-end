import { useNavigate } from "react-router-dom";
import { LoginProps } from "../../interface/LoginProps";
import { UserView } from "../userView/UserView";
import { useEffect, useState } from "react";
import { ReimbursementView } from "../reimbursementView/ReimbursementView";
import { Reimbursement } from "../../interface/Reimbursement";
import api from "../apiConfig/axiosConfig";

export const HomePage: React.FC<LoginProps> = ({user, setUser}) => {

    const navigate = useNavigate();
    const [reimbursementList, setReimbursementList] = useState<Reimbursement[]>([]);

    useEffect(() => {
        console.log(user);
        if(user === null) {
            console.log("not loggedin, moving to '/login'");
            navigate('/login');
        }
        getReiembursement();

    }, [navigate, user])
    
    function getReiembursement() : void {
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
        <div>
            <div>
                <UserView user={user} setUser={setUser} />
            </div>
            <div>
                <h1>Reimbursement</h1>
                <div>
                    <button>ALL</button>
                    <button>PENDING</button>
                </div>
                <ReimbursementView reimbursements={reimbursementList}/>

            </div>
        </div>
    )
}