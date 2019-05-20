import { getAllReimbursements, getReimbursementById, findReimbursementsByStatusId, findReimbursementsByStatusIdInDateRange, findReimbursementsByAuthorId, findReimbursementsByAuthorIdInRange, createNewReimbursement, updateReimbursementById, getReimbursementPage } from "../dao/reimbursement.dao";
import { Reimbursement } from "../models/reimbursement";

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

export async function createNewReimbursementService(reimbursement: Reimbursement) {
    return await createNewReimbursement(reimbursement);
}

export async function updateReimbursementByIdService(reimbursement: Reimbursement) {
    return await updateReimbursementById(reimbursement);
}

export async function getReimbursementPageService(page: number, pagelength?: number) {
    return await getReimbursementPage(page, pagelength);
}