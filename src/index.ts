// In order to use environment variables we require 'dotenv'
// We're doing it this way since it'll automatically locate
// and configure all in one go, even though this is ES5 syntax.
require('dotenv').config();
// Must use `* as [thing]` instead of `[thing]` for some reason
import * as express from 'express';
import * as bodyParser from 'body-parser';
import userRouter from './routers/user.router';
import reimbursementRouter from './routers/reimbursement.router';
import loginRouter from './routers/login.router';
import { sessionMiddleware } from './middleware/session-middleware';
const pool = require('./middleware/pool');

// CONSTANTS
const PORT: number = 3000;

// SERVER INSTANCE
const app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(sessionMiddleware);

// ROUTERS
app.get('/test', (req, res) => {
    const queryText: string = `SELECT * FROM project0.enduser;`;

    pool.query(queryText)
        .then(response => res.send(response.rows))
        .catch(err => res.status(500).send(err));
});
app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);



// Catch-all 404 (we keep this at the end)
app.use('/', (req, res) => {
    res.sendStatus(400);
});

// LISTEN
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});