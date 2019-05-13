import * as express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    const { username, password } = req.body;
});

router.use('/', (req, res) => {
    res.statusMessage = 'The incoming token has expired';
    res.sendStatus(401);
});

export default router;