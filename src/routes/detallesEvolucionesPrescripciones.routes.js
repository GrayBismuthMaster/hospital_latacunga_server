import {Router} from 'express';
const router = Router();
import * as detallesEvolucionesPrescripcionesController from '../controllers/detallesEvolucionesPrescripciones.controller.js'

router.get('/', detallesEvolucionesPrescripcionesController.getDetallesEvolucionesPrescripciones);
// router.get('/:id/especialidades', detallesEvolucionesPrescripcionesController.getEspecialidadesEvolucionPrescripcion);
router.post('/',detallesEvolucionesPrescripcionesController.createDetalleEvolucionPrescripcion);
router.put('/:id',detallesEvolucionesPrescripcionesController.updateDetalleEvolucionPrescripcionById);
router.delete('/:id', detallesEvolucionesPrescripcionesController.deleteDetalleEvolucionPrescripcionById);
router.get('/:id', detallesEvolucionesPrescripcionesController.getDetalleEvolucionPrescripcionById);

export default router;