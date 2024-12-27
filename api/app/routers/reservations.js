import { Router } from "express";
import * as reservationsController from "../controllers/reservationsController.js";

export const router = Router();

// // GET /reservations
router.get("/", reservationsController.getReservations);

// POST /reservations
router.post("/", reservationsController.createReservation);

// GET /reservations/clientId
router.get("/:clientId", reservationsController.getReservationsByClientId);
