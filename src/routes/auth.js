import express from 'express'
import {signup} from '../controllers/auth'
const router = express.Router();

router.get('/',signup)

export default router;