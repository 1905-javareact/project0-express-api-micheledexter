import { getAllRoles, getRoleById, getRolePage } from "../dao/role.dao";

export async function getAllRolesService() {
    return await getAllRoles();
}

export async function getRoleByIdService(id:number) {
    return await getRoleById(id);
}

export async function getRolePageService(page: number, pagelength?: number) {
    return await getRolePage(page, pagelength);
}