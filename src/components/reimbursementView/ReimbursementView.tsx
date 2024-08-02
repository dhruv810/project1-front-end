import { Reimbursement } from "../../interface/Reimbursement";

interface temp {
    reimbursements: Reimbursement[]
}

export const ReimbursementView: React.FC<temp> = ( {reimbursements}) => {

    return (
        <div>
            <h1>Reimbursement List</h1>
            <p>{reimbursements.length}</p>
            <div>
                {reimbursements.map((reimbursement, index) => (
                    <ul key={index}>
                        <li>Reim Id: {reimbursement.reimId}</li>
                        <li>User: {reimbursement.user?.username}</li>
                        <li>Status: {reimbursement.status}</li>
                        <li>Amount: {reimbursement.amount?.toString()}</li>
                        <li>Description: {reimbursement.description}</li>
                    </ul>
                ))}
            </div>
        </div>
    )

}