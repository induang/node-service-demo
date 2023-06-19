/* eslint-disable no-shadow */
import express from 'express';
import { addUserValidation, updateUserValidation } from '../middleware/userValidation';
import UserController from '../controllers/user';
import { tryCatch } from '../utils/tryCatch';


const router = express.Router();

router.get('/filter', tryCatch(UserController.searchUsers));

router.get('/:id', tryCatch(UserController.getUserByID));

router.get('/', tryCatch(UserController.getAllUsers));

// validation middleware
router.post('/', addUserValidation);

router.post('/', tryCatch(UserController.addUser));

// validation middleware
router.put('/:id', updateUserValidation);

router.put('/:id', tryCatch(UserController.updateUser));

router.delete('/:id', tryCatch(UserController.deleteUser));

export default router;
