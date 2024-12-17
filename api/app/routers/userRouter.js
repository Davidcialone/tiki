import { Router } from "express";
import * as usersController from "../controllers/usersController.js";

export const router = Router();

// GET /clients
router.get("/", usersController.getClients);

// GET /clients/clientId
router.get("/clientId", usersController.getClientById);

// POST /clients
router.post("/", usersController.createClient);

// PUT /clients/clientId
router.put("/clientId", usersController.updateClient);

// DELETE /clients/clientId
router.delete("/clientId", usersController.deleteClient);
