import { Router } from "express";
import { router as reservationsRouter } from "./reservations.js";
import { router as clientsRouter } from "./clientsRouter.js";
import { router as menusRouter } from "./menus.js";
import { router as authRouter } from "./authRouter.js";
// import { router as mailRouter } from "./mailsRouter.js";

export const router = Router();

router.use("/reservations", reservationsRouter);
router.use("/clients", clientsRouter);
router.use("/menus", menusRouter);
router.use("/auth", authRouter);
// router.use("/mails", mailRouter);

// Middleware 404 (API)
router.use((req, res) => {
  res.status(404).json({ error: "Ressource not found" });
});
