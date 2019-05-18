import { getAllUsers, getUserById, updateUserById } from "../dao/user.dao";
import { User } from "../models/user";

export async function getAllUsersService() {
    return await getAllUsers();
}

export async function updateUserByIdService(user: User) {
    return await updateUserById(user);
}

export async function getUserByIdService(id: number) {
    return await getUserById(id);
}