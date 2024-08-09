import { useEffect, useState } from "react"
import { User } from "../../../interface/User";
import { UUID } from "crypto";
import api from "../../apiConfig/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./ManageruserView.css"
import { globalState } from "../../../state/globalState";

export const ManagerUserView: React.FC = () => {
    const [userList, setUserList] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(()=> {
        if (globalState.loggedInUser.userId === null) {
            api.get("/auth/user")
            .then((res) => {
                console.log(res.data);
                globalState.loggedInUser = res.data;
            })
            .catch((err) => {
                navigate('/login');
                return;
            } )
        }

        if (globalState.loggedInUser?.role !== "MANAGER") {
            alert("you are not a manager");
            navigate('/home');
        }
        
        getAllUsers();

    }, []);

    async function getAllUsers() {
        await api.get("/users")
        .then((res) => {
            setUserList(res.data);
        })
        .catch((err) => {
            alert("Error: " + err?.response?.data);
        })
    }

    function fireUser(userId: UUID | undefined | null, index: number): void {
        if (typeof userId === "undefined") {
            alert("User Id not found");
            return;
        }
        if (userId === globalState.loggedInUser.userId) {
            alert("You cannot quit");
            return;
        }
        api.delete(`/user/${userId}`)
        .then((res) => {
            const newList = [...userList];
            newList.splice(index, 1);
            setUserList(newList);
        })
        .catch((err) => {
            alert("Error: " + err?.response?.data);
        });
    }

    function promoteUser(userId: UUID | undefined | null): void {
        api.patch(`/promote/${userId}`)
        .then((res) => {
            const newList = [...userList];
            const user = newList.find((user) => user.userId === userId);
            if (user) {
                user.role = res.data.role;
                setUserList(newList);
            }
        })
        .catch((err) => {
            alert("Error: " + err?.response?.data);
        });
    }

    return (
        <>
        <button onClick={()=>{navigate("/home")}}>X</button>
            <div id="outer">
            <h1>Manager User View</h1>
            <div className="userList">
                {
                    userList.map((user, index) => (
                        <div className="userManger" key={index}>
                            <p>First Name: {user?.firstName}</p>
                            <p>Last Name: {user?.lastName}</p>
                            <p>Current Role: {user?.role}</p>
                            <div className="buttons">
                                {
                                    user.role === "MANAGER"? "" :<button onClick={() => promoteUser(user.userId)}>Promote</button>
                                }
                                <button onClick={() => fireUser(user.userId, index)}>Fire</button>
                                
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )

}