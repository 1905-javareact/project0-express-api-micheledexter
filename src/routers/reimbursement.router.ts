import * as express from 'express';

const router = express.Router();

router.use('/', (req, res) => {
    res.send('It works.');
});

export default router;