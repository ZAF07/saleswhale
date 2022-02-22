import { Router } from 'express';
import authMiddleware from '../../middleware/jwt/authorize.mjs';
import initUserService from '../../service/user/index.mjs';

const router = Router();
const services = initUserService();

router.get('/', authMiddleware, services.GetUsers);

router.post('/login', services.Login);
router.put('/logout', authMiddleware, services.Logout);
router.post('/create-account', services.CreateAccount);
router.post('/refresh-token', authMiddleware, services.RefreshToken);

export default router;