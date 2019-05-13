import * as express from 'express';
import { authorization } from '../middleware/auth-middleware';

const router = express.Router();

router.post('/', (req, res) => {
    const { username, password } = req.body;
});

router.use('/', [authorization(['admin', 'finance-manager']), (req, res) => {
    res.json('It works.');
}]);

export default router;