import { Router } from "express";
import * as usersController from "../controllers/usersController.js";

export const router = Router();

// GET /clients/clientId
router.get("/clientId", usersController.getClientById);
