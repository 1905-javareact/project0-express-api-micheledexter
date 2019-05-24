// In order to use environment variables we require 'dotenv'
// We're doing it this way since it'll automatically locate
// and configure all in one go, even though this is ES5 syntax.
require('dotenv').config();
// Must use `* as [thing]` instead of `[thing]` for some reason
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import userRouter from './routers/user.router';
import reimbursementRouter from './routers/reimbursement.router';
import loginRouter from './routers/login.router';
import { corsFilter } from './middleware/cors-filter.middleware';

// CONSTANTS
const PORT: number = parseInt(process.env.SERVER_PORT);

// SERVER INSTANCE
const app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser());
app.use(corsFilter);

// ROUTERS
app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);

// REMOVE COOKIE (presentation only)
app.use('/del', (req, res) => {
    res.clearCookie('token').json('Cookie Deleted');
});

// Catch-all 400 "Bad Request" (we keep this at the end)
app.use('/', (req, res) => {
    res.sendStatus(400);
});

// LISTEN
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});