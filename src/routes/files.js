import express from 'express';
import { validate } from '../controllers/files';
const router = express.Router();

router.get('/files', validate);

export default router;
