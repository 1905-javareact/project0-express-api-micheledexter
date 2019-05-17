import { getAllUsers, getUserById } from "../dao/user.dao";

export async function getAllUsersService() {
    return await getAllUsers();
}

export async function getUserByIdService(id: number) {
    return await getUserById(id);
}