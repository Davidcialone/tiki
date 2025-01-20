import { Router } from "express";
import * as mailsController from "../controllers/mailsController.js";

export const router = Router();

// GET /mails/:reservationId
router.post("/:reservationId", mailsController.sendReservationMail);
