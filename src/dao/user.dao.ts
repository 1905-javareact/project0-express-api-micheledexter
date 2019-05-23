import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { sqlUserToJsUser } from '../util/converter';
import { User } from '../models/user';
import { INTERNAL_SERVER_ERROR, CREATED, INVALID_CREDENTIALS } from '../util/messages';
import { getUserByIdService } from '../service/user.service';
import { debug } from '../util/debug';
import { schema } from '../util/sql-helper';

export async function getAllUsers() {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = `SELECT * FROM ${schema()}.users;`;
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

export async function getUserPage(page: number, pagelength?: number) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText: string = `SELECT * FROM ${schema()}.page_users($1${pagelength ? ', $2' : ''})`;
        let params = pagelength ? [page, pagelength] : [page];
        let result = await client.query(queryText, params);
        let promiseList = result.rows.map(sqlUserToJsUser);
        let list: User[] = [];
        for (let promise of promiseList) {
            let user = await promise;
            list.push(user);
        }
        return list;
    } catch(err) {
        debug(err);
    } finally {
        client && client.release();
    }
}

export async function updateUserById(user: User) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = `UPDATE ${schema()}.users SET username=$1, user_pass=$2, first_name=$3, last_name=$4, email=$5, role_id=$6 WHERE id=$7;`;
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

        let queryText = `SELECT * FROM ${schema()}.users WHERE id=$1;`;
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

        let queryText = `SELECT * FROM ${schema()}.users WHERE username=$1;`;
        let bcrypt = require('bcrypt');
        let result = await client.query(queryText, [username]);
        let hash = result.rows[0].user_pass;
        if (bcrypt.compareSync(password, hash)) {
            return getUserByIdService(result.rows[0].id);
        } else {
            return INVALID_CREDENTIALS;
        }
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}

export async function createUser(user: User) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = `INSERT INTO ${schema()}.users ("username", "user_pass", "first_name", "last_name", "email", "role_id") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
        let username = user.username;
        let bcrypt = require('bcrypt');
        let first_name = user.firstName;
        let last_name = user.lastName;
        let email = user.email;
        let role_id = user.role.roleId;
        bcrypt.hash(user.password, 10, async (err, hash) => {
            await client.query(queryText, [username, hash, first_name, last_name, email, role_id]);
        });
        return CREATED;
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}