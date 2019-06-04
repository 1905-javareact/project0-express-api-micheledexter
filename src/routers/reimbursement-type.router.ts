import * as express from 'express';
import { getAllReimbursementTypesService, getReimbursementTypeByIdService } from '../service/reimbursement-type.service';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json(await getAllReimbursementTypesService())
});

router.get('/:id', async (req, res) => {
  res.json(await getReimbursementTypeByIdService(req.params.id));
});

export default router;