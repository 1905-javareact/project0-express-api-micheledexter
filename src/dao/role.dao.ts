import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { sqlRoleToJsRole } from '../util/converter';
import { Role } from '../models/role';
import { INTERNAL_SERVER_ERROR } from '../util/messages';
import { debug } from '../util/debug';

export async function getAllRoles() {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = 'SELECT * FROM project0.roles;';
        let result = await client.query(queryText);
        return result.rows.map(sqlRoleToJsRole);
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}

export async function getRolePage(page: number, pagelength?: number) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        
        let queryText: string = `SELECT * FROM project0.page_roles($1${pagelength ? ', $2' : ''})`;
        let result = await client.query(queryText, [page, pagelength]);
        return result.rows.map(sqlRoleToJsRole);
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}

export async function getRoleById(id: number) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = 'SELECT * FROM project0.roles WHERE id=$1;';
        let result = await client.query(queryText, [id]);
        return sqlRoleToJsRole(result.rows[0]);
    } catch(err) {
        debug(err);
        let blank: Role;
        return blank;
    } finally {
        client && client.release();
    }
}