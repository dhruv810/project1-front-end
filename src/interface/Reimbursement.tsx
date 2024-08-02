import { UUID } from "crypto";
import { User } from "./User";

export interface Reimbursement {
    reimId?: UUID,
    description?: String,
    amount?: Number,
    status?: String,
    user?: User
}