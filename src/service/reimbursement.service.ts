import { getAllReimbursements, getReimbursementById, findReimbursementsByStatusId, findReimbursementsByStatusIdInDateRange, findReimbursementsByAuthorId, findReimbursementsByAuthorIdInRange } from "../dao/reimbursement.dao";

export async function getAllReimbursementsService() {
    return await getAllReimbursements();
}

export async function getReimbursementByIdService(id: number) {
    return await getReimbursementById(id);
}

export async function findReimbursementsByStatusIdService(id: number) {
    return await findReimbursementsByStatusId(id);
}

export async function findReimbursementsByStatusIdInDateRangeService(id: number, start: string, end: string) {
    return await findReimbursementsByStatusIdInDateRange(id, start, end);
}

export async function findReimbursementsByAuthorIdService(id: number) {
    return await findReimbursementsByAuthorId(id);
}

export async function findReimbursementsByAuthorIdInRangeService(id: number, start: string, end: string) {
    return await findReimbursementsByAuthorIdInRange(id, start, end);
}