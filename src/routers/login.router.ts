import * as express from 'express';
import { findUserByUsernameAndPassword } from '../dao/user.dao';
const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    let user = await findUserByUsernameAndPassword(username, password);
    if (typeof(user) !== 'string') {
        req.session.user = user;
        res.send(user);
    } else {
        res.status(400).send('Invalid Credentials');
    }
});

export default router;