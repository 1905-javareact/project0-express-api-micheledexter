import { PoolClient } from "pg";
import { connectionPool } from ".";
import { schema } from "../util/sql-helper";
import { debug } from "../util/debug";
import { INTERNAL_SERVER_ERROR } from "../util/messages";
import { sqlReimbursementTypeToJsReimbursementType } from "../util/converter";

export async function getAllReimbursementTypes() {
  let client: PoolClient;

  try {
    client = await connectionPool.connect();

    let queryText = `SELECT * FROM ${schema()}.reimbursement_type ORDER BY id;`;
    let result = await client.query(queryText);
    return result.rows.map(sqlReimbursementTypeToJsReimbursementType);
  } catch(err) {
    debug(err);
    return INTERNAL_SERVER_ERROR;
  } finally {
    client && client.release();
  }
}

export async function getReimbursementTypeById(id: number) {
  let client: PoolClient;

  try {
    client = await connectionPool.connect();

    let queryText = `SELECT * FROM ${schema()}.reimbursement_type WHERE id=$1;`;
    let result = await client.query(queryText, [id]);
    return sqlReimbursementTypeToJsReimbursementType(result.rows[0]);
  } catch(err) {
    debug(err);
    return INTERNAL_SERVER_ERROR;
  } finally {
    client && client.release();
  }
}