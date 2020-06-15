import express from 'express';
import { signup } from '../controllers/auth';
import Validate from '../middlewares/validators';
const router = express.Router();

router.post('/auth', Validate.user, signup);

export default router;
