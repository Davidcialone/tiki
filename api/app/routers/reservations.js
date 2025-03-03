import { Router } from "express";
import * as reservationsController from "../controllers/reservationsController.js";

export const router = Router();

// Routes spécifiques
// GET /reservations?date=YYYY-MM-DD
router.get("/by-date", reservationsController.getReservationsByDate);

// GET /reservations/new
router.get("/new", reservationsController.getNewReservations);

// GET /reservations/status
router.get(
  "/:reservationId/status",
  reservationsController.handleReservationStatus
);

// Routes générales
// // GET /reservations
router.get("/", reservationsController.getReservations);

// POST /reservations
router.post("/", reservationsController.createReservation);

// GET /reservations/:reservationId
router.get("/:reservationId", reservationsController.getReservationById);

// PATCH /reservations/:reservationId
router.patch("/:reservationId", reservationsController.updateReservation);

// DELETE /reservations/:reservationId
router.delete("/:reservationId", reservationsController.deleteReservation);

// GET /reservations/status
router.get(
  "/:reservationId/status",
  reservationsController.handleReservationStatus
);
