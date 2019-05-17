import * as express from 'express';
import { getAllReimbursementsService } from '../service/reimbursement.service';

const router = express.Router();

router.use('/', async (req, res) => {
    res.json(await getAllReimbursementsService());
});

export default router;