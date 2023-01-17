import {Router} from 'express';
const router = Router();
import * as reservasCitasController from '../controllers/reservasCitas.controller.js'

router.get('/', reservasCitasController.getReservasCitas);
router.get('/user/:id', reservasCitasController.getReservasCitasByUserId);
router.post('/',reservasCitasController.createReservaCita);
router.put('/:id',reservasCitasController.updateReservaCitaById);
router.delete('/:id', reservasCitasController.deleteReservaCitaById);
router.get('/:id', reservasCitasController.getReservaCitaById);

export default router;