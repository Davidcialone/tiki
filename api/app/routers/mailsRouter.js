import { Router } from "express";
import * as mailsController from "../controllers/mailsController.js";

export const router = Router();

// POST /mails/contact
router.post("/contact", mailsController.sendContactMail);

// GET /mails/:reservationId
router.post("/:reservationId", mailsController.sendReservationMail);
