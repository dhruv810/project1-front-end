import { UUID } from "crypto"

export interface User {
    userId?: UUID | null,
    firstName: String,
    lastName: String,
    username: String,
    role: String
}