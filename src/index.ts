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
    const queryText: string = 'SELECT * FROM "pirate";';

    pool.query(queryText)
        .then(response => res.send(response.rows))
        .catch(err => res.sendStatus(500));
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