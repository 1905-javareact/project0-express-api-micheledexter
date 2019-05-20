import { getAllUsers, getUserById, updateUserById, createUser, getUserPage } from "../dao/user.dao";
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

export async function createUserService(user: User) {
    return await createUser(user);
}

export async function getUserPageService(page: number, pagelength?: number) {
    return await getUserPage(page, pagelength);
}