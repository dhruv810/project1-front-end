import { User } from "../interface/User";

export const globalState: any = {
    loggedInUser: {
        userId: null,
        firstName: "",
        lastName: "",
        username: "",
        role: ""
    } as User
}