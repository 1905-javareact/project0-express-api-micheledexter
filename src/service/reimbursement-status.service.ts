import { getAllReimbursementStatuses, getReimbursementStatusById } from "../dao/reimbursement-status.dao";

export async function getAllReimbursementStatusesService() {
  return await getAllReimbursementStatuses();
}

export async function getReimbursementStatusByIdService(id: number) {
  return await getReimbursementStatusById(id);
}