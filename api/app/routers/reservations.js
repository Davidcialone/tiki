import { Router } from "express";
import * as reservationsController from "../controllers/reservationsController.js";

export const router = Router();

// // GET /reservations
router.get("/", reservationsController.getReservations);

// POST /reservations
router.post("/", reservationsController.createReservation);

// // GET /reservations/:reservation_date
// router.get("/:reservation_date", reservationsController.getReservations);

// // GET /reservations/:reservation_id
// router.get("/:reservation_id", reservationsController.getReservationById);

// // PUT /reservations/:reservation_id
// router.put("/:reservation_id", reservationsController.updateReservation);

// // DELETE /reservations/:reservation_id
// router.delete("/:reservation_id", reservationsController.deleteReservation);
