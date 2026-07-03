import { Router } from 'express'
import { users } from '../controllers/users/index.js'
const router = Router();

router.get('/api/users', users.getUsers);
router.post('/api/user', users.getUser);

export default router