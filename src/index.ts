// Must use `* as [thing]` instead of `[thing]` for some reason
import * as express from 'express';
import * as bodyParser from 'body-parser';
import userRouter from './routers/user-router';
import reimbursementRouter from './routers/reimbursement-router';

// CONSTANTS
const PORT: number = 3000;

// SERVER INSTANCE
const app = express();

// MIDDLEWARE
app.use(bodyParser.json());

// ROUTERS
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);


app.use('/', (req, resp) => {
    resp.send('Guess it works');
})

// LISTEN
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});