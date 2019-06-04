import * as express from 'express';
import { getAllReimbursementStatusesService, getReimbursementStatusByIdService } from '../service/reimbursement-status.service';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json(await getAllReimbursementStatusesService());
});

router.get('/:id', async (req, res) => {
  res.json(await getReimbursementStatusByIdService(req.params.id));
});

export default router;