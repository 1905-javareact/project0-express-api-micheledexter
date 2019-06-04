import { getAllReimbursementTypes, getReimbursementTypeById } from "../dao/reimbursement-type.dao";

export async function getAllReimbursementTypesService() {
  return await getAllReimbursementTypes();
}

export async function getReimbursementTypeByIdService(id: number) {
  return await getReimbursementTypeById(id);
}