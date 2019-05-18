import { PoolClient } from "pg";
import { INTERNAL_SERVER_ERROR } from "../util/messages";
import { connectionPool } from ".";
import { sqlReimbursementToJsReimbursement } from "../util/converter";

export async function getAllReimbursements() {
    let client: PoolClient;

    try {
        client = await connectionPool.connect();

        let queryText = 'SELECT * FROM project0.reimbursement;';
        let result = await client.query(queryText);
        return result.rows.map(sqlReimbursementToJsReimbursement);
    } catch(err) {
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
        return INTERNAL_SERVER_ERROR;
    } finally {
        client && client.release();
    }
}