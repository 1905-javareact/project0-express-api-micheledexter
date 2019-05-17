import { getAllRoles, getRoleById } from "../dao/role.dao";

export async function getAllRolesService() {
    return await getAllRoles();
}

export async function getRoleByIdService(id:number) {
    return await getRoleById(id);
}