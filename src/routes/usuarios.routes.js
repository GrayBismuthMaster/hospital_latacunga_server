import {Router} from 'express';
const router = Router();
import * as usersController from '../controllers/usuarios.controller.js'

router.get('/', usersController.getUsers);
router.post('/',usersController.createUser);
router.put('/:id',usersController.updateUserById);
router.delete('/:id', usersController.deleteUserById);
router.get('/:id', usersController.getUserById);
router.get('/rol/:id', usersController.getUsersByRol);

export default router;