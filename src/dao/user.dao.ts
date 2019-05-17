import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { sqlUserToJsUser } from '../util/converter';
import { User } from '../models/user';

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
        console.log(err);
        return 'Internal Server Error';
    } finally {
        client && client.release();
    }
}

export async function getUserById(id: number) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();
    } catch(err) {
        
    }
}