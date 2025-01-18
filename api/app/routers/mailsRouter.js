import { Router } from "express";
import * as mailsController from "../controllers/mailsController.js";

export const router = Router();

// GET /mails/:reservationId
router.post("/:reservationId", mailsController.sendReservationMail);

// post /mails/:reservationId/confirm
router.put("/:reservationId/confirm", mailsController.confirmReservation);

// post /mails/:reservationId/cancel
router.put("/:reservationId/cancel", mailsController.cancelReservation);
