import { useEffect, useState } from "react";
import "./login.css"
import api from "../apiConfig/axiosConfig";
import { useNavigate } from "react-router-dom";
import { globalState } from "../../state/globalState";

export const Login: React.FC = () => {
    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    
    const navigate = useNavigate();

    useEffect(() => {
        if (globalState.loggedInUser.userId !== null) {
            navigate("/home");
            return;
        }
        console.log("Getting user");
        api.get("/auth/user")
            .then((res) => {
                globalState.loggedInUser = res.data;
                navigate("/home");
                return;
            })
            .catch((err) => {
                // alert("Error: " + err.response.data);
            })
    }, []);

    const performLogIn = async () => {
        if (username.trim() === "" || password.trim() === "") {
            alert("Please fill in all fields");
            return;
        }
        
        api.post("/auth/login", {
            username: username,
            password: password
        })
        .then((res) => {
            console.log(res.data);
            globalState.loggedInUser = res.data;
            navigate("/home");
        })
        .catch((err) => {
            // console.log(err);
            alert("Error: " + err.response.data);
        });
    }

    return (
       <div id="outer">
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
                <div className="btndiv">
                    <button onClick={performLogIn}>login</button>
                    <button onClick={()=>{navigate('/create-account')}}>create new account</button>
                </div>
            </div>
        </div>
        </div> 
    )
}