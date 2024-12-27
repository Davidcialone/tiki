import { Router } from "express";
import * as clientsController from "../controllers/clientsController.js";

export const router = Router();
// GET /clients
router.get("/", clientsController.getClients);

// GET /clients/clientId
router.get("/:clientId", clientsController.getClientById);

// POST /clients
router.post("/", clientsController.createClient);

// PUT /clients/clientId
router.put("/:clientId", clientsController.updateClient);

// DELETE /clients/clientId
router.delete("/:clientId", clientsController.deleteClient);
