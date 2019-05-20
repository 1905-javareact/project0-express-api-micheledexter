import * as express from 'express';
import { findReimbursementsByStatusIdService, findReimbursementsByStatusIdInDateRangeService, findReimbursementsByAuthorIdService, findReimbursementsByAuthorIdInRangeService, createNewReimbursementService, updateReimbursementByIdService, getReimbursementPageService } from '../service/reimbursement.service';
import { authorization } from '../middleware/auth-middleware';

const router = express.Router();

router.get('/page/:page', async (req, res) => {
    res.json(await getReimbursementPageService(req.params.page, req.query.pagelength));
});

router.get('/status/:id', [authorization(['finance-manager']), async (req, res) => {
    res.json(await findReimbursementsByStatusIdService(req.params.id));
}]);

router.get('/status/:id/date-submitted', [authorization(['finance-manager']), async (req, res) => {
    res.json(await findReimbursementsByStatusIdInDateRangeService(req.params.id, req.query.start, req.query.end));
    // res.json(`Look at that, #${req.params.id}, it works! The start is ${new Date(req.query.start).getTime()} and the end is ${new Date(req.query.end).getTime()}`);
}]);

router.get('/author/userId/:id', [authorization(['finance-manager', 'user']), async (req, res) => {
    res.json(await findReimbursementsByAuthorIdService(req.params.id));
}]);

router.get('/author/userId/:id/date-submitted', [authorization(['finance-manager', 'user']), async (req, res) => {
    res.json(await findReimbursementsByAuthorIdInRangeService(req.params.id, req.query.start, req.query.end));
}]);

router.post('/', async(req, res) => {
    res.json(await createNewReimbursementService(req.body));
});

router.patch('/', [authorization(['finance-manager']), async (req, res) => {
    res.json(await updateReimbursementByIdService(req.body));
}]);

export default router;