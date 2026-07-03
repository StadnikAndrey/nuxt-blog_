import { Router } from 'express'
import { lg, rg, Autologing } from '../controllers/auth/index.js'
const routerAuth = Router();

routerAuth.post('/api/registration', rg.registration);
routerAuth.post('/api/login', lg.login);
routerAuth.post('/api/logout', lg.logout);
routerAuth.post('/api/logout-all-devices', lg.logoutAllDevices);
routerAuth.get('/api/check', Autologing.check);
routerAuth.get('/api/refresh', Autologing.refresh);

export default routerAuth