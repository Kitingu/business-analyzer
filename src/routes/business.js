import express from 'express';
import { getAll, createBusiness } from '../controllers/business';
import Validate from '../middlewares/validators';
import verifyToken from '../middlewares/jwt';
import checkDuplicates from '../middlewares/check-duplicates';

const router = express.Router();

router.post('/business', verifyToken, Validate.business,checkDuplicates, createBusiness);
router.get('/business', verifyToken, getAll);
export default router;
