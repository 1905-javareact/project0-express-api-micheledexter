import { PoolClient } from "pg";
import { connectionPool } from ".";
import { sqlReimbursementStatusToJsReimbursementStatus } from "../util/converter";
import { schema } from "../util/sql-helper";
import { debug } from "../util/debug";
import { INTERNAL_SERVER_ERROR } from "../util/messages";

export async function getAllReimbursementStatuses() {
  let client: PoolClient;

  try {
    client = await connectionPool.connect();

    let queryText = `SELECT * FROM ${schema()}.reimbursement_status ORDER BY id;`;
    let result = await client.query(queryText);
    return result.rows.map(sqlReimbursementStatusToJsReimbursementStatus);
  } catch(err) {
    debug(err);
    return INTERNAL_SERVER_ERROR;
  } finally {
    client && client.release();
  }
}

export async function getReimbursementStatusById(id: number) {
  let client: PoolClient;

  try {
    client = await connectionPool.connect();

    let queryText = `SELECT * FROM ${schema()}.reimbursement_type WHERE id=$1;`;
    let result = await client.query(queryText, [id]);
    return sqlReimbursementStatusToJsReimbursementStatus(result.rows[0]);
  } catch(err) {
    debug(err);
    return INTERNAL_SERVER_ERROR;
  } finally {
    client && client.release();
  }
}