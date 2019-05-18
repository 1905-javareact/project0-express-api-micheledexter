import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { sqlUserToJsUser } from '../util/converter';
import { User } from '../models/user';
import { INTERNAL_SERVER_ERROR } from '../util/messages';
import { getUserByIdService } from '../service/user.service';
import { debug } from '../util/debug';

export async function getAllUsers() {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = 'SELECT * FROM project0.users;';
        let result = await client.query(queryText);
        let promiseList = await result.rows.map(sqlUserToJsUser);
        let list: User[] = [];
        for (let promise of promiseList) {
            let user = await promise;
            list.push(user);
        }
        return list;
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}

export async function updateUserById(user: User) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = 'UPDATE project0.users SET username=$1, user_pass=$2, first_name=$3, last_name=$4, email=$5, role_id=$6 WHERE id=$7;';
        let username = user.username;
        let user_pass = user.password;
        let first_name = user.firstName;
        let last_name = user.lastName;
        let email = user.email;
        let role_id = user.role.roleId;
        let id = user.userId;
        let primary = await client.query(queryText, [username, user_pass, first_name, last_name, email, role_id, id]);
        if (!primary.rowCount) return INTERNAL_SERVER_ERROR;
        return await getUserByIdService(id);
    } catch (err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}

export async function getUserById(id: number) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = 'SELECT * FROM project0.users WHERE id=$1;';
        let result = await client.query(queryText, [id]);
        let user = await sqlUserToJsUser(result.rows[0]);
        return user;
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}

export async function findUserByUsernameAndPassword(username: string, password: string) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = 'SELECT * FROM project0.users WHERE username=$1 AND user_pass=$2;'
        let result = await client.query(queryText, [username, password]);
        let user = await sqlUserToJsUser(result.rows[0]);
        return user;
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}