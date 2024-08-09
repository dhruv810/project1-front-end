import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReimbursementView } from "../reimbursementView/ReimbursementView";
import api from "../apiConfig/axiosConfig";
import "./HomePage.css"
import { UserView } from "../userView/UserView";
import { globalState } from "../../state/globalState";
import { User } from "../../interface/User";

export const HomePage: React.FC = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        // setTimeout(()=> {
        //     console.log("homepage: " + globalState.loggedInUser.userId);
        // }, 2000);
        function tmp () {
            if(globalState.loggedInUser.userId === null) {
                api.get("/auth/user")
                .then((res) => {
                    console.log(res.data);
                    globalState.loggedInUser = res.data;
                    setUser(res.data);
                    return;
                })
                .catch((err) => {
                    navigate('/login');
                } )
            }
            
        }
        tmp();
       
    }, []);

    function goToManagerView(): void {
        globalState.isPendingView = false;
        navigate("/manager");
    }

    function goToUserView(): void {
        navigate("/manage-user");
    }

    return (
        <div className="homeOuter">
            <div id="temp">
                <UserView />
                <div className="reimbursementButton">
                    <button onClick={() => navigate('/create-reimbursement')}>Create Reimbursement</button>
                    {
                        globalState.loggedInUser?.role === "MANAGER" ?
                        <button onClick={goToManagerView}>Manage reimbursement</button> :""
                    }
                    {
                        globalState.loggedInUser?.role === "MANAGER" ?
                        <button onClick={goToUserView}>Manage users</button> :""
                    }
                </div>
            </div>
        
            <div className="homeInner">
                <ReimbursementView managerView={false}/>
            </div>
        </div>
    )
}