import {Router} from 'express';
const router = Router();
import * as profesionalesController from '../controllers/profesionales.controller.js'

router.get('/', profesionalesController.getProfesionales);
router.post('/',profesionalesController.createProfesional);
router.put('/:id',profesionalesController.updateProfesionalById);
router.delete('/:id', profesionalesController.deleteProfesionalById);
router.get('/:id', profesionalesController.getProfesionalById);

export default router;