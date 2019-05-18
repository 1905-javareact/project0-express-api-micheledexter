import * as express from 'express';
import { authorization } from '../middleware/auth-middleware';
import { getAllUsersService, getUserByIdService, updateUserByIdService } from '../service/user.service';

const router = express.Router();

router.get('/', [authorization(['admin']), async (req, res) => {
    res.json(await getAllUsersService());
}]);

router.patch('/',  async (req, res) => {
    res.json(await updateUserByIdService(req.body));
});

router.get('/:id', [authorization(['finance-manager', 'user']), async (req, res) => {
    res.json(await getUserByIdService(req.params.id));
}]);

export default router;