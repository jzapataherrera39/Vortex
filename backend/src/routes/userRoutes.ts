import { Router } from 'express';
import { getUsers, setUserState } from '../controllers/userController';
import { protect, admin } from '../middlewares/authMiddleware';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';

const router = Router();

router.route('/')
    .get(protect, admin, getUsers);

router.route('/:id/state')
    .put(
        protect,
        admin,
        [body('state', 'El estado es requerido').isIn(['activo', 'inactivo'])],
        validateRequest,
        setUserState
    );

export default router;
