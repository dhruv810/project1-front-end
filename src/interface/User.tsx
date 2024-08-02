import { UUID } from "crypto"

export interface User {
    userId?: UUID,
    firstName?: String,
    lastName?: String,
    username?: String,
    password?: String,
    role?: String
}