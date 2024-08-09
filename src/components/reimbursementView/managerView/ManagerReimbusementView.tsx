import { useNavigate } from "react-router-dom"
import { User } from "../../../interface/User";
import { useEffect, useState } from "react";
import { ReimbursementView } from "../ReimbursementView";
import api from "../../apiConfig/axiosConfig";
import "./ManagerReimbursementView.css"
import { globalState } from "../../../state/globalState";

export const ManagerReimbusementView: React.FC = () => { 

    const [manager, setManager] = useState<User | null>(globalState.loggedInUser.userId);

    const navigate = useNavigate();

    useEffect(() => {
        if(manager === null) {
            api.get("/auth/user")
            .then((res) => {
                globalState.loggedInUser = res.data;
                setManager(res.data);
            })
            .catch((err) => {
                navigate('/login');
                return;
            } )
        }
        
    }, [])

    return (
        <>
            <button onClick={()=>{globalState.isPendingView=false; navigate("/home")}}>X</button>
            <div className="outter">
                <ReimbursementView managerView={true}/>
                
            </div>
        </>
    )

}