import {Router} from 'express';
const router = Router();
import * as historiasClinicasController from '../controllers/historiasClinicas.controller.js'

router.get('/', historiasClinicasController.getHistoriasClinicas);
router.post('/',historiasClinicasController.createHistoriaClinica);
router.put('/:id',historiasClinicasController.updateHistoriaClinicaById);
router.delete('/:id', historiasClinicasController.deleteHistoriaClinicaById);
router.get('/:id', historiasClinicasController.getHistoriaClinicaById);

export default router;