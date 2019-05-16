import * as express from 'express';
import { authorization } from '../middleware/auth-middleware';
import { users } from '../state';

const router = express.Router();

router.get('/', [authorization(['finance-manager']), (req, res) => {
    res.json(users);
}]);

router.get('/:id', [authorization(['finance-manager']), (req, res) => {
    for (let user of users) {
        if (user.userId === parseInt(req.params.id)) res.json(user);
    }
    res.json({});
}]);

// router.use('/', [authorization(['admin', 'finance-manager']), (req, res) => {
//     res.json('It works.');
// }]);

export default router;