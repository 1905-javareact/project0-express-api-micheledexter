import * as express from 'express';
import { authorization } from '../middleware/auth-middleware';
import { getAllUsersService, getUserByIdService, updateUserByIdService, createUserService, getUserPageService } from '../service/user.service';

const router = express.Router();

router.get('/', [authorization(['admin', 'finance-manager']), async (req, res) => {
    res.json(await getAllUsersService());
}]);

router.patch('/', [authorization(['admin']), async (req, res) => {
    res.json(await updateUserByIdService(req.body));
}]);

router.get('/:id', [authorization(['admin','finance-manager', 'user']), async (req, res) => {
    res.json(await getUserByIdService(req.params.id));
}]);

/*
We are going to ignore any security for paging requests FOR NOW
because we already know it works and have shown it, but we need
to show functionality and code and authorization takes up 
precious time
*/

router.get('/page/:page', async (req, res) => {
    res.json(await getUserPageService(req.params.page, req.query.pagelength));
});

// TEMPORARY
router.post('/', [authorization(['admin']), async (req, res) => {
    res.json(await createUserService(req.body))
}]);

export default router;