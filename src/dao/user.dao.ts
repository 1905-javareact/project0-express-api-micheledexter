import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { sqlUserToJsUser } from '../util/converter';
import { User } from '../models/user';
import { INTERNAL_SERVER_ERROR } from '../util/messages';

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
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}