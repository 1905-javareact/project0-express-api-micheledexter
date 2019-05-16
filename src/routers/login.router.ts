import * as express from 'express';
import { users } from '../state';

const router = express.Router();

router.post('/', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    // If we found a user...
    if (user) {
        req.session.user = user; // ...attach the user to the session
        res.send(user);
    } else {
        res.status(400).send('Invalid Credentials');
    }
});

export default router;