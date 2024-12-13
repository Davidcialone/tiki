import { Router } from "express";
import { router as reservationsRouter } from "./reservations.js";

export const router = Router();

router.use("/reservations", reservationsRouter);

// Middleware 404 (API)
router.use((req, res) => {
  res.status(404).json({ error: "Ressource not found" });
});
