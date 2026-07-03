import { Router } from 'express'
import { crud } from '../controllers/video/index.js'
const router = Router();

router.get('/api/all-video', crud.getAllVideo);
router.post('/api/add-video', crud.addVideo);

export default router