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
        console.log(err);
        return INTERNAL_SERVER_ERROR
    } finally {
        client && client.release();
    }
}