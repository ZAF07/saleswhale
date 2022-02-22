import { Router } from 'express';

import authMiddleware from '../../middleware/jwt/authorize.mjs';
import initGameService from '../../service/game/index.mjs';

const router = Router();
const service = initGameService();

// To create a game you need your auth token
router.get('/:id', service.GetGame);
router.put('/:id', authMiddleware, service.PlayGame);
router.post('/', authMiddleware, service.CreateGame);

// To play the game you need the game token ( stored in the games DB )

export default router;