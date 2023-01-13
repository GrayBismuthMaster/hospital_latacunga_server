import {Router} from 'express';
const router = Router();
import * as especialidadesController from '../controllers/especialidades.controller.js'

router.get('/', especialidadesController.getEspecialidades);
router.get('/:id/profesionales', especialidadesController.getProfesionalesEspecialidad);
router.get('/:id/historiasClinicas', especialidadesController.getHistoriasClinicasEspecialidad);
router.post('/',especialidadesController.createEspecialidad);
router.put('/:id',especialidadesController.updateEspecialidadById);
router.delete('/:id', especialidadesController.deleteEspecialidadById);
router.get('/:id', especialidadesController.getEspecialidadById);
export default router;