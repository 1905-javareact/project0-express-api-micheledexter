import * as express from 'express';
import { findUserByUsernameAndPassword } from '../dao/user.dao';
import * as jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    let user = await findUserByUsernameAndPassword(username, password);
    if (typeof(user) !== 'string') {
        const token = jwt.sign({...user}, process.env.JWT_SECRET);
        res.cookie('token', token);
        res.send(user);
    } else {
        res.status(400).clearCookie('token').send('Invalid Credentials');
    }
});

export default router;