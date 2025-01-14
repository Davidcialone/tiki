import { Router } from "express";
import * as reservationsController from "../controllers/reservationsController.js";

export const router = Router();

// // GET /reservations
router.get("/", reservationsController.getReservations);

// POST /reservations
router.post("/", reservationsController.createReservation);

// GET /reservations/clientId
router.get("/:clientId", reservationsController.getReservationsByClientId);

// GET /reservations?date=YYYY-MM-DD
router.get("/by-date", reservationsController.getReservationsByDate);

// PATCH /reservations/:id
router.put("/:id", reservationsController.updateReservation);

// DELETE /reservations/:id
router.delete("/:id", reservationsController.deleteReservation);
