import { getAllUsers } from "../dao/user.dao";

export async function getAllUsersService() {
    return await getAllUsers();
}