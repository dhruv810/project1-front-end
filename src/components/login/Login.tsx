import { useState } from "react";
import "./login.css"
import api from "../apiConfig/axiosConfig";
import { LoginProps } from "../../interface/LoginProps";
import { useNavigate } from "react-router-dom";
  
export const Login: React.FC<LoginProps> = ({ setUser }) => {
    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("");

    const navigate = useNavigate();

    const performLogIn = async () => {
        if (username === "" || password === "") {
            alert("Please fill in all fields");
            return;
        }
        
        api.post("/auth/login", {
            username: username,
            password: password
        })
        .then((res) => {
            console.log(res.data);
            setUser(res.data);
            navigate("/home");
        })
        .catch((err) => {
            alert("Error: " + err.response.data);
        });
    }

    return (
        <div className="login">
            <h1>Log In</h1>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Username"
                    value={username.toString()}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password.toString()}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <br />
                <button onClick={performLogIn}>Login</button>
            </div>
            
        </div>
    )
}