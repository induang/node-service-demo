/* eslint-disable no-shadow */
import express from 'express';
import { addUserValidation, updateUserValidation } from '../middleware/userValidation';
import UserController from '../controllers/user';


const router = express.Router();

router.get('/filter', UserController.searchUsers);

router.get('/:id', UserController.getUserByID);

router.get('/', UserController.getAllUsers);

// validation middleware
router.post('/', addUserValidation);

router.post('/', UserController.addUser);

// validation middleware
router.put('/:id', updateUserValidation);

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);

export default router;
