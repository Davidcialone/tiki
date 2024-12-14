import { Router } from "express";
import { router as reservationsRouter } from "./reservations.js";
import { router as clientsRouter } from "./userRouter.js";

export const router = Router();

router.use("/reservations", reservationsRouter);
router.use("/clients", clientsRouter);

// Middleware 404 (API)
router.use((req, res) => {
  res.status(404).json({ error: "Ressource not found" });
});
