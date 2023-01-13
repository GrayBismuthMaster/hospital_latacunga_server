import {Router} from 'express';
const router = Router();
import * as consultoriosController from '../controllers/consultorios.controller.js'

router.get('/', consultoriosController.getConsultorios);
router.get('/:id/especialidades', consultoriosController.getEspecialidadesConsultorio);
router.post('/',consultoriosController.createConsultorio);
router.put('/:id',consultoriosController.updateConsultorioById);
router.delete('/:id', consultoriosController.deleteConsultorioById);
router.get('/:id', consultoriosController.getConsultorioById);

export default router;