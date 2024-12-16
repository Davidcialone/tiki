import { Router } from "express";
import { router as reservationsRouter } from "./reservations.js";
import { router as clientsRouter } from "./userRouter.js";
import { router as menusRouter } from "./menus.js";

export const router = Router();

router.use("/reservations", reservationsRouter);
router.use("/clients", clientsRouter);
router.use("/menus", menusRouter);

// Middleware 404 (API)
router.use((req, res) => {
  res.status(404).json({ error: "Ressource not found" });
});
