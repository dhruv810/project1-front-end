import "./createAccount.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apiConfig/axiosConfig";

export const CreateAccount = () => {
    const [username, setUsername] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    const [firstname, setFirstname] = useState<String>("");
    const [lastname, setLastname] = useState<String>("");
    const [role, setRole] = useState<String>("");
    

    const navigate = useNavigate();

    const registerAccount = async () => {
        await api.post("/register", {
            "username": username,
            "password": password,
            "firstName": firstname,
            "lastName": lastname,
            "role": role
        })
        .then((response) => {
            console.log(response.data);
            navigate("/login");
            })
        .catch((err) => {
            console.log(err);
            alert("Error: " + err.response.data);
        })
    }

    return (
        <div className="create-account">
            <h1>Create Account</h1>
            <div className="form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username?.toString()}
                    onChange={(e) => setUsername(e.target.value)} />
                <input
                    type="password"
                    placeholder="Password"
                    value={password?.toString()}
                    onChange={(e) => setPassword(e.target.value)} />
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstname?.toString()}
                    onChange={(e) => setFirstname(e.target.value)} />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastname?.toString()}
                    onChange={(e) => setLastname(e.target.value)} />
                <input 
                    type="text"
                    placeholder="Role"
                    value={role?.toString()}
                    onChange={(e) => setRole(e.target.value)} />

                <div className="btndiv">
                    <button onClick={registerAccount}>create account</button>
                    <p onClick={()=>{navigate('/login')}}>Already have account? login</p>
                </div>
            </div>

        </div>
    );

}