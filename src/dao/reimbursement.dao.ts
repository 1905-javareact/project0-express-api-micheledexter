import { PoolClient } from "pg";
import { INTERNAL_SERVER_ERROR } from "../util/messages";
import { connectionPool } from ".";
import { sqlReimbursementToJsReimbursement, epochDateToStringDate, jsReimbursementToSqlParams } from "../util/converter";
import { Reimbursement } from "../models/reimbursement";
import { getReimbursementByIdService } from "../service/reimbursement.service";
import { debug } from "../util/debug";

export async function getAllReimbursements() {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = 'SELECT * FROM project0.reimbursement;';
        let result = await client.query(queryText);
        return result.rows.map(sqlReimbursementToJsReimbursement);
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}

export async function getReimbursementPage(page: number, pagelength?: number) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        console.log(pagelength);
        
        let queryText: string = `SELECT * FROM project0.page_reimbursement($1${pagelength ? ', $2' : ''})`;
        let params = pagelength ? [page, pagelength] : [page];
        let result = await client.query(queryText, params);
        return result.rows.map(sqlReimbursementToJsReimbursement);
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}

export async function getReimbursementById(id: number) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();
        
        let queryText = 'SELECT * FROM project0.reimbursement WHERE id=$1;';
        let result = await client.query(queryText, [id]);
        return sqlReimbursementToJsReimbursement(result.rows[0]);
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}

export async function findReimbursementsByStatusId(id: number) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = 'SELECT * FROM project0.reimbursement WHERE status_id=$1 ORDER BY date_submitted ASC;';
        let result = await client.query(queryText, [id]);
        return result.rows.map(sqlReimbursementToJsReimbursement);
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}

export async function findReimbursementsByStatusIdInDateRange(id: number, start: string, end: string) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = "SELECT * FROM project0.reimbursement WHERE status_id=$1 AND date_submitted >= $2 AND date_submitted <= $3 ORDER BY date_submitted DESC;";
        let result = await client.query(queryText, [id, start, end]);
        return result.rows.map(sqlReimbursementToJsReimbursement);
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}

export async function findReimbursementsByAuthorId(id: number) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = 'SELECT * FROM project0.reimbursement WHERE author_id=$1 ORDER BY date_submitted DESC;';
        let result = await client.query(queryText, [id]);
        return result.rows.map(sqlReimbursementToJsReimbursement);
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}

export async function findReimbursementsByAuthorIdInRange(id: number, start: string, end: string) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = 'SELECT * FROM project0.reimbursement WHERE author=$1 AND date_submitted >= $2 AND date_submitted <= $3 DESC;';
        let result = await client.query(queryText, [id, start, end]);
        return result.rows.map(sqlReimbursementToJsReimbursement);
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}

export async function createNewReimbursement(reimbursement: Reimbursement) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = 'INSERT INTO project0.reimbursement("author_id", "amount", "date_submitted", "date_resolved", "description", "resolver_id", "status_id", "type_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
        let params = jsReimbursementToSqlParams(reimbursement, false);

        let result = await client.query(queryText, params);
        if (!result.rowCount) return INTERNAL_SERVER_ERROR;
        return await sqlReimbursementToJsReimbursement(result.rows[0]);
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}

export async function updateReimbursementById(reimbursement: Reimbursement) {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = 'UPDATE project0.reimbursement SET author_id=$1, amount=$2, date_submitted=$3, date_resolved=$4, description=$5, resolver_id=$6, status_id=$7, type_id=$8 WHERE id=$9 RETURNING id, author_id, amount, date_submitted, date_resolved, description, resolver_id, status_id, type_id;';
        let params = jsReimbursementToSqlParams(reimbursement, true);

        let result = await client.query(queryText, params);
        if (!result.rowCount) return INTERNAL_SERVER_ERROR;
        return sqlReimbursementToJsReimbursement(result.rows[0]);
    } catch(err) {
        debug(err);
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}