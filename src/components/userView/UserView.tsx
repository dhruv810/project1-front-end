import { useNavigate } from "react-router-dom";
import { LoginProps } from "../../interface/LoginProps";
import api from "../apiConfig/axiosConfig";
import "./UserView.css";

export const UserView: React.FC<LoginProps> = ({user, setUser}) => {

    const navigate = useNavigate();

    const logout = () => {
        setUser(null);
        api.get("/auth/logout")
        .then((response) => {
            alert("Message: " + response.data);
        })
        .catch ((err) => {
            alert("Error: " + err);
        })
        navigate("/login")
    }

    return (
        <div className="userview">
            <h3>Username: {user?.username}</h3>
            <p>First Name: {user?.firstName}</p>
            <p>Last Name: {user?.lastName}</p>
            <p>Role: {user?.role}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}