import { useNavigate } from "react-router-dom";
import api from "../apiConfig/axiosConfig";
import "./UserView.css";
import { globalState } from "../../state/globalState";
import { useEffect, useState } from "react";
import { User } from "../../interface/User";

export const UserView: React.FC = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState<User>(globalState.loggedInUser);

    useEffect(() => {
        // setTimeout(()=> {
        //     console.log("userview: " + globalState.loggedInUser.userId);
        // }, 2000);
        
        function temp() {
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
        if(globalState.loggedInUser.userId === null) {
            temp();
        }
    }, [])

    const logout = async () => {
        await api.get("/auth/logout")
        .then((response) => {
            globalState.loggedInUser = {
                userId: null,
                firstName: "",
                lastName: "",
                username: "",
                role: ""
            };
            alert("Message: " + response.data);
            navigate("/login");
            return;
        })
        .catch ((err) => {
            alert("Error: " + err);
        })
    }

    return (
        <div className="userview">
            <h3>Username: {user.username}</h3>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Role: {user.role}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}