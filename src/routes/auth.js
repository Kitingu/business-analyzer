import express from 'express';
import { signup, signIn } from '../controllers/auth';
import Validate from '../middlewares/validators';
const router = express.Router();

router.post('/auth/signup', Validate.user, signup);
router.post('/auth/login', signIn);
export default router;
