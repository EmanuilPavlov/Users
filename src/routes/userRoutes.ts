// routes/api/userApiRoutes.ts
import { Router } from 'express';
import { check } from 'express-validator';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid')
], createUser);
router.put('/:id', [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid')
], updateUser);
router.delete('/:id', deleteUser);

export default router;
