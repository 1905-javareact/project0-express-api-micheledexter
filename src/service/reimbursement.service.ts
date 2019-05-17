import { getAllReimbursements } from "../dao/reimbursement.dao";

export async function getAllReimbursementsService() {
    return await getAllReimbursements();
}