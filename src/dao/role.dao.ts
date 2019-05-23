import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { sqlRoleToJsRole } from '../util/converter';
import { Role } from '../models/role';
import { INTERNAL_SERVER_ERROR } from '../util/messages';
import { debug } from '../util/debug';
import { schema } from '../util/sql-helper';

export async function getAllRoles() {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = `SELECT * FROM ${schema()}.roles;`;
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
        
        let queryText: string = `SELECT * FROM ${schema()}.page_roles($1${pagelength ? ', $2' : ''})`;
        let params = pagelength ? [page, pagelength] : [page];
        let result = await client.query(queryText, params);
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

        let queryText = `SELECT * FROM ${schema()}.roles WHERE id=$1;`;
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