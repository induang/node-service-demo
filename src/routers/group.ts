import express from 'express';
import GroupController from '../controllers/group';


const router = express.Router();

router.get('/:id', GroupController.getGroupByID);

router.get('/', GroupController.getAllGroups);

router.post('/', GroupController.addGroup);

router.put('/:id', GroupController.updateGroup);

router.delete('/:id', GroupController.dropGroup);

export default router;
