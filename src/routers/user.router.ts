import * as express from 'express';
import { authorization } from '../middleware/auth-middleware';
import { getAllUsersService, getUserByIdService } from '../service/user.service';

const router = express.Router();

router.get('/', [authorization(['finance-manager']), async (req, res) => {
    res.json(await getAllUsersService());
}]);

router.get('/:id', [authorization(['finance-manager']), async (req, res) => {
    res.json(await getUserByIdService(req.params.id));
}]);

export default router;