import {Router} from 'express';
const router = Router();
import * as emailsController from '../controllers/emails.controller.js'

// router.get('/', emailsController.getConsultorios);
// router.get('/:id/especialidades', emailsController.getEspecialidadesConsultorio);
router.post('/',emailsController.sendEmail);
// router.put('/:id',emailsController.updateConsultorioById);
// router.delete('/:id', emailsController.deleteConsultorioById);
// router.get('/:id', emailsController.getConsultorioById);

export default router;