import { Router } from "express";
import * as mailsController from "../controllers/mailsController.js";

export const router = Router();

// GET /mails/:reservationId
router.post("/:reservationId", mailsController.sendReservationMail);

// post /mails/:reservationId/confirm
router.post("/:reservationId/confirm", mailsController.confirmReservation);

// post /mails/:reservationId/cancel
router.post("/:reservationId/cancel", mailsController.cancelReservation);
