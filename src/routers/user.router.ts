import * as express from 'express';
import { authorization } from '../middleware/auth-middleware';
import { getAllUsersService, getUserByIdService, updateUserByIdService, createUserService } from '../service/user.service';

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

// TEMPORARY
router.post('/', [authorization(['admin']), async (req, res) => {
    res.json(await createUserService(req.body))
}]);

export default router;