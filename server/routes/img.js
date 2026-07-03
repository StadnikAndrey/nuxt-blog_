import { Router } from 'express'
import { crud } from '../controllers/img/index.js'
const router = Router();

router.get('/api/imgs', crud.getImgs);
router.post('/api/add-img', crud.addImgs);

export default router