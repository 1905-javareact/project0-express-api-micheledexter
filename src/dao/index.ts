import {Pool} from 'pg';
require('dotenv').config();

// use environment variables
const env = process.env;

// We are going to use a connection pool to help us manage our connections to the db
// we do this because making new connections is very expensive (takes a long time)
// so we configure the pool to make all the connections right away then share them
// in use, we will ask the pool for a connection and when we are done we will close
let config = {}
if (env.RDS_USE === 'true') {
    console.log('Using RDS...');
    config = {
        user: env.RDS_USERNAME,
        host: env.RDS_HOSTNAME,
        database: env.RDS_DATABASE,
        password: env.RDS_PASSWORD,
        port: 5432,
        max: 5
    };
} else {
    console.log('Using Development...');
    config = {
        user: env.DEVEL_USERNAME,
        host: env.DEVEL_HOSTNAME,
        database: env.DEVEL_DATABASE,
        password: env.DEVEL_PASSWORD,
        port: 5432,
        max: 5
    }
}
export const connectionPool = new Pool(config);