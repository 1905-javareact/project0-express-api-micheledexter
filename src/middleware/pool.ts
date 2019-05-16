const pg = require('pg');

let config = {};

if (process.env.RDS_USE === 'true') {
    console.log('Using RDS...');
    config = {
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        host: process.env.RDS_HOSTNAME,
        port: process.env.RDS_PORT,
        database: process.env.RDS_DATABASE,
        ssl: true,
        max: 10,
        idleTimeoutMillis: 30000
    }; 
} else {
    console.log('Using localhost...');
    config = {
        user: 'project0user',
        password: 'passgres',
        host: 'localhost',
        port: 5432,
        database: 'project0db',
        schema: 'project0',
        max: 10,
        idleTimeoutMillis: 30000
    };
}

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('PostgreSQL connected.');
});

pool.on('error', (err) => {
    console.log('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;