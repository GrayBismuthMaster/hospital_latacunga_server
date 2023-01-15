import {Router} from 'express';
const router = Router();
import * as evolucionesPrescripcionesController from '../controllers/evolucionesPrescripciones.controller.js'

router.get('/', evolucionesPrescripcionesController.getEvolucionesPrescripciones);
router.get('/:id/detallesEvolucionesPrescripciones', evolucionesPrescripcionesController.getDetallesEvolucionesPrescripciones);
router.post('/',evolucionesPrescripcionesController.createEvolucionPrescripcion);
router.put('/:id',evolucionesPrescripcionesController.updateEvolucionPrescripcionById);
router.delete('/:id', evolucionesPrescripcionesController.deleteEvolucionPrescripcionById);
router.get('/:id', evolucionesPrescripcionesController.getEvolucionPrescripcionById);

export default router;