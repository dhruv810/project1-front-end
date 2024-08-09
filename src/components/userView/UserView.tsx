import { useNavigate } from "react-router-dom";
import api from "../apiConfig/axiosConfig";
import "./UserView.css";
import { globalState } from "../../state/globalState";

export const UserView: React.FC = () => {

    const navigate = useNavigate();

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
            <h3>Username: {globalState.loggedInUser?.username}</h3>
            <p>First Name: {globalState.loggedInUser?.firstName}</p>
            <p>Last Name: {globalState.loggedInUser?.lastName}</p>
            <p>Role: {globalState.loggedInUser?.role}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}