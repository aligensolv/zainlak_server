import { Router } from "express"
import { completeReservation, createReservation, deleteAllReservations, deleteReservation, getAllReservations, getAllReservationsCount, getUserReservations } from "../controllers/reservation_controller.js";

const router = Router()

router.post('/reservations', createReservation);
router.post('/reservations/:id/complete', completeReservation);

router.delete('/reservations', deleteAllReservations)

router.get('/reservations', getAllReservations);
router.get('/reservations/count', getAllReservationsCount);

router.get('/reservations/users/:id', getUserReservations);

router.delete('/reservations/:id', deleteReservation);

export default router