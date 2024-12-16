import { Router } from "express";
import * as menusController from "../controllers/menusController.js";

export const router = Router();

// // GET /menus
router.get("/", menusController.getMenusItems);

// POST /menus
router.post("/", menusController.createMenuItem);

// PUT /menus/:id
router.put("/:id", menusController.updateMenuItem);

// DELETE /menus/:id
router.delete("/:id", menusController.deleteMenuItem);
