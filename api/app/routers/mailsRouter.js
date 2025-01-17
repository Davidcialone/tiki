import { Router } from "express";
import * as mailsController from "../controllers/mailsController.js";

export const router = Router();

// GET /mails/:reservationId
router.post("/:reservationId", mailsController.sendReservationMail);

// post /mails/:reservationId/confirm
router.get("/:reservationId/confirm", mailsController.confirmReservation);

// GET /mails/:reservationId/cancel
router.get("/:reservationId/cancel", mailsController.cancelReservation);
