import { Router } from "express";

export const router = Router();

// Préfixer les routes
// router.use("/users", userRouter);

// Middleware 404 (API)
router.use((req, res) => {
  res.status(404).json({ error: "Ressource not found" });
});
